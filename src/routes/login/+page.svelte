<script>
    import "../../global.css";
    import logo from "$lib/logo.png";
    import Notifier from "../../components/Notifier.svelte";
    import Loader from "../../components/Loader.svelte";

    let notifier = $state({type: "", message: ""});
    let loader = $state(false);
    let email = $state("");
    let password = $state("");

    const submit = ()=>{
        console.log('submit');
    }
</script>

<svelte:head>
    <title>Vendor Login | Inlet.Shop</title>
</svelte:head>

<div class="container">
    <Notifier type={notifier.type} message={notifier.message}/>

    {#if loader} <Loader/> {/if}

    <img class="logo" src={logo} alt="Inlet Sites logo">

    <form class="standardForm" onsubmit={submit}>
        <h1>Vendor Login</h1>

        <label>Email
            <input
                type="email"
                bind:value={email}
                placeholder="Email"
                required
            />
        </label>

        <label>Password
            <input
                type="password"
                bind:value={password}
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
