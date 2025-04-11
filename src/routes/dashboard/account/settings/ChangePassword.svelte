<script>
    import {getContext} from "svelte";
    import {goto} from "$app/navigation";

    const vendor = getContext("vendor");
    const loader = getContext("loader");
    const notify = getContext("notify");
    let {cancel} = $props();
    let password = $state();
    let confirmPassword = $state();

    const submit = ()=>{
        loader(true);
        fetch(`${import.meta.env.VITE_API_URL}/vendor/${$vendor.id}/password`, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("vendorToken")}`
            },
            body: JSON.stringify({
                password: password,
                confirmPassword: confirmPassword
            })
        })
            .then(r=>r.json())
            .then((response)=>{
                if(response.error){
                    notify("error", response.error.message);
                }else{
                    localStorage.removeItem("vendorToken");
                    goto("/");
                }
            })
            .catch((err)=>{
                notify("error", "Something went wrong, try refreshing the page");
            })
            .finally(()=>{
                loader(false);
            });
    }
</script>

<div class="ChangePassword">
    <div class="modal">
        <h2>Change Password</h2>
        <p>This will log you out of all devices</p>

        <form onsubmit={submit}>
            <label>New Password
                <input
                    type="password"
                    bind:value={password}
                    required
                >
            </label>

            <label>Confirm Password
                <input
                    type="password"
                    bind:value={confirmPassword}
                    required
                >
            </label>


            <div class="buttonBox">
                <button class="button cancel" type="button" onclick={cancel}>Cancel</button>

                <button class="button">Submit</button>
            </div>
        </form>

    </div>
</div>

<style>
    .ChangePassword{
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        backdrop-filter: blur(10px);
        z-index: 10;
    }

    .modal{
        background: white;
        width: 350px;
        padding: 15px;
        box-shadow: 0 0 10px black;
        border: 2px solid red;
    }

    .modal > *{
        margin: 15px 0;
    }

    label{
        display: flex;
        flex-direction: column;
    }

    input{
        font-size: 22px;
    }

    form > *{
        margin: 15px 0;
    }

    .buttonBox{
        display: flex;
        justify-content: space-between;
    }

    .buttonBox button{
        font-size: 18px;
    }

    .cancel{
        background: red;
        color: white;
    }
</style>
