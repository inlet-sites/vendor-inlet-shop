<script>
    import {onMount, getContext} from "svelte";
    import Product from "./Product.svelte";

    const loader = getContext("loader");
    const notify = getContext("notify");
    let products = $state([]);
    let displayProducts = $state([]);
    let tags = $state();

    const createTags = (products)=>{
        const tags = new Set();
        for(let i = 0; i < products.length; i++){
            for(let j = 0; j < products[i].tags.length; j++){
                tags.add(products[i].tags[j].toLowerCase());
            }
        }
        return [...tags];
    }

    const tagSearch = (tag)=>{
        if(tag === "all"){
            displayProducts = [...products];
            return;
        }

        displayProducts = [];
        for(let i = 0; i < products.length; i++){
            if(products[i].tags.includes(tag)) displayProducts.push(products[i]);
        }
    }

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
                    displayProducts = response;
                    tags = createTags(response);
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
    <div class="tags">
        <button
            onclick={()=>{tagSearch("all")}}
            class="button"
        >ALL</button>
        {#each tags as tag}
            <button
                onclick={()=>{tagSearch(tag)}}
                class="button"
            >{tag.toUpperCase()}</button>
        {/each}
    </div>
    {#each displayProducts as product}
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
