<script>
    import {onMount, createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();
    let {orderId} = $props();
</script>

<div class="Order">
    <h1>{order.name}</h1>
    <h2>{order.email}</h2>
    <h3>{order.address}</h3>

    <h3>Items Purchased</h3>
    <table class="items">
        <thead>
            <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
            </tr>
        </thead>
        <tbody>
            {#each order.items as item}
                
            {/each}
        </tbody>
    </table>
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
    }
</style>
