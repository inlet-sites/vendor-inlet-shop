<script>
    import {getContext} from "svelte";

    const loader = getContext("loader");
    const notify = getContext("notify");
    let {images, name, productId, updateProduct} = $props();
    const apiUrl = import.meta.env.VITE_API_URL;
    let imageInput = $state();
    let newImages = $state();

    const imageSource = (i)=>{
        return `${apiUrl}/document/${i}`;
    }

    const upload = ()=>{
        loader(true);
    
        let formData = new FormData();
        for(let i = 0; i < newImages.length; i++){
            formData.append("images", newImages[i]);
        }
        fetch(`${apiUrl}/product/${productId}/images/add`, {
            method: "put",
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
                    updateProduct(response);
                    notify("success", "New images added");
                }
            })
            .catch((err)=>{
                notify("error", "Something went wrong, try refreshing the page");
            })
            .finally(()=>{
                loader(false);
            });
    }

    const remove = (i)=>{
        loader(true);
        fetch(`${apiUrl}/product/${productId}/images/remove`, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("vendorToken")}`
            },
            body: JSON.stringify({images: [images[i]]})
        })
            .then(r=>r.json())
            .then((response)=>{
                if(response.error){
                    notify("error", response.error.message);
                }else{
                    images.splice(i, 1);
                    notify("success", "Image removed");
                }
            })
            .catch((err)=>{
                notify("error", "Something went wrong, try refreshing the page");
            })
            .finally(()=>{
                loader(false);
            });
    }
</script>

<div class="Images">
    <div class="title">
        <h3>Images</h3>

        <button onclick={()=>{imageInput.click()}} aria-label="Add images">
            <svg width="32px" height="32px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="currentColor">
                <path d="M6 12H12M18 12H12M12 12V6M12 12V18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
        </button>

        <input
            type="file"
            bind:files={newImages}
            bind:this={imageInput}
            multiple
            style="display:none"
            onchange={upload}
        >
    </div>

    <div class="images">
        {#each images as image, i}
            <div class="image">
                <img src={imageSource(image)} alt={name}>
                <button class="remove" onclick={()=>{remove(i)}} aria-label="Remove">
                    <svg width="32px" height="32px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="currentColor">
                        <path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                </button>
            </div>
        {/each}
    </div>
</div>

<style>
    .Images{
        display: flex;
        flex-direction: column;
    }

    .title{
        display: flex;
        align-items: center;
    }

    .title button{
        margin-left: 35px;
        background: none;
        border: none;
        color: red;
        cursor: pointer;
    }

    h3{
        text-decoration: underline;
    }

    .images{
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        margin-top: 10px;
    }

    .image{
        max-height: 150px;
        max-width: 150px;
        border: 1px solid black;
        position: relative;
    }

    .image img{
        max-height: 100%;
        max-width: 100%;
    }

    .remove{
        display: flex;
        align-items: center;
        position: absolute;
        top: 5px;
        right: 5px;
        background: none;
        border: none;
        color: red;
        cursor: pointer;
        background: rgba(0, 0, 0, 0.7);
        border-radius: 50%;
    }
</style>
