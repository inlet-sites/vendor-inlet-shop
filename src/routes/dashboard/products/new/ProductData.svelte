<script>
    import {onMount} from "svelte";
    import UploadImages from "$lib/UploadImages.svelte";

    let {nextStage} = $props();
    let initialFocus = $state();
    let name = $state("");
    let tags = $state([""]);
    let images = $state([]);
    let description = $state("");

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

    <UploadImages
        addImage={(img)=>{images.push(img)}}
        removeImage={(i)=>{images.splice(i, 1)}}
    />
</form>

<style>
    .ProductData{
        display: flex;
        flex-direction: column;
        color: white;
        width: 100%;
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
