<script>
    import {createEventDispatcher, tick} from "svelte";

    const dispatch = createEventDispatcher();
    let {tags, productId} = $props();
    let edit = $state(false);
    let newTag = $state("");
    let focusInput = $state({});

    const showEdit = async ()=>{
        edit = true;
        await tick();
        focusInput.focus();
    }

    const updateTags = (idx = null)=>{
        dispatch("loader", {on: true});
        let submitTags = tags.slice(0);
        if(idx !== null){
            submitTags.splice(idx, 1);
        }else{
            submitTags.push(newTag);
        }

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
                        message: response.error.message
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
                newTag = "";
            });
    }
</script>

<div class="Tags">
    <div class="title">
        <div class="tooltipContainer">
            <svg width="20px" height="20px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="#000000">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M9 9C9 5.49997 14.5 5.5 14.5 9C14.5 11.5 12 10.9999 12 13.9999" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M12 18.01L12.01 17.9989" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <div class="tooltip">
                <p>Tags are like categories that can be placed on items. Customers can choose to display all items with a specific tag. The tags are case independent.</p>
            </div>
        </div>

        <h2>Tags</h2>
        {#if edit}
            <button onclick={()=>{updateTags(null)}} aria-label="submit">
                <svg width="35px" height="35px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="#000000">
                    <path d="M5 13L9 17L19 7" stroke="#ff0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </button>
        {:else}
            <button onclick={showEdit} aria-label="edit">
                <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="#000000">
                    <path d="M8 12H12M16 12H12M12 12V8M12 12V16" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </button>
        {/if}
    </div>

    {#if edit}
        <input
            type="text"
            bind:value={newTag}
            bind:this={focusInput}
            onchange={()=>{updateTags(null)}}
        >
    {/if}

    <div class="tags">
        {#each tags as tag, i}
            <div class="tag">
                <button class="removeButton" onclick={()=>{updateTags(i)}} aria-label="Remove Tag">
                    <svg width="22px" height="22px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" color="#000000">
                        <path d="M20 9L18.005 20.3463C17.8369 21.3026 17.0062 22 16.0353 22H7.96474C6.99379 22 6.1631 21.3026 5.99496 20.3463L4 9" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M21 6L15.375 6M3 6L8.625 6M8.625 6V4C8.625 2.89543 9.52043 2 10.625 2H13.375C14.4796 2 15.375 2.89543 15.375 4V6M8.625 6L15.375 6" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                </button>
                <p>{tag.toUpperCase()}</p>
            </div>
        {/each}
    </div>
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
        flex-wrap: wrap;
        display: flex;
    }

    .tag{
        border: 1px solid red;
        padding: 10px 30px 10px 10px;
        margin: 5px 5px;
        border-radius: 5px;
        font-size: 18px;
        position: relative;
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
        margin-bottom: 10px;
    }

    .tooltipContainer{
        position: relative;
    }

    .tooltipContainer svg{
        position: relative;
        z-index: 3;
    }

    .tooltipContainer svg:hover + .tooltip{
        display: flex;
    }

    .tooltip{
        display: none;
        background: white;
        color: black;
        padding: 10px;
        position: absolute;
        width: 250px;
        top: 25px;
        left: 25px;
        z-index: 4;
    }

    .removeButton{
        background: red;
        position: absolute;
        top: 0;
        right: 0;
    }
</style>
