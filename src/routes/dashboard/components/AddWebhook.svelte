<script>
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();
    let secret = $state();

    const submit = ()=>{
        dispatch("showLoader", {showLoader: true});

        fetch(`${import.meta.env.VITE_API_URL}/vendor`, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("vendorToken")}`
            },
            body: JSON.stringify({
                webhookSecret: secret
            })
        })
            .then(r=>r.json())
            .then((response)=>{
                if(response.error){
                    dispatch("notify", {type: "error", message: response.error.message});
                }else{
                    dispatch("notify", {
                        type: "success",
                        message: "Webhook secret has been verified"
                    });
                    dispatch("finish");
                }
            })
            .catch((err)=>{
                dispatch("notify", {
                    type: "error",
                    message: "Something went wrong, try refreshing the page"
                });
            })
            .finally(()=>{
                dispatch("showLoader", {showLoader: false});
            });
    }
</script>

<div class="AddWebhook">
    <form class="standardForm" onsubmit={submit}>
        <label>Webhook Secret
            <input
                type="text"
                bind:value={secret}
                placeholder="Secret Signing Key"
                required
            >
        </label>

        <a
            href="/help/webhook-secret"
            target="_blank"
        >How do I get my webhook secret?</a>

        <div class="buttonBox">
            <button
                class="button cancel"
                type="button"
                onclick={()=>{dispatch("finish")}}
            >Cancel</button>

            <button class="button">Submit</button>
        </div>
    </form>
</div>

<style>
    .AddWebhook{
        display: flex;
        justify-content: center;
        align-items: center;
        backdrop-filter: blur(3px);
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        color: black;
    }

    form{
        background: var(--text);
        width: 90%;
        max-width: 1000px;
        padding: 35px;
    }

    label{
        margin-bottom: 5px;
    }

    .buttonBox{
        margin-top: 35px;
    }

    .cancel{
        color: red;
    }
</style>
