<script>
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();
    let {tags, productId} = $props();
    let edit = $state(false);
    let inputTags = $state("");

    const updateTags = ()=>{
        dispatch("loader", {on: true});
        let submitTags = tags;
        if(typeof(tags) === "string"){
            submitTags = tags.split(",");
        }
        if(submitTags[submitTags.length-1] === "") submitTags.splice(submitTags.length-1, 1);
        fetch(`${import.meta.env.VITE_API_URL}/product/${productId}`, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("vendorToken")}`
            },
            body: JSON.stringify({tags: submitTags})
        })
            .then(r=>r.json())
            .then((response)=>{
                if(response.error){
                    dispatch("notify", {
                        type: "error",
                        message: response.message
                    });
                }else{
                    dispatch("updateProduct", {product: response, update: "tags", data: response.tags});
                    dispatch("notify", {
                        type: "success",
                        message: "Product tags updated"
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
                edit = false;
            });
    }
</script>

<div class="Tags">
    <div class="title">
        <h2>Tags</h2>
        {#if edit}
            <button onclick={updateTags} aria-label="submit">
                <svg width="35px" height="35px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="#000000">
                    <path d="M5 13L9 17L19 7" stroke="#ff0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </button>
        {:else}
            <button onclick={()=>{edit = true}} aria-label="edit">
                <svg width="24px" height="24px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" color="#000000">
                    <path d="M14.3632 5.65156L15.8431 4.17157C16.6242 3.39052 17.8905 3.39052 18.6716 4.17157L20.0858 5.58579C20.8668 6.36683 20.8668 7.63316 20.0858 8.41421L18.6058 9.8942M14.3632 5.65156L4.74749 15.2672C4.41542 15.5993 4.21079 16.0376 4.16947 16.5054L3.92738 19.2459C3.87261 19.8659 4.39148 20.3848 5.0115 20.33L7.75191 20.0879C8.21972 20.0466 8.65806 19.8419 8.99013 19.5099L18.6058 9.8942M14.3632 5.65156L18.6058 9.8942" stroke="#e1e1e1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </button>
        {/if}
    </div>

    {#if edit}
        <input
            type="text"
            bind:value={tags}
            onchange={updateTags}
        >
    {:else}
        <div class="tags">
            {#each tags as tag}
                <p class="tag">{tag}</p>
            {/each}
        </div>
    {/if}
</div>

<style>
    .Tags{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        color: var(--text);
        padding: 35px;
    }

    .title{
        display: flex;
        margin-bottom: 15px;
    }

    .tags{
        display: flex;
    }

    .tag{
        border: 1px solid red;
        padding: 2px;
        margin: 2px;
        border-radius: 5px;
        font-size: 18px;
    }

    button{
        background: none;
        border: none;
        margin-left: 15px;
        cursor: pointer;
    }

    input{
        font-size: 28px;
        padding-left: 10px;
    }
</style>
