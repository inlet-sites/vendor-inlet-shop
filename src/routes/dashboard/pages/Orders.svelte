<script>
    import {onMount, createEventDispatcher} from "svelte";
    import Loader from "../../../components/Loader.svelte";
    import SingleOrder from "../components/SingleOrder.svelte";

    const dispatch = createEventDispatcher();
    let loader = $state(false);
    let orders = $state([]);
    let searchFrom = $state();
    let searchTo = $state();
    let incomplete = $state(true);
    let paid = $state(true);
    let paymentFailed = $state(false);
    let declined = $state(false);
    let confirmed = $state(true);
    let shipped = $state(false);
    let singleOrder = $state(null);

    const craftUrl= ()=>{
        let url = `${import.meta.env.VITE_API_URL}/order?`;
        if(searchFrom) url += `from=${searchFrom}&`;
        if(searchTo) url += `to=${searchTo}&`;

        let status = "";
        if(incomplete) status += ",incomplete";
        if(paid) status += ",paid";
        if(paymentFailed) status += ",paymentFailed";
        if(declined) status += ",declined";
        if(confirmed) status += ",confirmed";
        if(shipped) status += ",shipped";
        if(status.length > 1){
            status = status.slice(1);
            url += `status=${status}`
        }

        return url;
    }

    const search = ()=>{
        loader = true;
        fetch(craftUrl(), {
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
                    orders = response;
                }
            })
            .catch((err)=>{
                dispatch("notify", {
                    type: "error",
                    message: "Something went wrong, try refreshing the page"
                });
            })
            .finally(()=>{
                loader = false;
            });
    }

    onMount(search);
</script>

<div class="Orders">
    {#if loader}
        <Loader/>
    {/if}

    {#if singleOrder}
        <SingleOrder
            orderId={singleOrder}
            on:close={()=>{singleOrder = null}}
            on:loader={(event)=>{loader = event.detail.on}}
            on:notify
        />
    {/if}

    <h1>Orders</h1>

    <div class="search">
        <div class="searchDates">
            <h4>Dates</h4>
            <label>From
                <input
                    type="date"
                    bind:value={searchFrom}
                >
            </label>

            <label>To
                <input
                    type="date"
                    bind:value={searchTo}
                >
            </label>
        </div>

        <h4>Status</h4>
        <div class="searchStatus">
            <label>Unpaid Order
                <input type="checkbox" bind:checked={incomplete}>
            </label>

            <label>Paid
                <input type="checkbox" bind:checked={paid}>
            </label>

            <label>Payment Failed
                <input type="checkbox" bind:checked={paymentFailed}>
            </label>

            <label>Declined
                <input type="checkbox" bind:checked={declined}>
            </label>

            <label>Vendor Confirmed
                <input type="checkbox" bind:checked={confirmed}>
            </label>

            <label>Shipped
                <input type="checkbox" bind:checked={shipped}>
            </label>
        </div>

        <button
            class="button"
            onclick={search}
        >Search</button>
    </div>
    
    {#if orders.length > 0}
        {#each orders as order}
            <button class="order" onclick={()=>{singleOrder = order.id}}>
                <p class="orderNumber">Order No. {order.orderNumber}</p>
                <p class="name">{order.name}</p>
                <p class="email">{order.email}</p>
                <p class="total">${(order.total / 100).toFixed(2)}</p>
            </button>
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
