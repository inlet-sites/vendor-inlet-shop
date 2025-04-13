<script>
    import {getContext} from "svelte";
    import UploadImages from "$lib/UploadImages.svelte";

    let vendor = getContext("vendor");
    let {multipleVariations, finish} = $props();
    let descriptor = $state("");
    let price = $state(0);
    let quantity = $state(0);
    let shipping = $state(0);
    let purchaseOption = $state("list");
    let images = $state([]);
    let finished = $state(true)
    let count = $state(1);

    const submit = ()=>{
        const data = {
            descriptor: descriptor,
            price: Math.floor(price * 100),
            quantity: quantity,
            shipping: Math.floor(shipping * 100),
            purchaseOption: purchaseOption,
            images: images
        };

        finish(data, finished);

        if(!finished){
            descriptor = "";
            price = 0;
            quantity = 0;
            shipping = 0;
            purchaseOption = "list";
            images = [];
            finished = true;
            count++;
        }
    }
</script>

<form class="Variation standardForm" onsubmit={submit}>
    {#if multipleVariations}
        <h1>Price #{count}</h1>
    {:else}
        <h1>Price Information</h1>
    {/if}
    <label>Descriptor
        <input
            type="text"
            bind:value={descriptor}
            placeholder="Descriptor"
            required
        >
    </label>

    <label>Price
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
            min="0"
            step="1"
            bind:value={quantity}
            required
        >
    </label>

    <label>Shipping
        <input
            type="number"
            min="0"
            step="0.01"
            bind:value={shipping}
            required
        >
    </label>

    {#if $vendor?.onlineSales}
        <h3>How will you sell this item?</h3>
        <label class="radio">Available to purchase oneline, and I will ship the item
            <input
                type="radio"
                name="purchaseOption"
                value="ship"
                bind:group={purchaseOption}
            >
        </label>

        <label class="radio">Available to purchase online, but must be picked up in store
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

    <div class="divider"></div>

    {#if multipleVariations}
        <UploadImages
            addImage={(img)=>{images.push(img)}}
            removeImage={(i)=>{images.splice(i, 1)}}
            clear={count}
        />
    {/if}

    <div class="buttonBox">
        <a
            href="/dashboard/products"
            class="button"
        >Cancel</a>

        <div class="buttonBoxEnd">
            {#if multipleVariations}
                <button
                    class="button"
                    onclick={()=>{finished = false}}
                >Add Another</button>
            {/if}

            <button
                class="button"
                onclick={()=>{finished = true}}
            >Finish</button>
        </div>
    </div>
</form>

<style>
    .Variation{
        display: flex;
        flex-direction: column;
        color: white;
    }

    h1{
        text-decoration: underline;
    }

    input{
        max-width: 250px;
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
        max-width: 750px;
    }

    input[type="radio"]{
        margin-right: 15px;
        height: 25px;
        width: 25px;
    }

    .divider{
        height: 35px;
    }

    .buttonBox{
        display: flex;
        justify-content: space-between;
        margin-top: 35px;
    }
</style>
