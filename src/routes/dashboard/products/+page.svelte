<script>
    import {onMount, getContext} from "svelte";
    import Product from "./Product.svelte";

    const loader = getContext("loader");
    const notify = getContext("notify");
    let products = $state([]);

    onMount(()=>{
        loader(true);
        fetch(`${import.meta.env.VITE_API_URL}/product/vendor`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("vendorToken")}`
            }
        })
            .then(r=>r.json())
            .then((response)=>{
                if(response.error){
                    notify("error", response.error.message);
                }else{
                    products = response;
                }
            })
            .catch((err)=>{
                notify("error", "Something went wrong, try refreshing the page");
            })
            .finally(()=>{
                loader(false);
            });
    });
</script>

<svelte:head>
    <title>Products | Vendor.Inlet.Shop</title>
</svelte:head>

<div class="container">
    {#each products as product}
        <Product
            product={product}
        />
    {/each}
</div>

<style>
    h1{
        color: white;
    }
</style>
