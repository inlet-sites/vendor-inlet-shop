<script>
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();
    let product = $state({
        name: "",
        tags: [""],
        description: ""
    });
    let variations = $state(false);

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
        dispatch("next", {
            step: "variations",
            product: product,
            variations: variations
        });
    }
</script>

<div class="BasicData">
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

        <h3>Does this product have multiple variations?</h3>
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
        padding-left: 35px;
        max-width: 1200px;
    }

    textarea{
        font-size: 26px;
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
