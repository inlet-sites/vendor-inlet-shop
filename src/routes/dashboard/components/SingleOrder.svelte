<script>
    import {onMount, createEventDispatcher} from "svelte";
    import CartItem from "./CartItem.svelte";

    const dispatch = createEventDispatcher();
    let {orderId} = $props();
    let order = $state({});
    let displayStatus = $state();
    let declineModal = $state(false);
    let modalNote = $state(false);
    let declineNote = $state();
    const apiUrl = import.meta.env.VITE_API_URL;
    $effect(()=>{
        switch(order.status){
            case "incomplete":
                displayStatus = "Unpaid order";
                break;
            case "paid":
                displayStatus = "Awaiting order confirmation";
                break;
            case "paymentFailed":
                displayStatus = "Payment Failed";
                break;
            case "declined":
                displayStatus = "Declined";
                break;
            case "confirmed":
                displayStatus = "Awaiting shipment";
                break;
            case "shipped":
                displayStatus = "Shipped";
                break;
        }
    });

    const variationName = (item)=>{
        const variation = getVariationForItem(item);
        return `${variation.descriptor} ($${(variation.price / 100).toFixed(2)})`;
    }

    const shipping = (item)=>{
        const variation = getVariationForItem(item);
        return ((variation.shipping * item.quantity) / 100).toFixed(2);
    }

    const total = (item)=>{
        const variation = getVariationForItem(item);
        const price = variation.price * item.quantity;
        const shipping = variation.shipping * item.quantity;
        return ((price + shipping) / 100).toFixed(2);
    }

    const getVariationForItem = (item)=>{
        return item.product.variations.find(v => v.id === item.variation);
    }

    const stripeFee = (total)=>{
        return (total * 0.029) + 30;
    }

    const hasShippedItems = ()=>{
        for(let i = 0; i < order.items.length; i++){
            const variation = getVariationForItem(order.items[i]);
            if(variation.purchaseOption === "ship") return true;
        }
        return false;
    }

    const update = (status)=>{
        dispatch("loader", {on: true});
        fetch(`${apiUrl}/order/${order._id}`, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("vendorToken")}`
            },
            body: JSON.stringify({
                status: status
            })
        })
            .then(r=>r.json())
            .then((response)=>{
                if(response.error){
                    dispatch("notify", {type: "error", message: response.error.message});
                }else{
                    order = response;
                    let message = "";
                    switch(status){
                        case "confirmed": message = "Order confirmed"; break;
                        case "shipped": message = "Order marked as shipped"; break;
                    }
                    dispatch("notify", {
                        type: "success",
                        message: message
                    });
                    order.status = status;
                }
            })
            .catch((err)=>{
                dispatch("notify", {
                    type: "error",
                    message: "Something went wrong, try refreshing the page"
                });
            })
            .finally(()=>{
                dispatch("loader", {on: false});
            });
    }

    const decline = ()=>{
        dispatch("loader", {on: true});
        const refundProm = fetch(`${apiUrl}/order/${order._id}/refund`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("vendorToken")}`
            }
        });
        const orderProm = fetch(`${apiUrl}/order/${order._id}`, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("vendorToken")}`
            },
            body: JSON.stringify({
                status: "declined",
                note: declineNote
            })
        });

        Promise.all([refundProm, orderProm])
            .then(r => Promise.all(r.map(res => res.json())))
            .then((response)=>{
                order = response[1];
                dispatch("notify", {
                    type: "success",
                    message: "Order declined and refunded"
                });
            })
            .catch((err)=>{
                dispatch("notify", {
                    type: "error",
                    message: "Something went wrong, try refreshing the page"
                });
            })
            .finally(()=>{
                dispatch("loader", {on: false});
                declineModal = false;
            });
    }

    const formatItem = (item)=>{
        let variation;
        for(let i = 0; i < item.product.variations.length; i++){
            if(item.product.variations[i].id === item.variation){
                variation = item.product.variations[i];
                break;
            }
        }

        return {
            product: item.product,
            variation: variation,
            quantity: item.quantity
        };
    }

    onMount(()=>{
        dispatch("loader", {on: true});
        fetch(`${import.meta.env.VITE_API_URL}/order/${orderId}/vendor`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("vendorToken")}`
            }
        })
            .then(r=>r.json())
            .then((response)=>{
                if(response.error){
                    dispatch("notify", {type: "error", message: response.error.message});
                }else{
                    order = response;
                }
            })
            .catch((err)=>{
                dispatch("notify", {
                    type: "error",
                    message: "Something went wrong, try refreshing the page"
                });
            })
            .finally(()=>{
                dispatch("loader", {on: false});
            });
    });
</script>

{#if declineModal}
    <div class="modalContainer">
        <div class="declineModal">
            {#if modalNote}
                <p>Please enter a note for the customer explaining why the order was declined.</p>
                <p>This note will be sent in an email notifying the customer that it has been declined.</p>

                <textarea bind:value={declineNote} rows="5"></textarea>

                <div class="declineButtonBox">
                    <button
                        class="button"
                        onclick={()=>{declineModal = false; modalNote = false;}}
                    >Cancel</button>

                    <button
                        class="button decline"
                        onclick={decline}
                    >Decline</button>
                </div>
            {:else}
                <p>Declining will cancel the order and the customer will be issued a full refund.</p>
                <p>Are you sure that you want to decline this order?</p>

                <div class="declineButtonBox">
                    <button
                        class="button"
                        onclick={()=>{declineModal = false}}
                    >Cancel</button>
                    
                    <button
                        class="button decline"
                        onclick={()=>{modalNote = true}}
                    >Confirm</button>
                </div>
            {/if}
        </div>
    </div>
{/if}

<div class="Order">
    <button
        class="back"
        onclick={()=>{dispatch("close")}}
        aria-label="Go back"
    >
        <svg width="24px" height="24px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" color="#000000">
            <path d="M21 12L3 12M3 12L11.5 3.5M3 12L11.5 20.5" stroke="#e1e1e1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </button>
    <h1>Order No. {order.orderNumber}</h1>
    <h2>{order.name}</h2>
    <h2>{order.email}</h2>
    <h3>{order.address}</h3>

    <h3 class="tableTitle">Items Purchased</h3>
    {#each order.items as item}
        <CartItem
            item={formatItem(item)}
            vendor={order.vendor[0].store}
            edit={false}
        />
    {/each}

    <h3>Grand Total: ${(order.total / 100).toFixed(2)}</h3>
    <h3>Stripe Fee: ${(stripeFee(order.total) / 100).toFixed(2)}</h3>
    <h3>You recieved: ${((order.total - stripeFee(order.total)) / 100).toFixed(2)}</h3>

    <p class="status">Current Status: {displayStatus}</p>

    <div class="actions">
        <h2>Actions</h2>

        {#if order.status === "incomplete"}
            <p>Awaiting payment, no actions to take at this time.</p>
        {:else if order.status === "paid"}
            <p>Payment complete, please confirm the order.</p>
            <p>If you decline the order, a full refund will be issued to the customer.</p>

            <div class="buttonBox">
                <button
                    class="button confirm"
                    onclick={()=>{update("confirmed")}}
                >Confirm</button>

                <button
                    class="button decline"
                    onclick={()=>{declineModal = true}}
                >Decline</button>
            </div>
        {:else if order.status === "paymentFailed"}
            <p>Payment failed. No further action necessary.</p>
        {:else if order.status === "declined"}
            <p>You have declined this order.</p>
        {:else if order.status === "confirmed"}
            {#if hasShippedItems()}
                <p>Order is confirmed and waiting on shipping.</p>

                <div class="buttonBox">
                    <button
                        class="button"
                        onclick={()=>{update("shipped")}}
                    >I Have Shipped the Order</button>
                </div>
            {:else}
                <p>Order confirmed. Waiting on customer pick-up.</p>
            {/if}
        {:else if order.status === "shipped"}
            <p>Order shipped and completed. No further action required.</p>
        {/if}
    </div>
</div>

<style>
    .Order{
        position: absolute;
        top: 0;
        left: 0;
        background: rgb(0, 0, 25);
        height: 100%;
        width: 100%;
        padding: 55px 35px 35px 35px;
        z-index: 2;
    }

    .back{
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 10px;
        left: 35px;
        background: none;
        border: 1px solid var(--text);
        border-radius: 50%;
        padding: 5px;
        cursor: pointer;
    }

    .status{
        font-size: 22px;
        margin-top: 35px;
    }

    .actions{
        margin-top: 35px;
    }

    .actions h2{
        text-decoration: underline;
        margin-bottom: 15px;
    }

    .actions p{
        font-size: 22px;
        color: rgba(255, 150, 0, 0.75);
    }

    .buttonBox{
        margin-top: 15px;
    }

    .confirm{
        background: green;
        color: var(--text);
    }

    .decline{
        background: red;
        color: var(--text);
    }

    .modalContainer{
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
</style>
