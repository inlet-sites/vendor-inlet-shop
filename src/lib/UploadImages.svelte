<script>
    let {addImage, removeImage} = $props();
    let inputImages = $state();
    let imageUrls = $state([]);
    let inputElem = $state();

    const addImages = ()=>{
        for(let i = 0; i < inputImages.length; i++){
            addImage(inputImages[i]);
            imageUrls.push(URL.createObjectURL(inputImages[i]));
        }
    }

    const triggerFileInput = ()=>{
        inputElem.click();
    }

    const rmImage = (i)=>{
        removeImage(i);
        imageUrls.splice(i, 1);
    }
</script>

<div class="UploadImages">
    <input
        type="file"
        bind:files={inputImages}
        bind:this={inputElem}
        onchange={addImages}
        accept="image/*"
        multiple
    >

    <button
        type="button"
        class="button"
        onclick={triggerFileInput}
    >Add Images</button>

    <div class="images">
        {#each imageUrls as image, i}
            <div class="image">
                <img src={image} alt="Uploaded Image">
                <button
                    class="remove"
                    type="button"
                    onclick={()=>(rmImage(i))}
                    aria-label="Remove"
                >
                    <svg width="32px" height="32px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="currentColor">
                        <path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                </button>
            </div>
        {/each}
    </div>
</div>

<style>
    input{
        display: none;
    }

    .images{
        display: flex;
        flex-wrap: wrap;
        width: 100%;
    }

    .image{
        height: 150px;
        width: 200px;
        position: relative;
    }

    .image img{
        max-height: 100%;
        max-width: 100%;
    }

    .remove{
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 5px;
        right: 5px;
        color: red;
        background: rgba(0, 0, 0, 0.70);
        border: none;
        border-radius: 50%;
        cursor: pointer;
    }
</style>
