<script>
    import "../global.css";
    import logo from "$lib/logo.png";
    import {onMount} from "svelte";
    let loggedIn = $state(false);

    onMount(()=>{
        if(localStorage.getItem("vendorToken")) loggedIn = true;
    });
</script>

<div class="container">
    <img src={logo} alt="Inlet Shop logo">

    <h1>404 Error</h1>

    <h2>The page you are looking for could not be found</h2>

    <div class="links">
        <a href="/">Return Home</a>

        {#if loggedIn} <a href="/dashboard">Return to dashboard</a> {/if}
    </div>
</div>

<style>
    .container{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        padding: 15% 0;
        position: relative;
        height: 100vh;
        width: 100vw;
        color: rgb(225, 225, 225);
    }

    a{
        color: rgb(225, 225, 225);
    }

    img{
        position: absolute;
        top: 35px;
        left: 35px;
        height: 150px;
    }

    .links{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .links > *{
        margin: 5px;
    }
</style>
