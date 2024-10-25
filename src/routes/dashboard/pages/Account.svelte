<script>
    import {createEventDispatcher} from "svelte";
    import ChangePassModal from "../components/ChangePassModal.svelte";
    import Loader from "../../../components/Loader.svelte";

    const dispatch = createEventDispatcher();

    let {vendor} = $props();
    let modal = $state(false);
    let imageUrl = $state("");
    let loader = $state(false);
    let files = $state(null);

    const newThumbnail = ()=>{
        loader = true;
        const formData = new FormData();
        formData.append("file", files[0]);
        console.log(formData);

        fetch(`${import.meta.env.VITE_API_URL}/vendor/image`, {
            method: "put",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("vendorToken")}`
            },
            body: formData
        })
            .then(r=>r.json())
            .then((response)=>{
                if(response.error){
                    dispatch("notify", {
                        type: "error",
                        message: response.message
                    });
                }else{
                    dispatch("updateVendor", {vendor: response});
                }
            })
            .catch((err)=>{
                dispatch("notify", {
                    type: "error",
                    message: "Something went wrong, try refreshing the page"
                });
            })
            .finally(()=>{
                loader = false;
            });
    }

    $effect(()=>{
        if(vendor.image){
            imageUrl = `${import.meta.env.VITE_API_URL}/document/${vendor.image}`;
        }else{
            imageUrl = `${import.meta.env.VITE_API_URL}/document/defaultVendorImage.png`;
        }
    });
</script>

{#if loader}
    <Loader/>
{/if}

<div class="container">
    {#if modal}
        <ChangePassModal
            on:cancel={modal = false}
            on:notify
        />
    {/if}

    <h1>{vendor.store}</h1>

    <button
        class="changePass"
        onclick={modal = true}
    >Change Password</button>

    <div class="vendorImage">
        <h2>Thumbnail Image</h2>
        <label>
            <img src={imageUrl} alt="Vendor thumbnail">
            <input type="file" onchange={newThumbnail} bind:files/>
        </label>
    </div>
</div>

<style>
    .container{
        padding: 35px;
        color: rgb(225, 225, 225);
    }

    h1{
        margin-bottom: 35px; 
    }

    .changePass{
        background: white;
        border: none;
        font-size: 22px;
        padding: 10px;
        cursor: pointer;
        border: 2px outset white;
    }

    .changePass:active{
        border-style: inset
    }

    .changePass:hover{
        background: rgb(200, 200, 200);
    }

    .vendorImage{
        display: flex;
        flex-direction: column;
        margin-top: 35px;
    }

    .vendorImage label{
        cursor: pointer;
    }

    .vendorImage input{
        display: none;
    }

    .vendorImage h2{
        text-decoration: underline;
    }

    .vendorImage img{
        width: 200px;
        height: 200px;
    }
</style>
