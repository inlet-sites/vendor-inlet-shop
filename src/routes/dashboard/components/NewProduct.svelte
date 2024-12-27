<script>
    import {createEventDispatcher} from "svelte";
    import Loader from "../../../components/Loader.svelte";
    import BasicData from "./newProduct/BasicData.svelte";
    import Variation from "./newProduct/Variation.svelte";
    import AddImages from "./newProduct/AddImages.svelte";

    const dispatch = createEventDispatcher();
    let currentStep = $state("basicData");
    let product = $state();
    let variations = $state([]);
    let multipleVariations = $state(false);
    let variationStage = $state(0);
    let onlineSales = $state(false);
    let loader = $state(false);
    if(localStorage.getItem("onlineSales") === "true") onlineSales = true;

    const next = (event)=>{
        switch(currentStep){
            case "basicData":
                product = event.detail.product;
                multipleVariations = event.detail.variations;
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

    const finish = async ()=>{
        loader = true;

        const productFormData = new FormData();
        productFormData.append("name", product.name);
        productFormData.append("tags", JSON.stringify(product.tags));
        productFormData.append("description", product.description);
        productFormData.append("active", true);
        for(let i = 0; i < product.images.length; i++){
            productFormData.append("images", product.images[i]);
        }
        const vendorToken = localStorage.getItem("vendorToken");

        const productResponse = await fetch(`${import.meta.env.VITE_API_URL}/product`, {
            method: "post",
            headers: {
                Authorization: `Bearer ${vendorToken}`
            },
            body: productFormData
        });
        const newProduct = await productResponse.json();

        const variationPromises = [];
        for(let i = 0; i < variations.length; i++){
            const variationFormData = new FormData();
            variationFormData.append("product", newProduct.id);
            variationFormData.append("descriptor", variations[i].descriptor);
            variationFormData.append("price", variations[i].price * 100);
            variationFormData.append("quantity", variations[i].quantity);
            variationFormData.append("shipping", variations[i].shipping * 100);
            variationFormData.append("purchaseOption", variations[i].purchaseOption);
            for(let j = 0; j < variations[i].images.length; j++){
                variationFormData.append("images", variations[i].images[j]);
            }
            variationPromises.push(fetch(`${import.meta.env.VITE_API_URL}/variation`, {
                method: "post",
                headers: {
                    Authorization: `Bearer ${vendorToken}`
                },
                body: variationFormData
            }))
        }

        const response = await Promise.all(variationPromises);
        for(let i = 0; i < response.length; i++){
            newProduct.variations.push(await response[i].json());
        }
        loader = false;
        dispatch("addProduct", {
            product: newProduct
        });
        dispatch("cancel");
    }
</script>

<div class="NewProduct">
    {#if loader}
        <Loader/>
    {/if}

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
