<script>
    import {getContext} from "svelte";

    const loader = getContext("loader");
    const notify = getContext("notify");
    let {purchaseOption, productId, variationId, updateVariation} = $props();

    const update = ()=>{
        console.log("update");
        loader(true);
        fetch(`${import.meta.env.VITE_API_URL}/product/${productId}/variation/${variationId}`, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("vendorToken")}`
            },
            body: JSON.stringify({purchaseOption: purchaseOption})
        })
            .then(r=>r.json())
            .then((response)=>{
                if(response.error){
                    notify("error", response.error.message);
                }else{
                    updateVariation(response);
                    notify("success", "Selling option updated");
                }
            })
            .catch((err)=>{
                console.log(err);
                notify("error", "Something went wrong, try refreshing the page");
            })
            .finally(()=>{
                loader(false);
            });
    }
</script>

<div class="PurchaseOption">
    <h2>Selling Option</h2>

    <label>Available to purchase online, and I will ship the item
        <input
            type="radio"
            name="purchaseOption"
            value="ship"
            bind:group={purchaseOption}
            onchange={update}
        >
    </label>

    <label>Available to purchase online, but must be picked up in store
        <input
            type="radio"
            name="purchaseOption"
            value="buy"
            bind:group={purchaseOption}
            onchange={update}
        >
    </label>

    <label>List the item only, not available for online purchase
        <input
            type="radio"
            name="purchaseOption"
            value="list"
            bind:group={purchaseOption}
            onchange={update}
        >
    </label>
</div>

<style>
    .PurchaseOption{
        display: flex;
        flex-direction: column;
        margin-top: 35px;
    }

    h2{
        text-decoration: underline;
    }

    label{
        display: flex;
        flex-direction: row-reverse;
        justify-content: flex-end;
        align-items: center;
        cursor: pointer;
        margin: 10px 0;
        border: 1px solid var(--text);
        border-radius: 15px;
        padding: 5px 10px;
        max-width: 750px;
    }

    input{
        margin-right: 15px;
        height: 25px;
        width: 25px;
    }
</style>
