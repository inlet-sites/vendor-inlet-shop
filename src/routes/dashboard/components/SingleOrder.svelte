<script>
    import {onMount, createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();
    let {orderId} = $props();
    let order = $state({});
    let displayStatus = $state();
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
                displayStatus = "Declined by vendor";
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

    const update = (status)=>{
        dispatch("loader", {on: true});
        fetch(`${import.meta.env.VITE_API_URL}/order/${order._id}`, {
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
                }
            })
            .catch((err)=>{
                console.log(err);
                dispatch("notify", {
                    type: "error",
                    message: "Something went wrong, try refreshing the page"
                });
            })
            .finally(()=>{
                dispatch("loader", {on: false});
            });
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
    <h1>{order.name}</h1>
    <h2>{order.email}</h2>
    <h3>{order.address}</h3>

    <h3 class="tableTitle">Items Purchased</h3>
    <table class="items">
        <thead>
            <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Shipping</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            {#each order.items as item}
                <tr>
                    <td>{item.product.name}</td>
                    <td>{variationName(item)}</td>
                    <td>{item.quantity}</td>
                    <td>${shipping(item)}</td>
                    <td>${total(item)}</td>
                </tr>
            {/each}
        </tbody>
    </table>

    <h3>Grand Total: ${(order.total / 100).toFixed(2)}</h3>
    <h3>Stripe Fee: ${(stripeFee(order.total) / 100).toFixed(2)}</h3>
    <h3>You recieved: ${((order.total - stripeFee(order.total)) / 100).toFixed(2)}</h3>

    <p class="status">Current Status: {displayStatus}</p>

    {#if order.status === "paid"}
        <button
            class="button"
            onclick={()=>{update("confirmed")}}
        >Confirm Order</button>
    {:else if order.status === "confirmed"}
        <button
            class="button"
            onclick={()=>{update("shipped")}}
        >Order Shipped</button>
    {:else if order.status === "declined"}
        <p>Ensure that you refund the customer through Stripe</p>
    {/if}

    <div class="actions">
        <h2>Actions</h2>

        {#if order.status === "incomplete"}
            <p>Awaiting payment, no actions to take at this time.</p>
        {/if}
    </div>
</div>

<style>
    .Order{
        position: absolute;
        top: 0;
        bottom: 0;
        background: rgb(0, 0, 25);
        height: 100%;
        width: 100%;
        padding: 35px;
        z-index: 2;
    }

    .back{
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 10px;
        left: -10px;
        background: none;
        border: 1px solid var(--text);
        border-radius: 50%;
        padding: 5px;
        cursor: pointer;
    }

    .tableTitle{
        margin-top: 35px;
    }

    table{
        margin-bottom: 35px;
    }

    th,td{
        border: 1px solid var(--text);
        padding: 10px;
        text-align: center;
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
</style>
