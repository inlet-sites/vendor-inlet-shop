<script>
    import {getContext, tick} from "svelte";

    const loader = getContext("loader");
    const notify = getContext("notify");
    let {description, productId} = $props();
    let edit = $state(false);
    let inputElem = $state();

    const editOn = ()=>{
        edit = true;
        tick().then(()=>{inputElem.focus()});
    }

    const submit = ()=>{
        loader(true);
        fetch("/api/product", {
            method: "put",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                description: description,
                productId: productId
            })
        })
            .then(r=>r.json())
            .then((response)=>{
                if(response.error){
                    notify("error", response.error.message);
                }else{
                    edit = false;
                    notify("success", "Description update");
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

<div class="Description">
    <div class="title">
        <h3>Description</h3>

        {#if edit}
            <button aria-label="Submit" onclick={submit}>
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
        <textarea
            rows="15"
            bind:value={description}
            bind:this={inputElem}
        ></textarea>
    {:else}
        {#each description.split("\n") as p}
            <p>{p}</p>
        {/each}
    {/if}
</div>

<style>
    .Description{
        color: white;
        margin-top: 35px;
    }

    h3{
        text-decoration: underline;
    }

    .title{
        display: flex;
    }

    button{
        background: none;
        border: none;
        color: red;
        margin-left: 35px;
        cursor: pointer;
    }

    textarea{
        font-size: 18px;
        width: 100%;
        max-width: 750px;
    }

    p{
        margin: 10px 0;
    }
</style>
