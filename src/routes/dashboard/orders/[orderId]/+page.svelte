<script>
    import {getContext} from "svelte";
    import {enhance} from "$app/forms";
    import CartItem from "./CartItem.svelte";
    import Decline from "./Decline.svelte";

    const loader = getContext("loader");
    const notify = getContext("notify");
    let {data, form} = $props();
    let order = $state(data.order);
    let decline = $state(false);
    let displayStatus = $derived.by(()=>{
        switch(order.status){
            case "incomplete": return "Unpaid order";
            case "paid": return "Awaiting order confirmation";
            case "paymentFailed": return "Payment Failed";
            case "declined": return "Declined";
            case "confirmed": return "Awaiting shipment";
            case "shipped": return "Shipped";
        }
    });

    const update = ()=>{
        loader(true);

        return async ({update})=>{
            await update({reset: false});
            order = form.order;
            loader(false);
        }
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
</script>

<svelte:head>
    <title>Order {order.orderNumber} | Vendor.Inlet.Shop</title>
</svelte:head>

{#if decline}
    <Decline
        orderId={order._id}
        close={()=>{decline = false}}
        update={update}
    />
{/if}

<div class="Order">
    <a
        href="/dashboard/orders"
        class="back"
        aria-label="Go back"
    >
        <svg width="24px" height="24px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" color="#000000">
            <path d="M21 12L3 12M3 12L11.5 3.5M3 12L11.5 20.5" stroke="#e1e1e1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </a>
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
                <form
                    action="?/update",
                    method="post"
                    use:enhance={update}
                >
                    <input type="hidden" value={order._id} name="id">
                    <input type="hidden" value="confirmed" name="status">
                    <button class="button confirm">Confirm</button>
                </form>

                <button
                    class="button decline"
                    onclick={()=>{decline = true}}
                >Decline</button>
            </div>
        {:else if order.status === "paymentFailed"}
            <p>Payment failed. No further action necessary.</p>
        {:else if order.status === "declined"}
            <p>You have declined this order.</p>
        {:else if order.status === "confirmed"}
            {#if hasShippedItems()}
                <p>Order is confirmed and waiting on shipping.</p>

                <form
                    class="buttonBox"
                    action="?/update",
                    method="post"
                    use:enhance={update}
                >
                    <input type="hidden" name="id" value={order._id}>
                    <input type="hidden" name="status" value="shipped">
                    <button class="button">I Have Shipped the Order</button>
                </form>
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
        color: white;
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
</style>
