<script>
    import {createEventDispatcher} from "svelte";
    import ChangePassModal from "../components/ChangePassModal.svelte";
    import Loader from "../../../components/Loader.svelte";
    import Slogan from "../components/vendorProperties/Slogan.svelte";
    import Description from "../components/vendorProperties/Description.svelte";
    import Phone from "../components/vendorProperties/Phone.svelte";
    import Email from "../components/vendorProperties/Email.svelte";
    import Address from "../components/vendorProperties/Address.svelte";
    import AddToken from "../components/AddToken.svelte";

    const dispatch = createEventDispatcher();

    let {vendor} = $props();
    let modal = $state(false);
    let imageUrl = $state("");
    let loader = $state(false);
    let files = $state(null);
    let addToken = $state(false);
    let addWebhook = $state(false);
    //const onlineSales = localStorage.getItem("onlineSales");
    const onlineSales = "false";

    const showLoader = (event)=>{
        loader = event.detail.showLoader;
    }

    const newThumbnail = ()=>{
        loader = true;
        const formData = new FormData();
        formData.append("file", files[0]);

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

    {#if addToken}
        <AddToken
            vendorId={vendor.id}
            on:notify
            on:showLoader={showLoader}
            on:cancel={()=>{addToken = false}}
            on:next={()=>{addToken = false; addWebhook = true}}
        />
    {/if}

    <h1>{vendor.store}</h1>

    <h2>Public Information</h2>
    <Slogan
        slogan={vendor.slogan}
        on:loader={(event)=>{loader = event.detail.on}}
        on:updateVendor
        on:notify
    />

    <Description
        description={vendor.description}
        on:loader={(event)=>{loader = event.detail.on}}
        on:updateVendor
        on:notify
    />

    <Phone
        phone={vendor.contact?.phone}
        on:loader={(event)=>{loader = event.detail.on}}
        on:updateVendor
        on:notify
    />

    <Email
        email={vendor.contact?.email}
        on:loader={(event)=>{loader = event.detail.on}}
        on:updateVendor
        on:notify
    />

    <Address
        address={vendor.contact?.address}
        on:loader={(event)=>{loader = event.detail.on}}
        on:updateVendor
        on:notify
    />

    {#if onlineSales === "false"}
        <div class="divider"></div>

        <h1>Online Sales</h1>
        <button
            class="button"
            onclick={()=>{addToken = true}}
        >Setup</button>
    {/if}

    <div class="divider"></div>

    <div class="vendorImage">
        <h2>Thumbnail</h2>
        <label>
            <img src={imageUrl} alt="Vendor thumbnail">
            <input type="file" onchange={newThumbnail} bind:files/>
        </label>
    </div>

    <div class="divider"></div>

    <button
        class="changePass"
        onclick={modal = true}
    >Change Password</button>
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
        height: 200px;
    }

    .divider{
        margin: 35px;
        border-bottom: 2px solid var(--text);
    }
</style>
