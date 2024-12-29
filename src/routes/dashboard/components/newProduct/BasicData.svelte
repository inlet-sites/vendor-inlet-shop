<script>
    import {createEventDispatcher} from "svelte";
    import VariationExplanation from "./VariationExplanation.svelte";

    const dispatch = createEventDispatcher();
    let product = $state({
        name: "",
        tags: [""],
        description: ""
    });
    let variations = $state(false);
    let variationExplanation = $state(false);

    $effect(()=>{
        let needsField = true;
        for(let i = 0; i < product.tags.length; i++){
            if(product.tags[i] === ""){
                needsField = false;
                break;
            }
        }

        if(needsField) product.tags.push("");
    });

    const cancel = ()=>{
        dispatch("cancel");
    }

    const next = ()=>{
        for(let i = 0; i < product.tags.length; i++){
            if(product.tags[i] === ""){
                product.tags.splice(i, 1);
                i--;
            }
        }

        dispatch("next", {
            product: product,
            variations: variations
        });
    }

    const explainVariations = ()=>{
        variationExplanation = !variationExplanation;
    }
</script>

<div class="BasicData">
    {#if variationExplanation}
        <VariationExplanation on:finished={explainVariations}/>
    {/if}
    <h1>New Product</h1>
    <form class="standardForm" onsubmit={next}>
        <h2>Product Information</h2>

        <label>Product Name
            <input
                type="text"
                bind:value={product.name}
                placeholder="Name"
                required
            >
        </label>

        <label>Tags
            {#each product.tags as tag, i}
                <input
                    class="tag"
                    type="text"
                    bind:value={product.tags[i]}
                    placeholder="Tag"
                >
            {/each}
        </label>

        <label>Description
            <textarea
                bind:value={product.description}
                rows="5"
            ></textarea>
        </label>

        <div class="variationTitle">
            <h3>Does this product have multiple variations?</h3>
            <button type="button" onclick={explainVariations} aria-label="Variation Explanation">
                <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="#000000">
                    <path d="M7.90039 8.07954C7.90039 3.30678 15.4004 3.30682 15.4004 8.07955C15.4004 11.4886 11.9913 10.8067 11.9913 14.8976" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M12 19.01L12.01 18.9989" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </button>
        </div>
        <label class="variations">Yes
            <input
                type="checkbox"
                bind:checked={variations}
            >
        </label>

        <div class="buttonBox">
            <button
                type="button"
                class="button cancel"
                onclick={cancel}
            >Cancel</button>

            <button class="button">Next</button>
        </div>
    </form>
</div>

<style>
    .BasicData{
        color: var(--text);
        max-width: 1000px;
    }

    textarea{
        font-size: 26px;
    }

    .variationTitle{
        display: flex;
        align-items: center;
    }

    .variationTitle button{
        display: flex;
        justify-content: center;
        align-items: center;
        background: none;
        border: 2px solid white;
        cursor: pointer;
        border-radius: 50%;
        margin-left: 15px;
    }

    .variations{
        flex-direction: row-reverse;
        justify-content: flex-end;
        align-items: center;
        width: 100px;
        font-size: 26px;
    }

    .variations input{
        display: inline-block;
        height: 26px;
        width: 26px;
        margin-right: 15px;
    }

    .buttonBox .cancel{
        color: red;
        margin: 35px 35px 0 0;
    }
</style>
