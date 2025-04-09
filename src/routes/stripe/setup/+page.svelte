<script>
    import {onMount} from "svelte";
    import {loadConnectAndInitialize} from "@stripe/connect-js";
    import Loader from "$lib/Loader.svelte";
    import Notifier from "$lib/Notifier.svelte";

    const apiUrl = import.meta.env.VITE_API_URL;
    let container = $state();
    let loader = $state(false);
    let notifier = $state(null);

    const notify = (type, message)=>{
        notifier = {
            type: type,
            message: message
        };

        setTimeout(()=>{
            notifier = null;
        }, 7500);
    }

    const onExit = ()=>{
        loader = true;
        fetch(`${apiUrl}/vendor`, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("vendorToken")}`
            },
            body: JSON.stringify({stripeValidated: true})
        })
            .then(r=>r.json())
            .then((response)=>{
                if(response.error){
                    notify("error", response.error.message);
                }else{
                    finish();
                }
            })
            .catch((err)=>{
                notify("error", "Something went wrong, try refreshing the page");
            })
            .finally(()=>{
                loader = false;
            });
    }

    const fetchClientSecret = ()=>{
        return async ()=>{
            const response = await fetch(`${apiUrl}/vendor/connect/session`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("vendorToken")}`
                }
            });
            if(!response.ok){
                notify("error", "Something went wrong, try refreshing the page");
                return;
            }else{
                const data = await response.json();
                return data.sessionSecret;
            }
        }
    }

    const createConnectedAccount = ()=>{
        const token = localStorage.getItem("vendorToken");
        if(!token){
            notify("error", "Not logged in");
            return;
        }

        loader = true;
        fetch(`${apiUrl}/vendor/connect`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
            .then(r=>r.json())
            .then((response)=>{
                if(response.error){
                    notify("error", response.error.message);
                }else{
                    const instance = loadConnectAndIntiialize({
                        publishableKey: import.meta.env.STRIPE_PUBLISHABLE,
                        fetchClientSecret: fetchClientSecret,
                        appearance: {
                            overlays: "dialog",
                            variables: {
                                colorPrimary: "#635bff"
                            }
                        }
                    });

                    const embeddedOnboardingComponent = instance.create("account-onboarding");
                    embeddedOnboardingComponent.setOnExit(onExit);
                    container.appendChild(embeddedOnboardingComponent);
                }
            })
            .catch((err)=>{
                notify("error", "Something went wrong, try refreshing the page");
            })
            .finally(()=>{
                loader = false;
            });
    };

    onMount(createConnectedAccount);
</script>

{#if loader}
    <Loader/>
{/if}

{#if notifier}
    <Notifier type={notifier.type} message={notifier.message}/>
{/if}

<div bind:this={container} class="StripeSetup"></div>
