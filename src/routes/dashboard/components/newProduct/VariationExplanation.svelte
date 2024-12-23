<script>
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();

    const submit = ()=>{
        dispatch("finished");
    }
</script>

<div class="VariationExplanation">
    <div class="modal">
        <p>Variations of a product are different versions of the same product. For example, if you are selling T-Shirts, then you may have "Small", "Medium", and "Large". Each one of these may have its own pictures, price, shipping, and quantity.</p>
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
        margin: 25px;
    }

    button{
        margin: 15px auto;
        width: 150px;
    }
</style>
