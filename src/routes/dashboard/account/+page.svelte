<script>
    import OrderEmail from "./settings/OrderEmail.svelte";
    import ChangePassword from "./settings/ChangePassword.svelte";

    let changePass = $state(false);
</script>

<svelte:head>
    <title>Account Settings | Vendor.Inlet.Shop</title>
</svelte:head>

<div class="Settings">
    {#if changePass}
        <ChangePassword
            cancel={()=>{changePass = false}}
        />
    {/if}

    <OrderEmail/>

    <button
        onclick={()=>{changePass = true}}
        class="button"
    >Change Password</button>
</div>

<style>
    button.button{
        margin-top: 35px;
    }
</style>
