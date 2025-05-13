<script>
    import {getContext} from "svelte";
    
    let vendor = getContext("vendor");
    let loader = getContext("loader");
    let notify = getContext("notify");

    const orderEmail = ()=>{
        loader(true);
        fetch(`${import.meta.env.VITE_URL}/dashboard/account/settings`, {
            method: "put",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({newOrderSendEmail: $vendor.newOrderSendEmail})
        })
            .then(r=>r.json())
            .then((response)=>{
                if(response.error){
                    notify("error", response.error.message);
                }else{
                    vendor.set(response);
                    if(response.newOrderSendEmail){
                        notify("success", "Email will be sent with each new order");
                    }else{
                        notify("success", "Email will not be sent for new orders");
                    }
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

{#if $vendor}
    <div class="OrderEmail">
        <h3>Send Email for Each Order?</h3>

        <label class="switch">
            <input
                type="checkbox"
                bind:checked={$vendor.newOrderSendEmail}
                on:change={orderEmail}
            >
            <span class="slider"></span>
        </label>
    </div>
{/if}

<style>
    .OrderEmail{
        color: white;
    }

    h3{
        text-decoration: underline;
    }

    .switch{
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
        margin-top: 15px;
    }

    .switch input{
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider{
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: red;
        transition: 0.4s;
        border-radius: 34px;
    }

    .slider:before{
        position: absolute;
        left: 4px;
        bottom: 4px;
        content: "";
        height: 26px;
        width: 26px;
        background-color: black;
        transition: 0.4s;
        border-radius: 50%;
    }

    input:checked + .slider{
        background-color: green;
    }

    input:checked + .slider:before{
        transform: translateX(26px);
    }
</style>
