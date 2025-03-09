<script>
    import {createEventDispatcher} from "svelte";
    import Loader from "../../../components/Loader.svelte";
    import Notifier from "../../../components/Notifier.svelte";
    import BasicData from "./newProduct/BasicData.svelte";
    import Variation from "./newProduct/Variation.svelte";
    import AddImages from "./newProduct/AddImages.svelte";

    const dispatch = createEventDispatcher();
    let onlineSales = $props();
    let currentStep = $state("basicData");
    let product = $state();
    let variations = $state([]);
    let multipleVariations = $state(false);
    let loader = $state(false);
    let notifier = $state(null);

    const notify = (type, message)=>{
        notifier = {
            type: type,
            message: message
        };

        setTimeout(()=>{
            notifier = null;
        }, 7500);
    }

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
        try{
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
            if(newProduct.error) throw newProduct.error;

            const variationPromises = [];
            for(let i = 0; i < variations.length; i++){
                const variationFormData = new FormData();
                variationFormData.append("product", newProduct.id);
                variationFormData.append("descriptor", variations[i].descriptor);
                variationFormData.append("price", Math.floor(variations[i].price * 100));
                variationFormData.append("quantity", variations[i].quantity);
                variationFormData.append("shipping", Math.floor(variations[i].shipping * 100));
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
                const variation = await response[i].json();
                if(variation.error) throw variation.error;
                newProduct.variations.push(variation);
            }
            loader = false;
            dispatch("addProduct", {
                product: newProduct
            });
            dispatch("cancel");
        }catch(e){
            notify("error", e.message);
            loader = false;
        }
    }
</script>

<div class="NewProduct">
    {#if loader}
        <Loader/>
    {/if}

    {#if notifier}
        <Notifier type={notifier.type} message={notifier.message}/>
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
