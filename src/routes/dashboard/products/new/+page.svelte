<script>
    import {getContext} from "svelte";
    import {goto} from "$app/navigation";
    import ProductData from "./ProductData.svelte";
    import Variation from "./Variation.svelte";

    const loader = getContext("loader");
    const notify = getContext("notify");
    let stage = $state("productData");
    let product = $state();
    let variations = $state([]);
    let multipleVariations = $state(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    const addProduct = (p, mv)=>{
        product = p;
        multipleVariations = mv;
        stage = "variation";
    }

    const addVariation = (v, f)=>{
        variations.push(v);
        if(f) createProduct();
    }

    const createProduct = ()=>{
        loader(true);

        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("tags", product.tags);
        formData.append("description", product.description);
        formData.append("active", product.active);
        for(let i = 0; i < product.images.length; i++){
            formData.append("images", product.images[i]);
        }

        fetch(`${apiUrl}/product`, {
            method: "post",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("vendorToken")}`
            },
            body: formData
        })
            .then(r=>r.json())
            .then((response)=>{
                if(response.error){
                    notify("error", response.error.message);
                }else{
                    const promises = [];
                    for(let i = 0; i < variations.length; i++){
                        const formData = new FormData();
                        formData.append("product", response.id);
                        formData.append("descriptor", variations[i].descriptor);
                        formData.append("price", variations[i].price);
                        formData.append("quantity", variations[i].quantity);
                        formData.append("shipping", variations[i].shipping);
                        formData.append("purchaseOption", variations[i].purchaseOption);
                        for(let j = 0; j < variations[i].images.length; j++){
                            formData.append("images", variations[i].images[j]);
                        }

                        const promise = fetch(`${apiUrl}/variation`, {
                            method: "post",
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("vendorToken")}`
                            },
                            body: formData
                        });
                        promises.push(promise);
                    }

                    return Promise.all(promises);
                }
            })
            .then((response)=>{
                notify("success", "New product created");
                goto("/dashboard/products");
            })
            .catch((err)=>{
                console.log(err);
                notify("error", "Something went wrong, try refreshing the page");
            })
            .finally(()=>{
                loader(false);
            });
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
        <Variation
            multipleVariations={multipleVariations}
            finish={addVariation}
        />
    {/if}
</div>
