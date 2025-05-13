<script>
    import {getContext} from "svelte";

    const loader = getContext("loader");
    const notify = getContext("notify");
    let {images, name, addUrl, removeUrl, update} = $props();
    let imageInput = $state();
    let newImages = $state();

    const imageSource = (i)=>{
        const thing = `${import.meta.env.VITE_API_URL}/document/${i}`;
        return thing;
    }

    const upload = ()=>{
        loader(true);

        let formData = new FormData();
        formData.append("url", addUrl);
        for(let i = 0; i < newImages.length; i++){
            formData.append("images", newImages[i]);
        }

        fetch("/api/product/image", {
            method: "PUT",
            body: formData
        })
            .then(r=>r.json())
            .then((response)=>{
                if(response.error){
                    notify("error", response.error.message);
                }else{
                    update(response);
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
        const thing = JSON.stringify({
            images: [images[i]],
            url: removeUrl
        });
        fetch("/api/product/image", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                images: [images[i]],
                url: removeUrl
            })
        })
            .then(r=>r.json())
            .then((response)=>{
                if(response.error){
                    notify("error", response.error.message);
                }else{
                    update(response);
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
                <img
                    src={imageSource(image)}
                    alt={name}
                    loading="lazy"
                >
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
