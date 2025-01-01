<script>
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();

    const submit = ()=>{
        dispatch("finished");
    }
</script>

<div class="VariationExplanation">
    <div class="modal">
        <p>A product may have multiple prices.</p>
        <p>This can be useful if you are selling a product that has a few different variations.</p>
        <p>For example, you may be selling T-shirts that have sizes "Small", "Medium", and "Large".</p>
        <p>Each price has its own descriptor(short name), price, quantity available, shipping cost and images (which are only displayed when the customer is viewing that specific price).</p>
        <p>Every product can have an unlimited number of variations, and these can be changed at any time.</p>
        <p>For a standard product with a single price/quantity/etc. leave this this box un-checked.</p>
        <button class="button" onclick={submit}>OK</button>
    </div>
</div>

<style>
    .VariationExplanation{
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        backdrop-filter: blur(2px);
    }

    .modal{
        display: flex;
        flex-direction: column;
        background: var(--text);
        color: black;
        max-width: 500px;
        border: 2px solid var(--highlite);
    }

    p{
        margin: 15px;
    }

    button{
        margin: 15px auto;
        width: 150px;
    }
</style>
