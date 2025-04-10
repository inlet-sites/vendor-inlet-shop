<script>
    import Header from "./Header.svelte";

    let {children} = $props();
</script>

<div class="container">
    <Header/>

    {@render children()}
</div>

<style>
    .container{
        width: 100%;
    }
</style>
