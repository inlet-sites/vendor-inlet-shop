<script>
    import {onMount, getContext} from "svelte";
    import Name from "./components/Name.svelte";
    import Tags from "./components/Tags.svelte";
    import Description from "./components/Description.svelte";

    let {data} = $props();
    const loader = getContext("loader");
    const notify = getContext("notify");
    let product = $state();
    $inspect(product);

    const updateProduct = (p)=>{
        product = p;
    }

    onMount(()=>{
        loader(true);
        fetch(`${import.meta.env.VITE_API_URL}/product/${data.productId}`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("vendorToken")}`
            }
        })
            .then(r=>r.json())
            .then((response)=>{
                if(response.error){
                    notify("error", response.error.message)
                }else{
                    product = response;
                }
            })
            .catch((err)=>{
                notify("error", "Something went wrong, try refreshing the page");
            })
            .finally(()=>{
                loader(false);
            });
    });
</script>

<div class="container">
    {#if product}
        <Name
            name={product.name}
            productId={product.id}
            updateProduct={updateProduct}
        />

        <Tags
            tags={product.tags}
            productId={product.id}
            updateProduct={updateProduct}
        />

        <Description
            description={product.description}
            productId={product.id}
            updateProduct={updateProduct}
        />
    {/if}
</div>

<style>
    .container{
        color: white;
        width: 100%;
    }
</style>
