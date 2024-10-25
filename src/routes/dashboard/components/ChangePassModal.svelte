<script>
    import {createEventDispatcher} from "svelte";
    import Loader from "../../../components/Loader.svelte";

    const dispatch = createEventDispatcher();

    let password = $state("");
    let confirmPassword = $state("");
    let loader = $state(false);

    const cancel = ()=>{
        dispatch("cancel");
    }

    const submit = ()=>{
        loader = true;
        fetch(`${import.meta.env.VITE_API_URL}/vendor/${localStorage.getItem("vendorToken")}/password`, {
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
                    dispatch("notify", {
                        type: "error",
                        message: response.message
                    });
                }else{
                    localStorage.removeItem("vendorToken");
                    window.location.href = "/login";
                }
            })
            .catch((err)=>{
                dispatch("notify", {
                    type: "error",
                    message: "Something went wrong, try refreshing the page"
                });
            })
            .finally(()=>{
                loader = false;
            });
    }
</script>

<div class="container">
    <div class="modal">
        {#if loader}
            <Loader/>
        {/if}

        <h2>*Changing your password will log you out of all devices and requires logging in again</h2>

        <form class="standardForm" onsubmit={submit}>
            <label>New Password
                <input
                    type="password"
                    bind:value={password}
                    placeholder="New Password"
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

            <button>Change Password</button>

            <button class="cancel" type="button" onclick={cancel}>Cancel</button>
        </form>
    </div>
</div>

<style>
    .container{
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: 10;
    }

    .modal{
        width: 550px;
        background: rgb(200, 200, 200);
        color: black;
        padding: 35px;
        box-shadow: 0 0 10px white;
        border-radius: 10px;
        position: relative;
    }

    form button{
        font-size: 28px;
        padding: 5px;
        margin: 5px 0;
        cursor: pointer;
        border: 2px outset white;
    }

    form button:hover{
        background: rgb(225, 225, 225);
    }

    form button:active{
        border-style: inset;
    }

    .cancel{
        background: rgb(100, 0, 0);
        color: white;
    }

    .cancel:hover{
        background: rgb(125, 0 , 0);
    }
</style>
