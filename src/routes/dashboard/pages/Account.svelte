<script>
    import {createEventDispatcher} from "svelte";
    import ChangePassModal from "../components/ChangePassModal.svelte";
    import Loader from "../../../components/Loader.svelte";
    import Slogan from "../components/vendorProperties/Slogan.svelte";
    import Description from "../components/vendorProperties/Description.svelte";
    import Phone from "../components/vendorProperties/Phone.svelte";
    import Email from "../components/vendorProperties/Email.svelte";
    import Address from "../components/vendorProperties/Address.svelte";
    import StripeSetup from "../components/StripeSetup.svelte";

    const dispatch = createEventDispatcher();

    let {vendor} = $props();
    let modal = $state(false);
    let imageUrl = $state("");
    let loader = $state(false);
    let files = $state(null);
    let stripeSetup = $state(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    const showLoader = (event)=>{
        loader = event.detail.showLoader;
    }

    const newThumbnail = ()=>{
        loader = true;
        const formData = new FormData();
        formData.append("file", files[0]);

        fetch(`${apiUrl}/vendor/image`, {
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
                        message: response.error.message
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
            imageUrl = `${apiUrl}/document/${vendor.image}`;
        }else{
            imageUrl = `${apiUrl}/document/defaultVendorImage.png`;
        }
    });

    const setLoader = (on)=>{
        loader = on;
    }

    const notify = (type, message)=>{
        dispatch("notify", {
            type: type,
            message: message
        });
    }
</script>

{#if loader}
    <Loader/>
{/if}

{#if stripeSetup}
    <StripeSetup
        loader={setLoader}
        notify={notify}
        close={()=>{stripeSetup = false}}
    />
{/if}

<div class="container">
    {#if modal}
        <ChangePassModal
            on:cancel={modal = false}
            on:notify
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

    <div class="divider"></div>

    <h1 class="stripeTitle">Stripe (payment processor)</h1>
    {#if vendor.onlineSales}
        <a class="button" href="http://dashboard.stripe.com">View Dashboard</a>
    {:else}
        <button
            class="button"
            onclick={()=>{stripeSetup = true}}
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
        class="button"
        onclick={modal = true}
    >Change Password</button>
</div>

<style>
    .container{
        padding: 35px;
        color: rgb(225, 225, 225);
    }

    .vendorImage{
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

    .stripeTitle{
        margin-bottom: 15px;
    }
</style>
