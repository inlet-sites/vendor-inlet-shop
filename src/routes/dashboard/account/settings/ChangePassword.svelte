<script>
    import {getContext} from "svelte";
    import {goto} from "$app/navigation";

    const vendor = getContext("vendor");
    const loader = getContext("loader");
    const notify = getContext("notify");
    let {cancel} = $props();
    let password = $state();
    let confirmPassword = $state();
</script>

<div class="ChangePassword">
    <div class="modal">
        <h2>Change Password</h2>
        <p>This will log you out of all devices</p>

        <form action="?/changePassword" method="post">
            <label>New Password
                <input
                    type="password"
                    name="password"
                    required
                >
            </label>

            <label>Confirm Password
                <input
                    type="password"
                    name="confirmPassword"
                    required
                >
            </label>

            <input
                type="hidden"
                name="vendorId"
                value={$vendor.id}
            >

            <div class="buttonBox">
                <button class="button cancel" type="button" onclick={cancel}>Cancel</button>

                <button class="button">Submit</button>
            </div>
        </form>

    </div>
</div>

<style>
    .ChangePassword{
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        backdrop-filter: blur(10px);
        z-index: 10;
    }

    .modal{
        background: white;
        width: 350px;
        padding: 15px;
        box-shadow: 0 0 10px black;
        border: 2px solid red;
    }

    .modal > *{
        margin: 15px 0;
    }

    label{
        display: flex;
        flex-direction: column;
    }

    input{
        font-size: 22px;
    }

    form > *{
        margin: 15px 0;
    }

    .buttonBox{
        display: flex;
        justify-content: space-between;
    }

    .buttonBox button{
        font-size: 18px;
    }

    .cancel{
        background: red;
        color: white;
    }
</style>
