<script>
    import "$lib/global.css";
    import {onMount, setContext} from "svelte";
    import {goto} from "$app/navigation";
    import {writable} from "svelte/store";
    import Loader from "$lib/Loader.svelte";
    import Notifier from "$lib/Notifier.svelte";
    import Menu from "./Menu.svelte";

    let {children} = $props();
    let loader = $state(false);
    let notifier = $state(null);

    const setLoader = (on)=>{
        loader = on;
    }

    const notify = (type, message)=>{
        notifier = {
            type: type,
            message: message
        };

        setTimeout(()=>{
            notifier = null;
        }, 7500);
    }

    let vendor = writable(null);
    setContext("vendor", vendor);
    setContext("notify", notify);
    setContext("loader", setLoader);

    onMount(()=>{
        setLoader(true);
        const vendorToken = localStorage.getItem("vendorToken");
        if(!vendorToken) goto("/login");

        fetch(`${import.meta.env.VITE_API_URL}/vendor/self`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${vendorToken}`
            }
        })
            .then(r=>r.json())
            .then((response)=>{
                if(response.error){
                    localStorage.removeItem("vendorToken");
                    window.location.href = "/login";
                }else{
                    vendor.set(response);
                }
            })
            .catch((err)=>{
                notify("error", "Something went wrong, try refreshing the page");
            })
            .finally(()=>{
                setLoader(false);
            });
    });
</script>

{#if loader}
    <Loader/>
{/if}

{#if notifier}
    <Notifier
        type={notifier.type}
        message={notifier.message}
    />
{/if}

<div class="container">
    <Menu/>

    <div class="contents">
        {@render children()}
    </div>
</div>

<style>
    .container{
        display: flex;
        max-height: 100vh;
    }

    .contents{
        padding: 35px;
        width: calc(100vw - 250px);
        height: 100vh;
        overflow-y: auto;
        position: relative;
    }

    @media screen and (max-width: 850px){
        .contents{
            width: 100%;
        }
    }
</style>
