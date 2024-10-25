<script>
    import "../../global.css";
    import {onMount} from "svelte";
    import Notifier from "../../components/Notifier.svelte";
    import Loader from "../../components/Loader.svelte";
    import Menu from "./components/Menu.svelte";
    import Account from "./pages/Account.svelte";
    import Products from "./pages/Products.svelte";

    let notifier = $state({type: "", message: ""});
    let loader = $state(false);
    let page = $state("account");
    let vendor = $state({});

    const changePage = (event)=>{
        page = event.detail.page;
    }

    const notify = (event)=>{
        notifier.type = event.detail.type;
        notifier.message = event.detail.message;
    }

    const updateVendor = (event)=>{
        vendor = event.detail.vendor;
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

<div class="container">
    <Menu
        on:page={changePage}
    />

    <div class="pages">
        {#if page === "account"}
            <Account
                vendor={vendor}     
                on:notify={notify}
                on:updateVendor={updateVendor}
            />
        {:else if page === "products"}
            <Products
                on:notify={notify}
            />
        {/if}
    </div>
</div>

<style>
    .container{
        display: flex;
        height: 100vh;
        width: 100vw;
    }

    .pages{
        height: 100%;
        width: calc(100% - 250px);
        overflow-y: auto;
    }
</style>
