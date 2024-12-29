<script>
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();
    let token = $state();

    const submit = ()=>{
        dispatch("showLoader", {showLoader: true});
        
        fetch(`${import.meta.env.VITE_API_URL}/vendor`, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("vendorToken")}`
            },
            body: JSON.stringify({
                stripeToken: token
            })
        })
            .then(r=>r.json())
            .then((response)=>{
                if(response.error){
                    dispatch("notify", {type: "error", message: response.error.message});
                }else{
                    dispatch("notify", {
                        type: "success",
                        message: "Your stripe token has been verified"
                    });
                    dispatch("next");
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

<div class="AddToken">
    <form class="standardForm" onsubmit={submit}>
        <label>Stripe API Token
            <input
                type="text"
                bind:value={token}
                placeholder="API Token"
                required
            >
        </label>

        <a
            href="/help/stripe-token"
            target="_blank"
        >How do I get my Stripe API token</a>

        <div class="buttonBox">
            <button
                class="button cancel"
                type="button"
                onclick={()=>{dispatch("cancel")}}
            >Cancel</button>

            <button class="button">Submit</button>
        </div>
    </form>
</div>

<style>
    .AddToken{
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

    .cancel{
        color: red;
    }
</style>
