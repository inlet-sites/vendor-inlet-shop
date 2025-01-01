<script>
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();
    let {multiple, onlineSales, productName, existing = false} = $props();
    let descriptor = $state(multiple || existing ? "" : productName);
    let price = $state(0);
    let quantity = $state(0);
    let shipping = $state(0);
    let images = [];
    let imageInput = $state();
    let purchaseOption = $state(onlineSales ? "ship" : "list");

    const handleFileChange = (event)=>{
        images = Array.from(event.target.files);
    }

    const next = ()=>{
        dispatch("addVariation", {
            variation: {
                descriptor: descriptor,
                price: price,
                quantity: quantity,
                shipping: purchaseOption === "ship" ? shipping : 0,
                images: images,
                purchaseOption: purchaseOption
            }
        });

        descriptor = "";
        price = 0;
        quantity = 0;
        shipping = 0;
        images = [];
        imageInput.value = undefined;
        purchaseOption = onlineSales ? "ship" : "list";
    }

    const finish = ()=>{
        dispatch("addVariation", {
            variation: {
                descriptor: descriptor,
                price: price,
                quantity: quantity,
                shipping: purchaseOption === "ship" ? shipping : 0,
                images: images,
                purchaseOption: purchaseOption
            }
        });
        dispatch("next");
    }

    const cancel = ()=>{
        dispatch("cancel");
    }
</script>

<div class="Variation">
    <h1>Purchasing Information</h1>

    <form class="standardForm" onsubmit={next}>
        {#if multiple || existing}
            <label>Descriptor
                <input
                    type="text"
                    bind:value={descriptor}
                    required
                >
            </label>
        {/if}

        <label>Price ($)
            <input
                type="number"
                min="0"
                step="0.01"
                bind:value={price}
                required
            >
        </label>

        <label>Quantity Available
            <input
                type="number"
                min="-1"
                step="1"
                bind:value={quantity}
                required
            >
        </label>

        {#if purchaseOption !== "list"}
            <label>Shipping Cost ($)
                <input
                    type="number"
                    min="0"
                    step="0.01"
                    bind:value={shipping}
                    required
                >
            </label>
        {/if}

        {#if onlineSales}
            <h3>How will you sell this item?</h3>
            <label class="radio">Available to purchase online, and I will ship the item
                <input
                    type="radio"
                    name="purchaseOption"
                    value="ship"
                    bind:group={purchaseOption}
                >
            </label>

            <label class="radio">Available to purchase online, but must be picked up in-store
                <input
                    type="radio"
                    name="purchaseOption"
                    value="buy"
                    bind:group={purchaseOption}
                >
            </label>

            <label class="radio">List the item only, not available for online purchase
                <input
                    type="radio"
                    name="purchaseOption"
                    value="list"
                    bind:group={purchaseOption}
                >
            </label>
        {/if}

        {#if multiple || existing}
            <label>Images
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onchange={handleFileChange}
                >
            </label>
        {/if}

        <div class="buttonBox">
            <button
                class="button"
                type="button"
                onclick={cancel}
            >Cancel</button>

            {#if multiple}
                <button
                    class="button"
                    type="button"
                    onclick={next}
                >Next Variation</button>
            {/if}

            <button
                class="button"
                type="button"
                onclick={finish}
                bind:this={imageInput}
            >Finish</button>
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

    h3{
        margin-top: 35px;
    }

    .radio{
        display: flex;
        flex-direction: row-reverse;
        justify-content: flex-end;
        align-items: center;
        cursor: pointer;
        margin: 10px 0;
        border: 1px solid var(--text);
        border-radius: 15px;
        padding: 5px 10px;
    }

    .radio input{
        margin-right: 15px;
        height: 25px;
        width: 25px;
    }
</style>
