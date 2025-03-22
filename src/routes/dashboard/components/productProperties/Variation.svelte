<script>
    import {createEventDispatcher} from "svelte";
    import Images from "./Images.svelte";
    import Variation from "../newProduct/Variation.svelte";
    import VariationQuantity from "../productProperties/VariationQuantity.svelte";
    import VariationPurchaseOption from "../productProperties/VariationPurchaseOption.svelte";

    const dispatch = createEventDispatcher();
    let {variations, productId, productName, onlineSales} = $props();
    let variationIndex = $state(0);
    let confirmDelete = $state(false);
    let newVariation = $state(false);

    const loader = (on)=>{
        dispatch("loader", {on: on});
    }

    const notify = (type, message)=>{
        dispatch("notify", {
            type: type,
            message: message
        });
    }

    const updateVariation = (event)=>{
        dispatch("updateVariation", {
            variation: event.detail.variation,
            index: variationIndex
        });
    }

    const deletePrice = ()=>{
        dispatch("loader", {on: true});
        fetch(`${import.meta.env.VITE_API_URL}/product/${productId}/variation/${variations[variationIndex].id}`, {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("vendorToken")}`
            }
        })
            .then(r=>r.json())
            .then((response)=>{
                if(response.error){
                    dispatch("notify", {
                        type: "error",
                        message: response.error.message
                    });
                }else{
                    variationIndex = 0;
                    dispatch("updateVariation", {
                        type: "delete",
                        index: variationIndex
                    });
                    dispatch("notify", {
                        type: "success",
                        message: "Price removed"
                    });
                }
            })
            .catch((err)=>{
                dispatch("notify", {
                    type: "error",
                    message: "Something went wrong, try refreshing the page"
                });
            })
            .finally(()=>{
                dispatch("loader", {on: false});
                confirmDelete = false;
            });
    }

    const addVariation = (event)=>{
        dispatch("loader", {on: true});

        const formData = new FormData();
        formData.append("product", productId);
        formData.append("descriptor", event.detail.variation.descriptor);
        formData.append("price", event.detail.variation.price * 100);
        formData.append("quantity", event.detail.variation.quantity);
        formData.append("shipping", event.detail.variation.shipping * 100);
        formData.append("purchaseOption", event.detail.variation.purchaseOption);
        for(let i = 0; i < event.detail.variation.images.length; i++){
            formData.append("images", event.detail.variation.images[i]);
        }

        fetch(`${import.meta.env.VITE_API_URL}/variation`, {
            method: "post",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("vendorToken")}`
            },
            body: formData
        })
            .then(r=>r.json())
            .then((response)=>{
                if(response.error){
                    dispatch("notify", {
                        type: "error",
                        message: response.error.message
                    });
                }else{
                    dispatch("updateVariation", {
                        type: "newVariation",
                        variation: response
                    });
                    dispatch("notify", {
                        type: "success",
                        message: "New price created"
                    });
                    newVariation = false;
                }
            })
            .catch((err)=>{
                dispatch("notify", {
                    type: "error",
                    message: "Something went wrong, try refreshing the page"
                });
            })
            .finally(()=>{
                dispatch("loader", {on: false});
            });
    }
</script>

{#if variations}
<div class="Variation">
    {#if confirmDelete}
        <div class="deleteModal">
            <div class="modalInner">
                <p>Are you sure that you want to delete price "{variations[variationIndex].descriptor}?"</p>
                <button
                    class="cancel"
                    onclick={()=>{confirmDelete = false}}
                >Cancel</button>
                <button
                    class="delete"
                    onclick={deletePrice}
                >Delete</button>
            </div>
        </div>
    {/if}

    {#if newVariation}
        <div class="newVariation">
            <Variation
                multiple={false}
                onlineSales={onlineSales}
                productName={productName}
                existing={true}
                on:addVariation={addVariation}
                on:cancel={()=>{newVariation = false}}
            />
        </div>
    {/if}

    <div class="divider"></div>

    <div class="title">
        <h1>Prices</h1>
        <button
            class="button"
            onclick={()=>{newVariation = true}}
        >New Price</button>
    </div>

    {#if variations.length > 1}
        <select
            bind:value={variationIndex}
        >
            {#each variations as variation, idx}
                <option value={idx}>{variation.descriptor}</option>
            {/each}
        </select>

        <button
            class="delete"
            onclick={()=>{confirmDelete = true}}
        >Delete Price</button>
    {/if}

    <div class="variationData">
        <h2>Price</h2>
        <p>${(variations[variationIndex].price / 100).toFixed(2)}</p>
    </div>

    <div class="variationData">
        <h2>Shipping Cost</h2>
        <p>${(variations[variationIndex].shipping / 100).toFixed(2)}</p>
    </div>

    <VariationQuantity
        quantity={variations[variationIndex].quantity}
        productId={productId}
        variationId={variations[variationIndex].id}
        on:updateVariation={updateVariation}
        on:loader
        on:notify
    />

    {#if onlineSales}
        <VariationPurchaseOption
            purchaseOption={variations[variationIndex].purchaseOption}
            productId={productId}
            variationId={variations[variationIndex].id}
            on:updateVariation={updateVariation}
            on:loader
            on:notify
        />
    {/if}

    <Images
        images={variations[variationIndex].images}
        productId={productId}
        variation={variations[variationIndex].id}
        on:updateVariation={updateVariation}
        on:loader
        on:notify
    />
</div>
{/if}


<style>
    .divider{
        border-bottom: 2px solid var(--text);
    }

    select{
        background: none;
        border: 1px solid var(--text);
        color: var(--text);
        font-size: 24px;
        margin: 35px 0 0 35px;
        padding: 5px 15px;
        cursor: pointer;
        font-weight: bold;
    }

    .variationData{
        padding: 35px;
    }

    .variationData h2{
        margin-bottom: 5px;
    }

    .delete{
        background: red;
        border: 2px outset black;
        color: var(--text);
        padding: 5px 15px;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
    }

    .delete:active{
        border: 2px inset black;
    }

    .deleteModal{
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        backdrop-filter: blur(3px);
        z-index: 5;
    }

    .modalInner{
        display: flex;
        flex-direction: column;
        width: 250px;
        background: var(--text);
        color: black;
        padding: 15px;
    }

    .modalInner p{
        font-size: 18px;
        text-align: center;
    }

    .modalInner button{
        margin: 5px;
    }

    .modalInner .cancel{
        background: none;
        border: 1px solid black;
        padding: 5px 15px;
        margin-top: 35px;
        font-size: 18px;
        cursor: pointer;
    }

    .newVariation{
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        backdrop-filter: blur(3px);
        background: rgba(0, 0, 25, 0.8);
        z-index: 5;
    }

    .title{
        display: flex;
        margin-top: 15px;
    }

    .title button{
        margin-left: 15px;
        font-size: 14px;
    }
</style>
