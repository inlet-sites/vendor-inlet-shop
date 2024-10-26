<script>
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();
    let {description, productId} = $props();
    let edit = $state(false);
    let paragraphs = $state("");

    $effect(()=>{
        if(description){
            paragraphs = description.split("\n");
        }
    });

    const updateDescription = ()=>{
        dispatch("loader", {on: true});
        fetch(`${import.meta.env.VITE_API_URL}/product/${productId}`, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("vendorToken")}`
            },
            body: JSON.stringify({description: description})
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
                        message: "Product description updated"
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

<div class="Description">
    <div class="title">
        <h2>Description</h2>
        {#if edit}
            <button onclick={updateDescription}>
                <svg width="35px" height="35px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="#000000">
                    <path d="M5 13L9 17L19 7" stroke="#ff0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </button>
        {:else}
            <button onclick={()=>{edit = true}}>
                <svg width="24px" height="24px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" color="#000000">
                    <path d="M14.3632 5.65156L15.8431 4.17157C16.6242 3.39052 17.8905 3.39052 18.6716 4.17157L20.0858 5.58579C20.8668 6.36683 20.8668 7.63316 20.0858 8.41421L18.6058 9.8942M14.3632 5.65156L4.74749 15.2672C4.41542 15.5993 4.21079 16.0376 4.16947 16.5054L3.92738 19.2459C3.87261 19.8659 4.39148 20.3848 5.0115 20.33L7.75191 20.0879C8.21972 20.0466 8.65806 19.8419 8.99013 19.5099L18.6058 9.8942M14.3632 5.65156L18.6058 9.8942" stroke="#e1e1e1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </button>
        {/if}
    </div>

    {#if edit}
        <textarea
            rows="10"
            bind:value={description}
            onchange={updateDescription}
        ></textarea>
    {:else}
        {#each paragraphs as p}
            <p>{p}</p>
        {/each}
    {/if}
</div>

<style>
    .Description{
        display: flex;
        flex-direction: column;
        align-items: center;
        color: var(--text);
        padding: 35px;
    }

    .title{
        display: flex;
        margin-bottom: 15px;
    }

    button{
        background: none;
        border: none;
        margin-left: 15px;
        cursor: pointer;
    }

    h2{
        text-decoration: underline;
    }

    textarea{
        width: 75%;
    }

    p{
        width: 100%;
        margin-bottom: 10px;
    }
</style>
