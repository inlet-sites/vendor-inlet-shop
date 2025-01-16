<script>
    import "../../global.css";
    import {onMount} from "svelte";
    import logo from "$lib/logo.png";
    import Notifier from "../../components/Notifier.svelte";
    import Loader from "../../components/Loader.svelte";

    let notifier = $state({type: "", message: ""});
    let loader = $state(false);
    let email = $state("");
    let password = $state("");

    const notify = (type, message)=>{
        notifier.type = type;
        notifier.message = message;

        setTimeout(()=>{
            notifier.type = "";
        }, 7500);
    }

    const submit = ()=>{
        loader = true;
        fetch(`${import.meta.env.VITE_API_URL}/vendor/token`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(r=>r.json())
            .then((response)=>{
                if(response.error){
                    notify("error", response.error.message);
                }else{
                    localStorage.setItem("vendorToken", response.token);
                    window.location.href = "/dashboard";
                }
            })
            .catch((err)=>{
                notify("error", "Something went wrong, try refreshing the page");
            })
            .finally(()=>{
                loader = false;
            });
    }

    onMount(()=>{
        if(localStorage.getItem("vendorToken")) window.location.href = "/dashboard";
    });
</script>

<svelte:head>
    <title>Vendor Login | Inlet.Shop</title>
</svelte:head>

<div class="container">
    {#if notifier.type}
        <Notifier type={notifier.type} message={notifier.message}/>
    {/if}

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
