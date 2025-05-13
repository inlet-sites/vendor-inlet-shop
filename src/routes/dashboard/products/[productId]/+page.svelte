<script>
    import {getContext} from "svelte";
    import Name from "./components/Name.svelte";
    import Tags from "./components/Tags.svelte";
    import Description from "./components/Description.svelte";
    import Images from "./components/Images.svelte";
    import PurchaseOption from "./components/PurchaseOption.svelte";
    import Quantity from "./components/Quantity.svelte";

    const {data} = $props();
    const notify = getContext("notify");
    const vendor = getContext("vendor");
    let product = $state(data.product);
    let currentPrice = $state(0);
    let price = $state();
    const apiUrl = import.meta.env.VITE_API_URL;
    $effect(()=>{
        if(product) price = product.variations[currentPrice];
    });

    if(product.error) notify("error", product.error.message);

    const updateProduct = (p)=>{product = p}

    const updateVariation = (v)=>{price = v}

    const priceString = (p)=>{
        return `$${(p / 100).toFixed(2)}`
    }
</script>

<svelte:head>
    <title>{product.name} | Inlet.Shop</title>
</svelte:head>

<div class="container">
    {#if product}
        <Name
            name={product.name}
            productId={product.id}
            updateProduct={updateProduct}
        />

        <Tags
            tags={product.tags}
            productId={product.id}
            updateProduct={updateProduct}
        />

        <Description
            description={product.description}
            productId={product.id}
        />

        <Images
            images={product.images}
            name={product.name}
            addUrl="{apiUrl}/product/{product.id}/images/add"
            removeUrl="{apiUrl}/product/{product.id}/images/remove"
            update={updateProduct}
        />

        <div class="divider"></div>

        {#if price}
            <div class="variations">
                {#if product.variations.length > 1}
                    <h1 class="priceTitle">Prices</h1>

                    <select bind:value={currentPrice}>
                        {#each product.variations as price, i}
                            <option value={i}>{price.descriptor}</option>
                        {/each}
                    </select>
                {:else}
                    <h1 class="priceTitle">Price Information</h1>

                    <h1>{product.variations[currentPrice].descriptor}</h1>
                {/if}

                <h2>Price</h2>
                <p class="priceItem">{priceString(product.variations[currentPrice].price)}</p>

                <Quantity
                    quantity={price.quantity}
                    productId={product.id}
                    variationId={price.id}
                    updateVariation={updateVariation}
                />

                {#if product.variations[currentPrice].shipping > 0}
                    <h2>Shipping</h2>
                    <p class="priceItem">{priceString(product.variations[currentPrice].shipping)}</p>
                {/if}

                {#if $vendor?.onlineSales}
                    <PurchaseOption
                        purchaseOption={price.purchaseOption}
                        productId={product.id}
                        variationId={price.id}
                        updateVariation={(v)=>{updateVariation(v, currentPrice)}}
                    />
                {/if}

                <Images
                    images={price.images}
                    name={product.name}
                    addUrl="{apiUrl}/product/{product.id}/variation/{price.id}/images/add"
                    removeUrl="{apiUrl}/product/{product.id}/variation/{price.id}/images/remove"
                    update={(v)=>{updateVariation(v, currentPrice)}}
                />
            </div>
        {/if}
    {/if}
</div>

<style>
    .container{
        color: white;
        width: 100%;
    }

    .divider{
        border-bottom: 1px solid white;
        margin: 25px;
    }

    .priceTitle{
        text-decoration: underline;
        text-align: center;
    }

    select{
        display: flex;
        font-size: 35px;
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        border-bottom: 1px solid rgba(255, 0, 0, 0.35);
        margin: 15px;
    }

    h2{
        text-decoration: underline;
        margin-top: 35px;
    }

    .priceItem{
        font-size: 22px;
    }
</style>
