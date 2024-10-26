<script>
    import {createEventDispatcher} from "svelte";
    import Loader from "../../../components/Loader.svelte";

    import Name from "./productProperties/Name.svelte";

    const dispatch = createEventDispatcher();
    let {productId} = $props();
    let product = $state({});
    let loader = $state(false);

    loader = true;
    fetch(`${import.meta.env.VITE_API_URL}/product/${productId}`, {
        method: "get",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(r=>r.json())
        .then((response)=>{
            if(response.error){
                dispatch("notify", {
                    type: "error",
                    message: response.message
                });
            }else{
                product = response;
            }
        })
        .catch((err)=>{
            dispatch("notify", {
                type: "error",
                message: "Something went wrong, try refreshing the page"
            });
        })
        .finally(()=>{
            loader = false;
        });

    const updateLoader = (event)=>{
        loader = event.detail.on;
    }
</script>

<div class="container">
    {#if loader}
        <Loader/>
    {/if}

    <button
        class="finished button"
        onclick={()=>{dispatch("close")}}
    >Finished</button>

    <Name
        name={product.name}
        productId={product.id}
        on:loader={updateLoader}
        on:notify
    />
</div>

<style>
    .container{
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        background: rgb(0, 0, 25);
    }

    .finished{
        position: absolute;
        top: 35px;
        right: 35px;
    }
</style>
