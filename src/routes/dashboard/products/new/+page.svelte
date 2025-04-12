<script>
    import ProductData from "./ProductData.svelte";

    let stage = $state("productData");
    let newProduct = $state();
    $inspect(newProduct);

    const addProduct = (p)=>{
        newProduct = p;
        stage = "variation";
    }
</script>

<svelte:head>
    <title>Create Product | Vendor.Inlet.Shop</title>
</svelte:head>

<div class="NewProduct">
    {#if stage === "productData"}
        <ProductData
            finish={addProduct}
        />
    {:else if stage === "variation"}
        <h1>Variation</h1>
    {/if}
</div>
