<script>
    import {onMount} from "svelte";
    import UploadImages from "$lib/UploadImages.svelte";

    let {nextStage} = $props();
    let initialFocus = $state();
    let name = $state("");
    let tags = $state([""]);
    let imageInput = $state();
    let images = $state();
    let imageUrls = $state([]);
    let description = $state("");
    $inspect(images);

    const checkTags = ()=>{
        let empty = [];
        for(let i = 0; i < tags.length; i++){
            if(tags[i] === ""){
                empty.push(i);
            }
        }

        if(empty.length === 0) tags.push("");
        if(empty.length > 1) tags.splice(empty[0], 1);
    }

    const triggerFileInput = ()=>{
        imageInput.click();
    }

    const showFiles = ()=>{
        for(let i = 0; i < images.length; i++){
            imageUrls.push(URL.createObjectURL(images[i]));
        }
    }

    onMount(()=>{
        initialFocus.focus();
    });
</script>

<form class="ProductData standardForm">
    <label>Product Name
        <input
            type="text"
            bind:value={name}
            bind:this={initialFocus}
            placeholder="Product Name"
            required
        >
    </label>

    <label>Tags
        {#each tags as tag, i}
            <input
                class="tag"
                type="text"
                bind:value={tags[i]}
                oninput={checkTags}
            >
        {/each}
    </label>

    <label>Description
        <textarea
            bind:value={description}
            rows="10"
        ></textarea>
    </label>

    <label>
        <input
            class="imageInput"
            type="file"
            bind:files={images}
            bind:this={imageInput}
            onchange={showFiles}
            accept="image/*"
            multiple
            required
        >
        <button
            type="button"
            class="button"
            onclick={triggerFileInput}
        >Add Images</button>
    </label>
</form>

<style>
    .ProductData{
        display: flex;
        flex-direction: column;
        color: white;
        max-width: 750px;
    }

    label{
        display: flex;
        flex-direction: column;
    }

    .tag{
        max-width: 200px;
    }

    .imageInput{
        display: none;
    }
</style>
