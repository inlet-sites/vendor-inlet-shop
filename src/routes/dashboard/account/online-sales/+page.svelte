<script>
    import {getContext} from "svelte";
    import StripeSetup from "./StripeSetup.svelte";

    const vendor = getContext("vendor");
    let stripeSetup = $state(false);
</script>

<div class="OnlineSales">
    {#if $vendor}
        {#if $vendor.onlineSales}
            <h3>Your account is setup and ready for online sales</h3>

            <a
                href="https://stripe.com/dashboard"
                class="button"
                target="_blank"
            >View Dashboard</a>
        {:else}
            <h3>Your account is not setup for online sales</h3>
            <h4>You may still list items for display.</h4>

            <button
                class="button"
                onclick={()=>{stripeSetup = true}}
            >Set Up Online Sales</button>
        {/if}
    {/if}

    {#if stripeSetup}
        <StripeSetup
            close={()=>{stripeSetup = false}}
        />
    {/if}
</div>

<style>
    .OnlineSales{
        color: white;
        position: relative;
    }

    h3, h4{
        margin-bottom: 35px;
    }
</style>
