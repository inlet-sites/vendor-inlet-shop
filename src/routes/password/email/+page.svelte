<script>
    import "$lib/global.css";
    import logo from "$lib/logo.png";
    import Loader from "$lib/Loader.svelte";
    import Notifier from "$lib/Notifier.svelte";

    let email = $state();
    let loader = $state(false);
    let notifier = $state(null);

    const notify = (type, message)=>{
        notifier = {
            type: type,
            message: message
        };

        setTimeout(()=>{
            notifier = null;
        }, 7500);
    }

    const submit = ()=>{
        loader = true;
        fetch(`${import.meta.env.VITE_API_URL}/vendor/password/email`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email: email})
        })
            .then(r=>r.json())
            .then((response)=>{
                if(response.error){
                    notify("error", response.error.message);
                }else{
                    notify("success", "Check your email for further instructions");
                }
            })
            .catch((err)=>{
                notify("error", "Something went wrong, try refreshing the page");
            })
            .finally(()=>{
                loader = false;
            });
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

    <form class="standardForm" onsubmit={submit}>
        <h1>Reset your Password</h1>
        <p>An email will be sent with instructions to reset your password</p>

        <label>Email
            <input
                type="email"
                bind:value={email}
                placeholder="Email"
                required
            />
        </label>

        <button class="button">Send Email</button>
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
