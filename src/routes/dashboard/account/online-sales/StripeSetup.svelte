<script>
    import {onMount, getContext} from "svelte";
    import {loadConnectAndInitialize} from "@stripe/connect-js";

    const loader = getContext("loader");
    const notify = getContext("notify");
    let {close} = $props();
    const apiUrl = import.meta.env.VITE_API_URL;

    const activate = ()=>{
        loader(true);
        fetch(`${apiUrl}/vendor`, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("vendorToken")}`
            },
            body: JSON.stringify({stripeActivated: true})
        })
            .then(r=>r.json())
            .then((response)=>{
                if(response.error){
                    notify("error", response.error.message);
                }else{
                    close();
                }
            })
            .catch((err)=>{
                notify("error", "Something went wrong, try refreshing the page");
            })
            .finally(()=>{
                loader(false);
            });
    }

    const fetchClientSecret = async ()=>{
        const response = await fetch(`${apiUrl}/vendor/connect/session`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("vendorToken")}`
            }
        });

        if(!response.ok){
            notify("error", "Something went wrong, try refreshing the page");
        }else{
            const {sessionSecret} = await response.json();
            return sessionSecret;
        }
    }

    const createInstance = (session)=>{
        const instance = loadConnectAndInitialize({
            publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE,
            fetchClientSecret: fetchClientSecret,
            appearance: {
                overlays: "dialog",
                variables: {
                    colorPrimary: "#635bff"
                }
            }
        });

        const container = document.getElementById("eoc");
        const eoc = instance.create("account-onboarding");
        eoc.setOnExit(()=>{
            activate();
        });
        container.appendChild(eoc);
    }

    onMount(()=>{
        loader(true);
        fetch(`${apiUrl}/vendor/connect`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("vendorToken")}`
            }
        })
            .then(r=>r.json())
            .then((response)=>{
                if(response.error){
                    notify("error", response.error.message);
                }else{
                    createInstance(response.account);
                }
            })
            .catch((err)=>{
                notify("error", "Something went wrong, try refreshing the page");
            })
            .finally(()=>{
                loader(false);
            });
    });
</script>

<div class="StripeSetup">
    <div id="eoc"></div>
</div>

<style>
    .StripeSetup{
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        backdrop-filter: blur(10px);
    }

    #eoc{
        height: 90%;
        width: 90%;
        background: white;
        padding: 15px;
        overflow-y: auto;
    }
</style>
