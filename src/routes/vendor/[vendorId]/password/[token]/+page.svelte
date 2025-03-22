<script>
    import {onMount} from "svelte";
    import "../../../../../global.css";
    import logo from "$lib/logo.png";
    import Loader from "../../../../../components/Loader.svelte";
    import Notifier from "../../../../../components/Notifier.svelte";
    let {data} = $props();

    let password = $state();
    let confirmPassword = $state();
    let loader = $state(false);
    let notifier = $state({type: "", message: ""});
    let focusInput = $state({});

    const notify = (type, message)=>{
        notifier.type = type;
        notifier.message = message;

        setTimeout(()=>{
            notifier.type = "";
        }, 7500);
    }

    const submit = async ()=>{
        loader = true;
        fetch(`${import.meta.env.VITE_API_URL}/vendor/${data.vendorId}/password/${data.token}`, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                password: password,
                confirmPassword: confirmPassword
            })
        })
            .then(r=>r.json())
            .then((response)=>{
                if(response.error){
                    notifier.type = "error";
                    notifier.message = response.error.message;
                }else{
                    window.location.href = "/login";
                }
            })
            .catch((err)=>{
                notifier.type = "error";
                notifier.message = "Something went wrong, try refreshing the page.";
            })
            .finally(()=>{
                loader = false;
            });
    }

    onMount(()=>{
        focusInput.focus();
    });
</script>

<svelte:head>
    <title>Vendor | inlet.shop</title>
</svelte:head>

{#if notifier.type}
    <Notifier type={notifier.type} message={notifier.message}/>
{/if}

{#if loader} <Loader/> {/if}

<img class="logo" src={logo} alt="Inlet Sites logo">

<div class="container">
    <h1>New Vendor</h1>
    <h2>Create password</h2>

    <form class="standardForm" onsubmit={submit}>
        <label>New Password
            <input
                type="password"
                bind:value={password}
                bind:this={focusInput}
                placeholder="Password"
                required
            >
        </label>

        <label>Confirm Password
            <input
                type="password"
                bind:value={confirmPassword}
                placeholder="Confirm Password"
                required
            >
        </label>

        <button class="button">Create</button>
    </form>
</div>

<style>
    img{
        position: absolute;
        top: 35px;
        left: 35px;
        height: 150px;
    }

    .container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100vw;
        color: var(--text);
    }

    form{
        width: 100%;
        max-width: 350px;
    }

    form button{
        margin: 15px 0;
    }
</style>
