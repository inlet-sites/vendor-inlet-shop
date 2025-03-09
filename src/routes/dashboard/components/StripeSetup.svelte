<script>
    import {onMount} from "svelte";
    import {loadConnectAndInitialize} from "@stripe/connect-js";

    let {loader, notify} = $props();
    const apiUrl = import.meta.env.VITE_API_URL;

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
            console.log("exiting");
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
    <div class="eoc"></div>
</div>

<style>
    .StripeSetup{
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
    }
</style>
