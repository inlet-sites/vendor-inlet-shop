<script>
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();
    let {phone} = $props();
    let edit = $state(false);

    const updatePhone = ()=>{
        dispatch("loader", {on: true});
        fetch(`${import.meta.env.VITE_API_URL}/vendor`, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("vendorToken")}`
            },
            body: JSON.stringify({phone: phone})
        })
            .then(r=>r.json())
            .then((response)=>{
                if(response.error){
                    dispatch("notify", {
                        type: "error",
                        message: response.error.message
                    });
                }else{
                    dispatch("updateVendor", {vendor: response});
                    dispatch("notify", {
                        type: "success",
                        message: "Phone number updated"
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

<div class="Phone">
    <div class="title">
        <h3>Phone Number</h3>
        {#if edit}
            <button onclick={updatePhone} aria-label="confirm">
                <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="#000000">
                    <path d="M5 13L9 17L19 7" stroke="#ff0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </button>
        {:else}
            <button onclick={edit = true} aria-label="edit">
                <svg width="22px" height="22px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" color="#000000">
                    <path d="M14.3632 5.65156L15.8431 4.17157C16.6242 3.39052 17.8905 3.39052 18.6716 4.17157L20.0858 5.58579C20.8668 6.36683 20.8668 7.63316 20.0858 8.41421L18.6058 9.8942M14.3632 5.65156L4.74749 15.2672C4.41542 15.5993 4.21079 16.0376 4.16947 16.5054L3.92738 19.2459C3.87261 19.8659 4.39148 20.3848 5.0115 20.33L7.75191 20.0879C8.21972 20.0466 8.65806 19.8419 8.99013 19.5099L18.6058 9.8942M14.3632 5.65156L18.6058 9.8942" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </button>
        {/if}
    </div>
    <p class="note">*Phone or email required to sell online</p>

    {#if edit}
        <input
            type="text"
            bind:value={phone}
            onchange={updatePhone}
        />
    {:else}
        {#if phone}
            <p>{phone}</p>
        {:else}
            <p>***No Phone Number***</p>
        {/if}
    {/if}
</div>

<style>
    .Phone{
        margin: 25px 0;
    }

    .title{
        display: flex;
        align-items: center;
    }

    h3{
        text-decoration: underline;
        font-size: 22px;
    }

    .note{
        margin-bottom: 10px;
        font-size: 13px;
        color: rgb(252, 116, 100);
    }

    button{
        background: none;
        border: none;
        cursor: pointer;
        margin-left: 10px;
    }

    input{
        font-size: 28px;
    }
</style>
