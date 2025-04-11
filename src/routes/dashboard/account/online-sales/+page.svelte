<script>
    import {getContext} from "svelte";

    const vendor = getContext("vendor");
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
        {/if}
    {/if}
</div>

<style>
    .OnlineSales{
        color: white;
    }

    h3{
        margin-bottom: 35px;
    }
</style>
