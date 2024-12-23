<script>
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();
    const {multiple} = $props();
    const shipping = $state(true);
    let variation = $state({
        descriptor: "",
        price: 0,
        quantity: 0,
        shipping: 0,
        images: "",
        purchaseOption: "list"
    });

    const next = ()=>{
        console.log("nexting");
    }

    const back = ()=>{
        dispatch("back");
    }
</script>

<div class="Variation">
    <h1>Purchasing Information</h1>

    <form class="standardForm" onsubmit={next}>
        {#if multiple}
            <label>Descriptor
                <input
                    type="text"
                    bind:value={variation.descriptor}
                >
            </label>
        {/if}

        <label>Price
            <input
                type="number"
                min="0"
                step="0.01"
                bind:value={variation.price}
                required
            >
        </label>

        <label>Quantity
            <input
                type="number"
                min="-1"
                step="1"
                bind:value={variation.quantity}
                required
            >
        </label>

        <label>Shipping Cost
            <input
                type="number"
                min="0"
                step="0.01"
                bind:value={variation.shipping}
                required
            >
        </label>

        <h3>How will you sell this item?</h3>
        <label>Available to purchase online, and I will ship the item
            <input
                type="radio"
                name="purchaseOption"
                value="ship"
                bind:group={variation.purchaseOption}
            >
        </label>

        <label>Available to purchase online, but must be picked up in-store
            <input
                type="radio"
                name="purchaseOption"
                value="buy"
                bind:group={variation.purchaseOption}
            >
        </label>

        <label>List the item only, not available for online purchase
            <input
                type="radio"
                name="purchaseOption"
                value="list"
                bind:group={variation.purchaseOption}
            >
        </label>

        <label>Images
            <input
                type="file"
                bind:value={variation.images}
                accept="image/*"
                multiple
            >
        </label>

        <div class="buttonBox">
            <button
                class="button"
                type="button"
                onclick={back}
            >Back</button>

            <button
                class="button"
            >Next</button>
        </div>
    </form>
</div>

<style>
    .Variation{
        color: var(--text);
        max-width: 1000px;
    }

    .buttonBox button{
        margin: 35px 35px 0 0;
    }
</style>
