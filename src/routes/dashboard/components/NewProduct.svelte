<script>
    import {createEventDispatcher} from "svelte";
    import Loader from "../../../components/Loader.svelte";

    const dispatch = createEventDispatcher();
    let name = $state("");
    let tags = $state([""]);
    let description = $state("");
    let price = $state(null);
    let quantity = $state(null);
    let files = $state(null);
    let loader = $state(false);
    let needsToRun = true;

    const cancel = ()=>{
        dispatch("closeCreate");
    }

    $effect(()=>{
        let needsField = true;
        for(let i = 0; i < tags.length; i++){
            if(tags[i] === ""){
                needsField = false;
                break;
            }
        }

        if(needsField) tags.push("");
    });

    const createTags = ()=>{
        const newTags = [];
        for(let i = 0; i < tags.length; i++){
            if(tags[i] !== "") newTags.push(tags[i]);
        }

        return JSON.stringify(newTags);
    }

    const submit = ()=>{
        loader = true;

        let formData = new FormData();
        formData.append("name", name);
        formData.append("tags", createTags());
        formData.append("description", description);
        formData.append("price", price * 100);
        formData.append("quantity", quantity);
        formData.append("active", true);
        for(let i = 0; i < files.length; i++){
            formData.append("images", files[i]);
        }

        fetch(`${import.meta.env.VITE_API_URL}/product`, {
            method: "post",
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
                    dispatch("notify", {
                        type: "success",
                        message: "New Product Created"
                    });
                    dispatch("addProduct", {product: response});
                    dispatch("closeCreate");
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
</script>

<div class="NewProduct">
    {#if loader}
        <Loader/>
    {/if}

    <button
        class="button cancel"
        onclick={cancel}
    >Cancel</button>

    <form class="standardForm" onsubmit={submit}>
        <h1>Create New Product</h1>

        <label>Product Name
            <input
                type="text"
                bind:value={name}
                placeholder="Name"
                required
            >
        </label>

        <label>Tags
            {#each tags as tag, i}
                <input
                    class="tag"
                    type="text"
                    bind:value={tags[i]}
                    placeholder="Tag"
                >
            {/each}
        </label>

        <label>Description
            <textarea
                rows="10"
                bind:value={description}
                placeholder="Description"
                required
            ></textarea>
        </label>

        <label>Price
            <input
                type="number"
                bind:value={price}
                min="0"
                step="0.01"
                placeholder="Price"
                required
            >
        </label>

        <label>Quantity in Stock
            <input
                type="number"
                bind:value={quantity}
                min="0"
                placeholder="Quantity"
                required
            >
        </label>

        <label>Product Images
            <input
                type="file"
                bind:files
                multiple
                required
            >
        </label>

        <button class="button">Create</button>
    </form>
</div>

<style>
    .NewProduct{
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: rgb(0, 0, 25);
        color: var(--text);
        padding: 35px;
        overflow: auto;
    }

    h1{
        font-size: 28px;
    }

    .NewProduct .standardForm{
        width: 50%;
    }

    .NewProduct button{
        margin-top: 35px;
    }

    .cancel{
        position: absolute;
        top: 15px;
        right: 35px;
        background: rgb(100, 0, 0);
        color: var(--text);
    }

    .cancel:hover{
        background: rgb(125, 0, 0);
    }

    .tag{
        margin-bottom: 5px;
    }

    @media screen and (max-width: 1200px){
        .NewProduct .standardForm{
            width: 100%;
        }
    }

    @media screen and (max-width: 850px){
        .NewProduct{
            padding-top: 100px;
        }

        .cancel{
            top: 0;
            right: initial;
            left: 35px;
        }

        input[type="file"]{
            font-size: 22px;
        }
    }
</style>
