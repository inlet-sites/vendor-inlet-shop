<script>
    import Loader from "../../../components/Loader.svelte";
    import BasicData from "./newProduct/BasicData.svelte";

    let currentStep = $state("basicData");
    let product = $state();
    let variations = $state([]);
    let multipleVariations = $state(false);

    const next = (event)=>{
        switch(event.detail.step){
            case "variations":
                product = event.detail.product;
                multipleVariations = event.details.variations;
                break;
        }
        currentStep = event.detail.step;
    }
</script>

<div class="NewProduct">
    {#if currentStep === "basicData"}
        <BasicData
            on:cancel
            on:next={next}/>
    {:else if currentStep === "variations"}
        <h1>Variations Step</h1>
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
