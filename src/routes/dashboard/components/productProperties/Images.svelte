<script>
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();
    let {images, productId} = $props();
    let files = $state(null);

    const removeImage = (image)=>{
        dispatch("loader", {on: true});
        fetch(`${import.meta.env.VITE_API_URL}/product/${productId}/images/remove`, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("vendorToken")}`
            },
            body: JSON.stringify({images: [image]})
        })
            .then(r=>r.json())
            .then((response)=>{
                if(response.error){
                    dispatch("notify", {
                        type: "error",
                        message: response.message
                    });
                }else{
                    dispatch("updateProduct", {product: response, update: "images", data: response.images});
                    dispatch("notify", {
                        type: "success",
                        message: "Image removed"
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
                let idx = images.indexOf(image);
                images.splice(idx, 1);
            });
    }

    const addImages = ()=>{
        dispatch("loader", {on: true});
        const formData = new FormData();
        for(let i = 0; i < files.length; i++){
            formData.append("images", files[i]);
        }

        fetch(`${import.meta.env.VITE_API_URL}/product/${productId}/images/add`, {
            method: "put",
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
                        message: response.message
                    });
                }else{
                    dispatch("updateProduct", {product: response});
                    dispatch("notify", {
                        type: "success",
                        message: "New photos added"
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
            });
    }
</script>

<div class="Images">
    <div class="title">
        <h2>Images</h2>

        <label class="addImage">
            Add
            <input
                type="file"
                bind:files
                onchange={addImages}
                style="display:none"
                multiple
            />
        </label>
    </div>

    <div class="imageContainer">
        {#each images as image}
            <div class="image">
                <img src="{import.meta.env.VITE_API_URL}/document/{image}" alt="product">
                <button
                    class="removeButton"
                    onclick={()=>{removeImage(image)}}
                    aria-label="delete"
                >
                    <svg width="24px" height="24px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" color="#000000">
                        <path d="M20 9L18.005 20.3463C17.8369 21.3026 17.0062 22 16.0353 22H7.96474C6.99379 22 6.1631 21.3026 5.99496 20.3463L4 9" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M21 6L15.375 6M3 6L8.625 6M8.625 6V4C8.625 2.89543 9.52043 2 10.625 2H13.375C14.4796 2 15.375 2.89543 15.375 4V6M8.625 6L15.375 6" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                </button>
            </div>
        {/each}
    </div>
</div>

<style>
    .Images{
        color: white;
    }

    .title{
        position: relative;
        border-bottom: 2px solid white;
        padding: 5px;
    }

    .addImage{
        background: white;
        border: 1px outset white;
        color: black;
        font-size: 18px;
        position: absolute;
        top: 0;
        left: 55%;
        padding: 5px 10px;
        cursor: pointer;
    }

    h2{
        text-align: center;
    }

    .imageContainer{
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        width: 90%;
        margin: 15px auto;
    }

    .image{
        position: relative;
        width: 250px;
        margin: 15px;
    }

    .image img{
        width: 100%;
    }

    .removeButton{
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 5px;
        right: 5px;
        cursor: pointer;
        background: red;
        border: none;
        padding: 2px;
        border-radius: 5px;
    }
</style>
