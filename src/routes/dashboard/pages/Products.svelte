<script>
    import {onMount, createEventDispatcher} from "svelte";
    import Loader from "../../../components/Loader.svelte";
    import NewProduct from "../components/NewProduct.svelte";
    import SingleProduct from "../components/SingleProduct.svelte";

    const dispatch = createEventDispatcher();
    let loader = $state(false);
    let products = $state([]);
    let newProduct = $state(false);
    let singleProduct = $state(null);
    let searchString = $state("");
    let allProducts = [];

    const displayProduct = (id)=>{
        singleProduct = id;
    }

    const createNew = ()=>{
        newProduct = true;
    }

    const closeCreate = ()=>{
        newProduct = false;
    }

    const search = ()=>{
        const s = searchString.toLowerCase();
        products = allProducts.filter(p => p.name.toLowerCase().includes(s));
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
                    products = response;
                    allProducts = response;
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
    <header>
        <div class="search">
            <input
                type="text"
                bind:value={searchString}
                placeholder="Search"
                onchange={search}
            >

            <button class="searchButton" onclick={search}>
                <svg width="24px" height="24px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" color="#000000">
                    <path d="M17 17L21 21" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M3 11C3 15.4183 6.58172 19 11 19C13.213 19 15.2161 18.1015 16.6644 16.6493C18.1077 15.2022 19 13.2053 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </button>
        </div>
        
        <button class="button newProd" onclick={createNew}>New</button>
    </header>


    <div class="products">
        {#each products as product}
            <button class="product" onclick={()=>{displayProduct(product.id)}}>
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

    {#if singleProduct}
        <SingleProduct
            productId={singleProduct}
            on:notify
            on:close={()=>{singleProduct=null}}
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

    header{
        display: flex;
        justify-content: space-between;
        width: 90%;
        margin: 0 auto 35px auto;
    }

    .searchButton{
        background: none;
        border: none;
        cursor: pointer;
    }

    .search{
        display: flex;
        align-items: center;
    }

    .search input{
        font-size: 22px;
        padding-left: 15px;
    }

    .search svg{
        margin-left: -35px;
    }

    .newProd{
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
