<script>
    import "$lib/global.css";
    import logo from "$lib/logo.png";

    let {data} = $props();
    let password = $state();
    let confirmPassword = $state();

    const submit = ()=>{
        console.log("submit");
    }
</script>

<svelte:head>
    <title>Password Reset | Inlet.Shop</title>
</svelte:head>

<div class="container">
    <img class="logo" src={logo} alt="Inlet Sites logo">

    <form class="standardForm" onsubmit={submit}>
        <h1>Reset Password</h1>

        <label>Password
            <input
                type="password"
                bind:value={password}
                placeholder="Password"
                required
            />
        </label>

        <label>Confirm Password
            <input
                type="password"
                bind:value={confirmPassword}
                placeholder="Confirm Password"
                required
            />
        </label>

        <button class="button">Change Password</button>
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
        padding: 0 15px;
    }

    .logo{
        position: absolute;
        top: 35px;
        left: 35px;
        height: 150px;
    }

    .standardForm{
        max-width: 100%;
    }

    h1{
        text-align: center;
    }
</style>
