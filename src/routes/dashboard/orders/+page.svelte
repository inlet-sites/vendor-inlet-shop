<script>
    import {getContext} from "svelte";
    import {enhance} from "$app/forms";
    import LoadError from "$lib/LoadError.svelte";

    const loader = getContext("loader");
    const notify = getContext("notify");
    let {data, form} = $props();
    let orders = $state(data.orders);
    let incomplete = $state(false);
    let paid = $state(true);
    let paymentFailed = $state(false);
    let declined = $state(false);
    let confirmed = $state(false);
    let shipped = $state(false);

    if(orders.error) notify("error", orders.error.message);

    const search = ()=>{
        loader(true);

        return async ({update, data})=>{
            await update({reset: false});
            orders = form.orders;
            if(orders.error) notify("error", orders.error.message);
            loader(false);
        }
    }
</script>

<svelte:head>
    <title>Orders | Vendor.Inlet.Shop</title>
</svelte:head>

<div class="Orders">
    <h1>Orders</h1>

    <form
        class="search"
        action="?/search"
        method="post"
        use:enhance={search}
    >
        <div class="searchDates">
            <h4>Dates</h4>
            <label>From
                <input
                    type="date"
                    name="searchFrom"
                >
            </label>

            <label>To
                <input
                    type="date"
                    name="searchTo"
                >
            </label>
        </div>

        <h4>Status</h4>
        <div class="searchStatus">
            <label>Unpaid Order
                <input
                    type="checkbox"
                    name="incomplete"
                    bind:checked={incomplete}
                >
            </label>

            <label>Paid
                <input
                    type="checkbox"
                    name="paid"
                    bind:checked={paid}
                >
            </label>

            <label>Payment Failed
                <input
                    type="checkbox"
                    name="paymentFailed"
                    bind:checked={paymentFailed}
                >
            </label>

            <label>Declined
                <input
                    type="checkbox"
                    name="declined"
                    bind:checked={declined}
                >
            </label>

            <label>Vendor Confirmed
                <input
                    type="checkbox"
                    name="confirmed"
                    bind:checked={confirmed}
                >
            </label>

            <label>Shipped
                <input
                    type="checkbox"
                    name="shipped"
                    bind:checked={shipped}
                >
            </label>
        </div>

        <button class="button">Search</button>
    </form>
    
    {#if orders.length > 0}
        {#each orders as order}
            <a class="order" href="/dashboard/orders/{order.id}">
                <p class="orderNumber">Order No. {order.orderNumber}</p>
                <p class="name">{order.name}</p>
                <p class="email">{order.email}</p>
                <p class="total">${(order.total / 100).toFixed(2)}</p>
            </a>
        {/each}
    {:else}
        <h2>No Orders to Display</h2>
    {/if}
</div>

<style>
    .Orders{
        color: var(--text);
        padding: 35px;
        width: 100%;
        position: relative;
    }

    .search{
        display: flex;
        flex-direction: column;
        border: 1px solid white;
        padding: 15px;
    }

    .searchDates{
        margin-bottom: 15px;
    }

    .searchStatus{
        display: flex;
        align-items: center;
    }

    .searchStatus label{
        display: flex;
        flex-direction: row-reverse;
        justify-content: flex-end;
        align-items: center;
        margin: 0 5px;
    }

    .searchStatus input{
        height: 25px;
        width: 25px;
        margin: 5px 5px 5px 0;
        margin-right: 5px;
    }

    .search button{
        font-size: 14px;
        width: 100px;
        margin-top: 15px;
    }

    .order{
        display: flex;
        width: 75%;
        background: var(--text);
        border: none;
        margin: 15px 0;
        padding: 25px;
        font-size: 18px;
        cursor: pointer;
        position: relative;
        color: black;
        text-decoration: none;
    }

    .orderNumber{
        position: absolute;
        top: 5px;
        left: 25%;
        font-size: 12px;
        width: 50%;
        text-align: center;
    }

    .order .name{
        width: 25%;
        text-align: left;
    }

    .order .email{
        width: 50%;
        text-align: left;
    }

    h2{
        margin-top: 35px;
        font-size: 45px;
    }
</style>
