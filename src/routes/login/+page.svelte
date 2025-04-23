<script>
    import "$lib/global.css";
    import {onMount} from "svelte";
    import {enhance} from "$app/forms";
    import logo from "$lib/logo.png";

    onMount(()=>{
        //if(localStorage.getItem("vendorToken")) window.location.href = "/dashboard";
    });
</script>

<svelte:head>
    <title>Vendor Login | Inlet.Shop</title>
</svelte:head>

<div class="container">
    <img class="logo" src={logo} alt="Inlet Sites logo">

    <form class="standardForm" action="?/login" method="post" use:enhance>
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
