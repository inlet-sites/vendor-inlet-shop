<script>
    import {onMount, createEventDispatcher} from "svelte";
    import Loader from "../../../components/Loader.svelte";
    import NewProduct from "../components/NewProduct.svelte";

    const dispatch = createEventDispatcher();
    let loader = $state(false);
    let products = $state([]);
    let newProduct = $state(false);

    const displayProduct = ()=>{
        console.log("displaying product");
    }

    const createNew = ()=>{
        newProduct = true;
    }

    const closeCreate = ()=>{
        newProduct = false;
    }

    onMount(()=>{
        loader = true;
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
                    dispatch("notify", {
                        type: "error",
                        message: response.message
                    });
                }else{
                    console.log(response);
                    products = response;
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
    });
</script>

{#if loader}
    <Loader/>
{/if}

<div class="container">
    <h1>Your Products</h1>

    <button class="button newProd" onclick={createNew}>New</button>

    <div class="products">
        {#each products as product}
            <button class="product" onclick={displayProduct}>
                <img src="{import.meta.env.VITE_API_URL}/document/{product.images[0]}" alt={product.name}>
                <h2>{product.name}</h2>
                <p>${(product.price / 100).toFixed(2)}</p>
            </button>
        {/each}
    </div>

    {#if newProduct}
        <NewProduct
            on:closeCreate={closeCreate}
            on:notify
        />
    {/if}
</div>

<style>
    .container{
        height: 100%;
        width: 100%;
        position: relative;
        padding-top: 55px;
    }

    .newProd{
        position: absolute;
        top: 35px;
        right: 35px;
    }

    .products{
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
    }

    .product{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 250px;
        border: 1px solid white;
        margin: 15px 0;
        cursor: pointer;
        padding-bottom: 15px;
    }

    .product img{
        width: 100%;
    }

    .product h2, .product p{
        margin-left: 15px;
    }
</style>
