<script>
    let {quantity} = $props();
    let edit = $state(false);

    const submit = ()=>{
        console.log("submitting");
    }
</script>

<div class="VariationQuantity">
    {#if edit}
        <div class="title">
            <h2>Quantity</h2>
            <button onclick={submit} aria-label="submit">
                <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="currentColor">
                    <path d="M5 13L9 17L19 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </button>
        </div>

        <form onsubmit={submit}>
            <input
                type="number"
                bind:value={quantity}
                min="0"
                step="1"
                required
            />
        </form>
    {:else}
        <div class="title">
            <h2>Quantity</h2>
            <button onclick={()=>{edit = true}} aria-label="edit">
                <svg width="24px" height="24px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" color="currentColor">
                    <path d="M14.3632 5.65156L15.8431 4.17157C16.6242 3.39052 17.8905 3.39052 18.6716 4.17157L20.0858 5.58579C20.8668 6.36683 20.8668 7.63316 20.0858 8.41421L18.6058 9.8942M14.3632 5.65156L4.74749 15.2672C4.41542 15.5993 4.21079 16.0376 4.16947 16.5054L3.92738 19.2459C3.87261 19.8659 4.39148 20.3848 5.0115 20.33L7.75191 20.0879C8.21972 20.0466 8.65806 19.8419 8.99013 19.5099L18.6058 9.8942M14.3632 5.65156L18.6058 9.8942" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </button>
        </div>
        <p>{quantity}</p>
    {/if}
</div>

<style>
    .VariationQuantity{
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

    input{
        font-size: 28px;
    }
</style>
