<script>
    import {getContext} from "svelte";

    const vendor = getContext("vendor");
    const loader = getContext("loader");
    const notify = getContext("notify");
    let edit = $state(false);

    const addLink = ()=>{
        $vendor.publicData.links = [...$vendor.publicData.links, {}];
    }

    const removeLink = (i)=>{
        $vendor.publicData.links = $vendor.publicData.links.toSpliced(i, 1);
    }

    const submit = ()=>{
        loader(true);

        fetch(`${import.meta.env.VITE_API_URL}/vendor`, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("vendorToken")}`
            },
            body: JSON.stringify({links: $vendor.publicData.links})
        })
            .then(r=>r.json())
            .then((response)=>{
                if(response.error){
                    notify("error", response.error.message);
                }else{
                    vendor.set(response);
                    notify("success", "Links updated");
                }
            })
            .catch((err)=>{
                notify("error", "Something went wrong, try refreshing the page");
            })
            .finally(()=>{
                loader(false);
                edit = false;
            });
    }
</script>

<div class="Phone">
    <div class="head">
        <h3>Links</h3>
        {#if edit}
            <button onclick={addLink} aria-label="Add Link">
                <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="#currentColor">
                    <path d="M8 12H12M16 12H12M12 12V8M12 12V16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </button>

            <button onclick={submit} aria-label="Submit">
                <svg width="32px" height="32px" stroke-width="2" viewBox="0 0 24 24" fill="none" color="currentColor">
                    <path d="M5 13L9 17L19 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </button>
        {:else}
            <button onclick={()=>{edit = true}} aria-label="Edit">
                <svg width="28px" height="28px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" color="currentColor">
                    <path d="M14.3632 5.65156L15.8431 4.17157C16.6242 3.39052 17.8905 3.39052 18.6716 4.17157L20.0858 5.58579C20.8668 6.36683 20.8668 7.63316 20.0858 8.41421L18.6058 9.8942M14.3632 5.65156L4.74749 15.2672C4.41542 15.5993 4.21079 16.0376 4.16947 16.5054L3.92738 19.2459C3.87261 19.8659 4.39148 20.3848 5.0115 20.33L7.75191 20.0879C8.21972 20.0466 8.65806 19.8419 8.99013 19.5099L18.6058 9.8942M14.3632 5.65156L18.6058 9.8942" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </button>
        {/if}
    </div>
    
    {#if $vendor}
        {#if edit}
            <form onsubmit={submit}>
                {#each $vendor.publicData.links as link, i}
                    <div class="inputItem">
                        <button onclick={()=>{removeLink(i)}} aria-label="Remove Link" type="button" class="remove">
                            <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="currentColor">
                                <path d="M8 12H16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                        </button>
                        <label>Display name
                            <input type="text" bind:value={$vendor.publicData.links[i].text}>
                        </label>

                        <label>URL
                            <input type="text" bind:value={$vendor.publicData.links[i].url}>
                        </label>
                    </div>
                {/each}
            </form>
        {:else}
            <div class="displayLinks">
                {#each $vendor.publicData.links as link}
                    <a href={link.url} target="_blank">{link.text}</a>
                {/each}
            </div>
        {/if}
    {/if}
</div>

<style>
    .Phone{
        color: white;
        margin-bottom: 35px;
    }

    .head{
        display: flex;
        align-items: center;
        margin-bottom: 5px;
    }

    .head h3{
        text-decoration: underline;
    }

    button{
        background: none;
        border: none;
        color: red;
        cursor: pointer;
        margin-left: 15px;
    }

    .inputItem{
        border: 1px solid rgba(255, 0, 0, 0.35);
        padding: 15px 5px 5px 5px;
        max-width: 750px;
        margin-bottom: 15px;
        position: relative;
    }

    .displayLinks{
        display: flex;
        flex-direction: column;
    }

    .displayLinks a{
        color: white;
        margin-bottom: 10px;
        font-size: 22px;
        text-decoration: none;
    }

    label{
        display: flex;
        flex-direction: column;
    }

    input{
        font-size: 22px;
        padding-left: 10px;
    }

    .remove{
        position: absolute;
        top: 5px;
        right: 5px;
    }
</style>
