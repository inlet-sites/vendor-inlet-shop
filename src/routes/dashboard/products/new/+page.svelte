<script>
    import ProductData from "./ProductData.svelte";
    import Variation from "./Variation.svelte";

    let stage = $state("productData");
    let newProduct = $state();
    let multipleVariations = $state(false);

    const addProduct = (p, mv)=>{
        newProduct = p;
        multipleVariations = mv;
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
        <Variation/>
    {/if}
</div>
