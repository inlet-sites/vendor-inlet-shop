<script>
    import {onMount, createEventDispatcher} from "svelte";
    import Loader from "../../../components/Loader.svelte";
    import NewProduct from "../components/NewProduct.svelte";
    import SingleProduct from "../components/SingleProduct.svelte";

    const dispatch = createEventDispatcher();
    let {onlineSales} = $props();
    let loader = $state(false);
    let products = $state([]);
    let newProduct = $state(false);
    let singleProduct = $state(null);
    let searchString = $state("");
    let tags = $state([]);
    let allProducts = [];
    let activeTag = $state("all");

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

    const updateProduct = (event)=>{
        const product = allProducts.find(p => p.id === event.detail.id);
        product[event.detail.type] = event.detail.data;
        products = allProducts;
        if(event.detail.type === "tags") updateTags();
    }

    const addProduct = (event)=>{
        allProducts.push(event.detail.product);
        products = allProducts;
        updateTags();
    }

    const removeProduct = (event)=>{
        for(let i = 0; i < allProducts.length; i++){
            if(allProducts[i].id === event.detail.product){
                allProducts.splice(i, 1);
                products = allProducts;
                updateTags();
                break;
            }
        }
        singleProduct = null;
    }

    const tagSearch = (tag)=>{
        activeTag = tag;

        if(tag === "all"){
            products = allProducts;
            return;
        }

        products = [];
        for(let i = 0; i < allProducts.length; i++){
            for(let j = 0; j < allProducts[i].tags.length; j++){
                if(allProducts[i].tags[j].toLowerCase() === tag){
                    products.push(allProducts[i]);
                    break;
                }
            }
        }
    }

    const updateTags = ()=>{
        const tempTags = new Set();
        for(let i = 0; i < allProducts.length; i++){
            for(let j = 0; j < allProducts[i].tags.length; j++){
                tempTags.add(allProducts[i].tags[j].toLowerCase());
            }
        }
        tags = Array.from(tempTags);
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
                        message: response.error.message
                    });
                }else{
                    products = response;
                    allProducts = response;
                    updateTags();
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

<div class="Products">
    {#if !newProduct && !singleProduct}
    <header>
        <div class="search">
            <input
                type="text"
                bind:value={searchString}
                placeholder="Search"
                onchange={search}
            >

            <button class="searchButton" onclick={search} aria-label="edit">
                <svg width="24px" height="24px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" color="#000000">
                    <path d="M17 17L21 21" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M3 11C3 15.4183 6.58172 19 11 19C13.213 19 15.2161 18.1015 16.6644 16.6493C18.1077 15.2022 19 13.2053 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </button>
        </div>
        
        <button class="button newProd" onclick={createNew}>New</button>
    </header>

    <div class="tags">
        <button
            class:active={activeTag === "all"}
            onclick={()=>{tagSearch("all")}}>ALL</button>
        {#each tags as tag}
            <button
                class:active={activeTag === tag}
                onclick={()=>{tagSearch(tag.toLowerCase())}}
            >{tag.toUpperCase()}</button>
        {/each}
    </div>

    <div class="products">
        {#each products as product}
            <button class="product" onclick={()=>{displayProduct(product.id)}}>
                <img src="{import.meta.env.VITE_API_URL}/document/{product.images[0]}" alt={product.name}>
                <h2>{product.name}</h2>
                {#if product.variations.length > 1}
                    <p>
                        ${(product.variations.reduce((a, c) => c.price < a ? c.price : a, product.variations[0].price) / 100).toFixed(2)}
                        -
                        ${(product.variations.reduce((a, c) => c.price > a ? c.price : a, 0) / 100).toFixed(2)}
                    </p>
                {:else}
                    <p>${(product.variations[0].price / 100).toFixed(2)}</p>
                {/if}
            </button>
        {/each}
    </div>
    {/if}

    {#if newProduct}
        <NewProduct
            onlineSales={onlineSales}
            on:closeCreate={closeCreate}
            on:addProduct={addProduct}
            on:notify
            on:cancel={closeCreate}
        />
    {/if}

    {#if singleProduct}
        <SingleProduct
            productId={singleProduct}
            on:update={updateProduct}
            on:removeProduct={removeProduct}
            on:notify
            on:close={()=>{singleProduct=null}}
        />
    {/if}
</div>

<style>
    .Products{
        height: 100%;
        width: 100%;
        position: relative;
        padding-top: 55px;
    }

    header{
        display: flex;
        justify-content: space-between;
        width: 90%;
        margin: 0 auto;
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

    .tags{
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        margin-bottom: 35px;
    }

    .tags button{
        background: white;
        border: 2px outset white;
        font-size: 16px;
        padding: 5px 10px;
        margin: 5px 0;
        cursor: pointer;
    }

    .tags button:hover{
        background: var(--text);
    }

    .tags button.active{
        border: 2px inset white;
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

    @media screen and (max-width: 850px){
        .Products{
            padding-top: 95px;
        }
    }

    @media screen and (max-width: 550px){
        .Products{
            padding-top: 95px;
        }

        .newProd{
            position: absolute;
            top: 25px;
            left: 25px;
        }

        .search{
            margin: 0 auto 15px auto;
        }
    }
</style>
