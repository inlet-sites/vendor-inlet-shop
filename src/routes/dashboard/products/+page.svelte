<script>
    import {getContext} from "svelte";
    import Product from "./Product.svelte";

    const loader = getContext("loader");
    const notify = getContext("notify");
    const {data} = $props();
    let products = $state(data.products);
    let displayProducts = $state(products);
    let activeTag = $state("all");

    const createTags = (products)=>{
        const tags = new Set();
        for(let i = 0; i < products.length; i++){
            for(let j = 0; j < products[i].tags.length; j++){
                tags.add(products[i].tags[j].toLowerCase());
            }
        }
        return [...tags];
    }
    const tags = createTags(products);

    const tagSearch = (tag)=>{
        activeTag = tag;
        if(tag === "all"){
            displayProducts = [...products];
            return;
        }

        displayProducts = [];
        for(let i = 0; i < products.length; i++){
            if(products[i].tags.includes(tag)) displayProducts.push(products[i]);
        }
    }
</script>

<svelte:head>
    <title>Products | Inlet Shop</title>
</svelte:head>

<div class="container">
    <header>
        <h1>Products</h1>
        <a class="button" href="/dashboard/products/new">Create</a>
    </header>

    <div class="tags">
        <button
            onclick={()=>{tagSearch("all")}}
            class="button"
            class:active={activeTag === "all"}
        >ALL</button>
        {#each tags as tag}
            <button
                onclick={()=>{tagSearch(tag)}}
                class="button"
                class:active={activeTag === tag}
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
    header{
        display: flex;
        justify-content: space-between;
    }

    h1{
        color: white;
    }

    .tags{
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        margin-bottom: 35px;
    }

    .tags button{
        margin: 10px;
        border-radius: 10px;
        font-size: 16px;
    }

    .tags button.active{
        border: 2px inset red;
    }

    @media screen and (max-width: 850px){
        header{
            justify-content: flex-start;
        }

        h1{
            margin-right: 35px;
        }

        .tags button{
            margin: 5px;
        }
    }

    @media screen and (max-width: 500px){
        header{
            flex-direction: column;
            align-items: flex-start;
            margin-bottom: 15px;
        }
    }
</style>
