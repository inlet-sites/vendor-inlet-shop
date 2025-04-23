<script>
    import "$lib/global.css";
    import {setContext} from "svelte";
    import {writable} from "svelte/store";
    import Loader from "$lib/Loader.svelte";
    import Notifier from "$lib/Notifier.svelte";
    import Menu from "./Menu.svelte";

    let {data, children} = $props();
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

    let vendor = writable(data.vendor);
    setContext("vendor", vendor);
    setContext("notify", notify);
    setContext("loader", setLoader);
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
