<script>
    import {createEventDispatcher} from "svelte";
    import Loader from "../../../components/Loader.svelte";

    import Name from "./productProperties/Name.svelte";
    import Description from "./productProperties/Description.svelte";
    import Price from "./productProperties/Price.svelte";
    import Quantity from "./productProperties/Quantity.svelte";
    import Images from "./productProperties/Images.svelte";
    import Tags from "./productProperties/Tags.svelte";

    const dispatch = createEventDispatcher();
    let {productId} = $props();
    let product = $state({});
    let loader = $state(false);
    let deleteModal = $state(false);

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

    const deleteProduct = ()=>{
        deleteModal = true;
    }

    const submitDelete = ()=>{
        loader = true;
        fetch(`${import.meta.env.VITE_API_URL}/product/${productId}`, {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("vendorToken")}`
            }
        })
            .then(r=>r.json())
            .then((response)=>{
                if(response.error){
                    dispatch("notify", {type: "error", message: response.message});
                }else{
                    dispatch("removeProduct", {product: productId});
                }
            })
            .catch((err)=>{
                console.log(err);
                dispatch("notify", {
                    type: "error",
                    message: "Something went wrong, try refreshing the page"
                });
            })
            .finally(()=>{
                loader = false;
            });
    }

    const updateLoader = (event)=>{
        loader = event.detail.on;
    }

    const updateProduct = (event)=>{
        product = event.detail.product;
        if(event.detail.update){
            dispatch("update", {
                id: productId,
                type: event.detail.update,
                data: event.detail.data
            });
        }
    }
</script>

{#if deleteModal}
    <div class="deleteModal">
        <h2>Are you sure that you want to delete this product?</h2>
        <h3>This is irreversible</h3>

        <div class="deleteButtons">
            <button class="button modalDelete" onclick={submitDelete}>Delete</button>
            <button class="button modalCancel" onclick={()=>{deleteModal = false}}>Cancel</button>
        </div>
    </div>
{/if}

<div class="SingleProduct">
    {#if loader}
        <Loader/>
    {/if}

    <div class="actionables">
        <button
            class="finished button"
            onclick={()=>{dispatch("close")}}
        >Finished</button>

        <button
            class="delete button"
            onclick={deleteProduct}
        >Delete</button>
    </div>

    <Name
        name={product.name}
        productId={product.id}
        on:updateProduct={updateProduct}
        on:loader={updateLoader}
        on:notify
    />

    <Tags
        tags={product.tags}
        productId={product.id}
        on:updateProduct={updateProduct}
        on:loader={updateLoader}
        on:notify
    />

    <Description
        description={product.description}
        productId={product.id}
        on:updateProduct={updateProduct}
        on:loader={updateLoader}
        on:notify
    />

    <Price
        price={product.price}
        productId={product.id}
        on:updateProduct={updateProduct}
        on:loader={updateLoader}
        on:notify
    />

    <Quantity
        quantity={product.quantity}
        productId={product.id}
        on:updateProduct={updateProduct}
        on:loader={updateLoader}
        on:notify
    />

    <Images
        images={product.images}
        productId={product.id}
        on:updateProduct={updateProduct}
        on:loader={updateLoader}
        on:notify
    />
</div>

<style>
    .SingleProduct{
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        background: rgb(0, 0, 25);
    }

    .actionables{
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 35px;
        right: 35px;
    }

    .delete{
        margin-top: 10px;
        background: rgb(175, 0, 0);
        color: var(--text);
    }

    .deleteModal{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        position: fixed;
        top: calc(50% - 125px);
        left: calc(50% - 175px);
        height: 350px;
        width: 450px;
        z-index: 5;
        background: var(--text);
        padding: 15px;
        box-shadow: 0 0 5px white;
        text-align: center;
    }

    .deleteButtons{
        display: flex;
        flex-direction: column;
        width: 50%;
    }

    .modalDelete{
        background: rgb(175, 0, 0);
        color: var(--text);
        margin-bottom: 10px;
        width: 100%;
    }

    .modalCancel{
        width: 100%;
    }

    @media screen and (max-width: 850px){
        .actionables{
            flex-direction: row;
            align-items: center;
            top: 15px;
            left: 15px;
            right: initial;
        } 

        .delete{
            margin: 0 0 0 5px;
        }
    }
</style>
