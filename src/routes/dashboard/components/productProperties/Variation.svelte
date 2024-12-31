<script>
    let {variations} = $props();
    let variationIndex = $state(0);
</script>

{#if variations}
<div class="Variation">
    <div class="divider"></div>

    <h1>Prices</h1>

    {#if variations.length > 1}
        <select
            bind:value={variationIndex}
        >
            {#each variations as variation, idx}
                <option value={idx}>{variation.descriptor}</option>
            {/each}
        </select>

        <button>Delete</button>
    {/if}

    <div class="variationData">
        <h2>Price</h2>
        <p>${(variations[variationIndex].price / 100).toFixed(2)}</p>
    </div>

    <div class="variationData">
        <h2>Shipping Cost</h2>
        <p>${(variations[variationIndex].shipping / 100).toFixed(2)}</p>
    </div>

    <div class="variationData">
        <h2>Quantity</h2>
        <p>{variations[variationIndex].quantity}</p>
    </div>
</div>
{/if}


<style>
    .divider{
        border-bottom: 2px solid var(--text);
    }

    select{
        background: none;
        border: 1px solid var(--text);
        color: var(--text);
        font-size: 24px;
        margin: 35px 0 0 35px;
        padding: 5px 15px;
        cursor: pointer;
        font-weight: bold;
    }

    .variationData{
        padding: 35px;
    }

    .variationData h2{
        margin-bottom: 5px;
    }
</style>
