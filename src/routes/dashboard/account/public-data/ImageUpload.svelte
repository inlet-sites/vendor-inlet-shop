<script>
    import {getContext} from "svelte";

    const vendor = getContext("vendor");
    const loader = getContext("loader");
    const notify = getContext("notify");
    let image = $state();
    let files = $state();
    $effect(()=>{
        if($vendor?.publicData.image){
            image = `${import.meta.env.VITE_API_URL}/document/${$vendor.publicData.image}`;
        }else{
            image = `${import.meta.env.VITE_API_URL}/document/defaultVendorImage.png`;
        }
    });

    const updateImage = ()=>{
        loader(true);
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
                    notify("error", response.error.message);
                }else{
                    vendor.set(response);
                    notify("success", "Profile image updated");
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

{#if $vendor}
    <div class="ImageUpload">
        <h3>Profile Picture</h3>

        <label>
            <img src={image} alt={$vendor.store}>
            <input type="file" onchange={updateImage} bind:files/>
        </label>
    </div>
{/if}

<style>
    .ImageUpload{
        margin-bottom: 35px;
    }

    h3{
        text-decoration: underline;
        font-size: 19px;
    }

    img{
        max-height: 150px;
        max-width: 150px;
    }

    input{
        display: none;
    }

    label{
        cursor: pointer;
    }
</style>
