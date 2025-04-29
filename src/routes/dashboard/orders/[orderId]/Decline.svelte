<script>
    import {enhance} from "$app/forms";

    let {close, orderId, update} = $props();
    let modalNote = $state(false);
    let declineNote = $state();
</script>

<div class="Decline">
    <div class="declineModal">
        {#if modalNote}
            <form
                action="?/decline"
                method="post"
                use:enhance={update}
            >
                <p>Please enter a note for the customer explaining why the order was declined.</p>
                <p>This note will be sent in an email notifying the customer that it has been declined.</p>

                <textarea bind:value={declineNote} rows="5" name="declineNote"></textarea>
                <input type="hidden" name="id" value={orderId}>

                <div class="declineButtonBox">
                    <button
                        class="button"
                        onclick={close}
                    >Cancel</button>

                    <button class="button decline">Decline</button>
                </div>
            </form>
        {:else}
            <p>Declining will cancel the order and the customer will be issued a full refund.</p>
            <p>Are you sure that you want to decline this order?</p>

            <div class="declineButtonBox">
                <button
                    class="button"
                    onclick={close}
                >Cancel</button>
                
                <button
                    class="button decline"
                    onclick={()=>{modalNote = true}}
                >Confirm</button>
            </div>
        {/if}
    </div>
</div>

<style>
    .Decline{
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        backdrop-filter: blur(10px);
        z-index: 3;
    }

    .declineModal{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 500px;
        background: var(--text);
        padding: 35px;
    }

    .declineModal p{
        font-size: 22px;
        color: black;
        text-align: center;
        margin: 15px 0;
    }

    .declineButtonBox{
        display: flex;
        justify-content: space-around;
        margin-top: 15px;
    }

    .decline{
        background: red;
        color: var(--text);
    }

    textarea{
        width: 100%;
        font-size: 22px;
    }
</style>
