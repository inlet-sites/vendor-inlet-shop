<script>
    import {getContext, tick} from "svelte";

    const loader = getContext("loader");
    const notify = getContext("notify");
    let {tags, productId, updateProduct} = $props();
    let edit = $state(false);

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

    const submitTags = ()=>{
        let newTags = [];
        for(let i = 0; i < tags.length; i++){
            if(tags[i] === "") continue;
            newTags.push(tags[i]);
        }

        return newTags;
    }

    const editOn = ()=>{
        edit = true;
        tags.push("");
    }

    const submit = ()=>{
        loader(true);
        fetch("/api/product", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                tags: submitTags(),
                productId: productId
            })
        })
            .then(r=>r.json())
            .then((response)=>{
                if(response.error){
                    notify("error", response.error.message);
                }else{
                    updateProduct(response);
                    notify("Success", "Tags updated");
                    edit = false;
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

<div class="Tags">
    <div class="title">
        <h3>Tags</h3>

        {#if edit}
            <button onclick={submit} aria-label="Submit">
                <svg width="32px" height="32px" stroke-width="2" viewBox="0 0 24 24" fill="none" color="currentColor">
                    <path d="M5 13L9 17L19 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </button>
        {:else}
            <button onclick={editOn} aria-label="Edit">
                <svg width="28px" height="28px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" color="#currentColor">
                    <path d="M14.3632 5.65156L15.8431 4.17157C16.6242 3.39052 17.8905 3.39052 18.6716 4.17157L20.0858 5.58579C20.8668 6.36683 20.8668 7.63316 20.0858 8.41421L18.6058 9.8942M14.3632 5.65156L4.74749 15.2672C4.41542 15.5993 4.21079 16.0376 4.16947 16.5054L3.92738 19.2459C3.87261 19.8659 4.39148 20.3848 5.0115 20.33L7.75191 20.0879C8.21972 20.0466 8.65806 19.8419 8.99013 19.5099L18.6058 9.8942M14.3632 5.65156L18.6058 9.8942" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </button>
        {/if}
    </div>

    {#if edit}
        <form class="tagInputs" onsubmit={submit}>
            {#each tags as tag, i}
                <input
                    type="text"
                    bind:value={tags[i]}
                    oninput={checkTags}
                >
            {/each}
        </form>
    {:else}
        <div class="tagsList">
            {#each tags as tag}
                <p>{tag}</p>
            {/each}
        </div>
    {/if}
</div>

<style>
    .Tags{
        color: white;
        margin-top: 35px;
    }

    .title{
        display: flex;
        text-decoration: underline;
    }

    button{
        background: none;
        border: none;
        color: red;
        cursor: pointer;
        margin-left: 25px;
    }

    .tagInputs{
        display: flex;
        flex-direction: column;
        max-width: 200px;
    }

    input{
        font-size: 28px;
        margin: 5px 0;
    }

    .tagsList{
        display: flex;
        flex-wrap: wrap;
    }

    .tagsList > *{
        margin: 0 10px;
        padding: 5px 10px;
        border: 1px solid rgba(255, 0, 0, 0.35);
        border-radius: 10px;
    }
</style>
