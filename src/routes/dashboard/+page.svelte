<script>
    import "../../global.css";
    import {onMount} from "svelte";
    import Notifier from "../../components/Notifier.svelte";
    import Loader from "../../components/Loader.svelte";
    import Menu from "./components/Menu.svelte";

    let notifier = $state({type: "", message: ""});
    let loader = $state(false);
    let vendor;

    const changePage = (event)=>{
        console.log(event.detail.page);
    }

    onMount(()=>{
        const token = localStorage.getItem("vendorToken");
        if(!token) window.location.href = "/login";

        loader = true;
        fetch(`${import.meta.env.VITE_API_URL}/vendor/self`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
            .then(r=>r.json())
            .then((response)=>{
                if(response.error){
                    localStorage.removeItem("vendorToken");
                    window.location.href = "/login";
                }else{
                    vendor = response;
                }
            })
            .catch((err)=>{
                console.log(err);
                notifier.type = "error";
                notifier.message = "Something went wrong, try refreshing the page";
            })
            .finally(()=>{
                loader = false;
            });
    });
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
