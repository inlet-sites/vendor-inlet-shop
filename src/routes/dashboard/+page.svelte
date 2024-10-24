<script>
    import "../../global.css";
    import Notifier from "../../components/Notifier.svelte";
    import Loader from "../../components/Loader.svelte";
    import Menu from "./components/Menu.svelte";

    let notifier = $state({type: "", message: ""});
    let loader = $state(false);

    const changePage = (event)=>{
        console.log(event.detail.page);
    }
</script>

<Notifier type={notifier.type} message={notifier.message}/>
{#if loader}
    <Loader/>
{/if}
<Menu
    on:page={changePage}
/>

<div class="container">
</div>
