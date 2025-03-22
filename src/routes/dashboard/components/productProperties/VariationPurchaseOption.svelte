<script>
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();
    let {purchaseOption, productId, variationId} = $props();
    let edit = $state(false);

    const submit = ()=>{
        console.log(purchaseOption);
        console.log("submit");
    }
</script>

<div class="VariationPurchaseOption">
    {#if edit}
        <h2>Purchase Option</h2>
        <select bind:value={purchaseOption} onchange={submit}>
            <option value="list">Display item only</option>
            <option value="buy">Purchase online, pickup in store</option>
            <option value="ship">Purchase online and ship item</option>
        </select>
    {:else}
        <div class="title">
            <h2>Purchase Option</h2>

            <button onclick={()=>{edit = true}} aria-label="edit">
                <svg width="24px" height="24px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" color="#currentColor">
                    <path d="M14.3632 5.65156L15.8431 4.17157C16.6242 3.39052 17.8905 3.39052 18.6716 4.17157L20.0858 5.58579C20.8668 6.36683 20.8668 7.63316 20.0858 8.41421L18.6058 9.8942M14.3632 5.65156L4.74749 15.2672C4.41542 15.5993 4.21079 16.0376 4.16947 16.5054L3.92738 19.2459C3.87261 19.8659 4.39148 20.3848 5.0115 20.33L7.75191 20.0879C8.21972 20.0466 8.65806 19.8419 8.99013 19.5099L18.6058 9.8942M14.3632 5.65156L18.6058 9.8942" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </button>
        </div>

        {#if purchaseOption === "list"}
            <p>Display item only</p>
        {:else if purchaseOption === "buy"}
            <p>Purchase online, pickup in store</p>
        {:else if purchaseOption === "ship"}
            <p>Purchase online and ship item</p>
        {/if}
    {/if}
</div>

<style>
    .VariationPurchaseOption{
        padding: 35px;
    }

    .title{
        display: flex;
        align-items: center;
    }

    .title button{
        color: white;
        background: none;
        border: none;
        cursor: pointer;
    }

    h2{
        margin: 0 15px 5px 0;
    }

    select{
        font-size: 28px;
    }
</style>
