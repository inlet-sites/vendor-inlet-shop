<script>
    import {getContext} from "svelte";

    const vendor = getContext("vendor");
    const loader = getContext("loader");
    const notify = getContext("notify");
    let edit = $state(false);

    const submit = ()=>{
        console.log($vendor.publicData);
        loader(true);

        fetch("/dashboard/account/public-data", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                address: {
                    text: $vendor.publicData.address.text,
                    link: $vendor.publicData.address.link
                }
            })
        })
            .then(r=>r.json())
            .then((response)=>{
                if(response.error){
                    notify("error", response.error.message);
                }else{
                    vendor.set(response);
                    notify("success", "Address updated");
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
        <h3>Address</h3>
        {#if edit}
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
    
    {#if edit}
        <form onsubmit={submit}>
            <label>Address
                <textarea
                    type="text"
                    bind:value={$vendor.publicData.address.text}
                    rows="5"
                ></textarea>
            </label>

            <label>Address link (optional)
                <input
                    type="text"
                    bind:value={$vendor.publicData.address.link}
                >
            </label>
        </form>
    {:else}
        <p class="data">{$vendor?.publicData?.address?.text || "***None***"}</p>
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

    form{
        display: flex;
        flex-direction: column;
        max-width: 750px;
    }

    label{
        display: flex;
        flex-direction: column;
    }

    button{
        background: none;
        border: none;
        color: red;
        cursor: pointer;
        margin-left: 15px;
    }

    input, textarea, .data{
        font-size: 22px;
        padding-left: 10px;
        margin-bottom: 5px;
    }
</style>
