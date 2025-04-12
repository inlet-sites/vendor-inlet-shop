<script>
    import ProductData from "./ProductData.svelte";

    let stage = $state("productData");
    let newProduct = $state();

    const nextStage = (nextStage)=>{
        stage = nextStage;
    }
</script>

<svelte:head>
    <title>Create Product | Vendor.Inlet.Shop</title>
</svelte:head>

<div class="NewProduct">
    {#if stage === "productData"}
        <ProductData
            nextStage={nextStage}
        />
    {/if}
</div>
