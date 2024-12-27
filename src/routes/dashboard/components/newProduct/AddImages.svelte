<script>
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();
    let images = [];

    const handleFileChange = (event)=>{
        images = Array.from(event.target.files);
    }

    const next = ()=>{
        dispatch("next", {
            images: images
        });
    }

    const cancel = ()=>{
        dispatch("cancel");
    }
</script>

<div class="AddImages">
    <h1>Add Images</h1>
    <p>If you have multiple variations of this product, then you can add photos of each variation later. This is general images of the product that will be displayed for all variations.</p>

    <form class="standardForm" onsubmit={next}>
        <label>Images
            <input
                type="file"
                onchange={handleFileChange}
                accept="/image/*"
                multiple
            >
        </label>

        <div class="buttonBox">
            <button class="button" type="button" onclick={cancel}>Cancel</button>
            <button class="button">Next</button> 
        </div>
    </form>
</div>

<style>
    .AddImages{
        color: white;
        max-width: 1000px;
    }
</style>
