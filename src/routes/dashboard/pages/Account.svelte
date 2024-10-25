<script>
    import ChangePassModal from "../components/ChangePassModal.svelte";

    let {vendor} = $props();
    let modal = $state(false);
</script>

<div class="container">
    {#if modal}
        <ChangePassModal
            on:cancel={modal = false}
            on:notify
        />
    {/if}

    <h1>{vendor.store}</h1>

    <button
        class="changePass"
        onclick={modal = true}
    >Change Password</button>
</div>

<style>
    .container{
        padding: 35px;
        color: rgb(225, 225, 225);
    }

    h1{
        margin-bottom: 35px; 
    }

    .changePass{
        background: white;
        border: none;
        font-size: 22px;
        padding: 10px;
        cursor: pointer;
        border: 2px outset white;
    }

    .changePass:active{
        border-style: inset
    }

    .changePass:hover{
        background: rgb(200, 200, 200);
    }
</style>
