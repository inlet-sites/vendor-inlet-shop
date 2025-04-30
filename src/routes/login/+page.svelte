<script>
    import "$lib/global.css";
    import {enhance} from "$app/forms";
    import logo from "$lib/logo.png";
    import Loader from "$lib/Loader.svelte";
    import Notifier from "$lib/Notifier.svelte";

    let {form} = $props();
    let loader = $state(false);
    let notifier = $state(null);

    const notify = (type, message)=>{
        notifier = {type, message};

        setTimeout(()=>{
            notifier = null;
        }, 7500);
    }

    const login = ()=>{
        loader = true;
        return async ({update})=>{
            await update({reset: false});
            if(form.error) notify("error", form.error.message);
            loader = false;
        }
    }
</script>

<svelte:head>
    <title>Vendor Login | Inlet.Shop</title>
</svelte:head>

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
    <img class="logo" src={logo} alt="Inlet Sites logo">

    <form class="standardForm" action="?/login" method="post" use:enhance={login}>
        <h1>Vendor Login</h1>

        <label>Email
            <input
                type="email"
                name="email"
                placeholder="Email"
                required
            />
        </label>

        <label>Password
            <input
                type="password"
                name="password"
                placeholder="Password"
                required
            />
        </label>

        <button class="button">Log In</button>
    </form>
</div>

<style>
    .container{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100vw;
        color: rgb(225, 225, 225);
    }

    .logo{
        position: absolute;
        top: 35px;
        left: 35px;
        height: 150px;
    }

    h1{
        text-align: center;
    }
</style>
