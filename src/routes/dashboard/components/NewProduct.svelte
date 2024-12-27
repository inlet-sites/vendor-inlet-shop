<script>
    import Loader from "../../../components/Loader.svelte";
    import BasicData from "./newProduct/BasicData.svelte";
    import Variation from "./newProduct/Variation.svelte";
    import AddImages from "./newProduct/AddImages.svelte";

    let currentStep = $state("basicData");
    let product = $state();
    let variations = $state([]);
    let multipleVariations = $state(false);
    let variationStage = $state(0);
    let onlineSales = $state(false);
    if(localStorage.getItem("onlineSales") === "true") onlineSales = true;

    const next = (event)=>{
        switch(currentStep){
            case "basicData":
                product = event.detail.product;
                multipleVariations = event.detail.variations;
                if(!multipleVariations) variations[0].descriptor = event.detail.product.name;
                currentStep = "images";
                break;
            case "images":
                product.images = event.detail.images;
                currentStep = "variations";
                break;
            case "variations":
                finish();
                break;
        }
    }

    const addVariation = (event)=>{
        variations.push(event.detail.variation);
    }

    const finish = ()=>{
        console.log(product);
        console.log(variations);
        console.log("finished and creating product");
    }
</script>

<div class="NewProduct">
    {#if currentStep === "basicData"}
        <BasicData
            on:next={next}
            on:cancel
        />
    {:else if currentStep === "images"}
        <AddImages
            on:next={next}
            on:cancel
        />
    {:else if currentStep === "variations"}
        <Variation
            multiple={multipleVariations}    
            onlineSales={onlineSales}
            productName={product.name}
            on:cancel
            on:addVariation={addVariation}
            on:next={next}
        />
    {/if}
</div>

<style>
    .NewProduct{
        padding: 0 35px;
    }

    @media screen and (max-width: 500px){
        .NewProduct{
            padding: 0 5px;
        }
    }
</style>
