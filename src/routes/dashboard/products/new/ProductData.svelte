<script>
    import {onMount} from "svelte";
    import UploadImages from "$lib/UploadImages.svelte";

    let {finish} = $props();
    let initialFocus = $state();
    let name = $state("");
    let tags = $state([""]);
    let images = $state([]);
    let description = $state("");
    let multipleVariations = $state(false);

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

    const submit = ()=>{
        let data = {
            name: name,
            tags: tags.filter(t => t !== ""),
            images: images,
            description: description,
            active: true
        };
        finish(data, multipleVariations);
    }

    onMount(()=>{
        initialFocus.focus();
    });
</script>

<form class="ProductData standardForm" onsubmit={submit}>
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

    <label>This product has multiple variations/prices:
        <label class="switch">
            <input
                type="checkbox"
                bind:checked={multipleVariations}
            >
            <span class="slider"></span>
        </label>
    </label>

    <UploadImages
        addImage={(img)=>{images.push(img)}}
        removeImage={(i)=>{images.splice(i, 1)}}
    />

    <div class="buttonBox">
        <a
            href="/dashboard/products"
            class="button"
        >Cancel</a>

        <button class="button">Next</button>
    </div>
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

    .buttonBox{
        display: flex;
        justify-content: flex-end;
        width: 100%;
        margin-top: 75px;
    }

    .buttonBox > *{
        margin: 0 35px;
    }

    .switch{
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
        margin-top: 15px;
    }

    .switch input{
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider{
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: red;
        transition: 0.4s;
        border-radius: 34px;
    }

    .slider:before{
        position: absolute;
        left: 4px;
        bottom: 4px;
        content: "";
        height: 26px;
        width: 26px;
        background-color: black;
        transition: 0.4s;
        border-radius: 50%;
    }

    input:checked + .slider{
        background-color: green;
    }

    input:checked + .slider:before{
        transform: translateX(26px);
    }

    @media screen and (max-width: 550px){
        .buttonBox{
            justify-content: space-around;
        }

        .buttonBox > *{
            margin: 0;
        }
    }
</style>
