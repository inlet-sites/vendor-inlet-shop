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
        switch(currentStep){
            case "basicData":
                product = event.detail.product;
                multipleVariations = event.detail.variations;
                break;
            case "variations":
                if(multipleVariations && event.detail.another){
                    variations.push(event.detail.variation);
                    variationStage++;
                }else{
                    currentStep = "images";
                }
                break;
            case "images":
                finish();
                break;
        }
    }

    const back = ()=>{
        switch(currentStep){
            case "basicData":
                dispatch("cancel");
                break;
            case "variations":
                if(variationStage === 0) currentStep = "basicData";
                if(variationStage > 0) variationStage--;
                break;
            case "images":
                variationStage = variations.length - 1;
                break;
        }
    }

    const finish = ()=>{
        console.log("finished and creating product");
    }
</script>

<div class="NewProduct">
    {#if currentStep === "basicData"}
        <BasicData
            on:back={back}
            on:next={next}/>
    {:else if currentStep === "variations"}
        <Variation
            variation={variations[variationStage]}
            multiple={multipleVariations}    
            on:back={back}
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
