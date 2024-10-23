<script>
    import "../../../../../global.css";
    import logo from "$lib/logo.png";
    let {data} = $props();

    let password = $state();
    let confirmPassword = $state();

    const submit = async ()=>{
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
                    console.log(response.message);
                }else{
                    console.log(response);
                }
            })
            .catch((err)=>{
                console.log(err);
            });
    }
</script>

<img class="logo" src={logo} alt="Inlet Sites logo">

<div class="container">
    <h1>New Vendor</h1>
    <h2>Create password</h2>

    <form class="standardForm" onsubmit={submit}>
        <label>New Password
            <input
                type="password"
                bind:value={password}
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
