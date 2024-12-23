<script>
    import Loader from "../../../components/Loader.svelte";
    import BasicData from "./newProduct/BasicData.svelte";
    import Variation from "./newProduct/Variation.svelte";

    let currentStep = $state("variations");
    let product = $state();
    let variations = $state([]);
    let multipleVariations = $state(false);
    let variationStage = $state(0);

    const next = (event)=>{
        switch(event.detail.step){
            case "variations":
                if(variations.length === 0){
                    product = event.detail.product;
                    multipleVariations = event.detail.variations;
                }
                break;
        }
        currentStep = event.detail.step;
    }

    const back = ()=>{
        switch(currentStep){
            case "variations":
                if(variationStage = 0) currentStep = "basicData"; break;
        }
    }
</script>

<div class="NewProduct">
    {#if currentStep === "basicData"}
        <BasicData
            on:cancel
            on:next={next}/>
    {:else if currentStep === "variations"}
        <Variation
            on:back={back}
            multiple={multipleVariations}    
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
