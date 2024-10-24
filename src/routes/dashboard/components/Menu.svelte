<script>
    import logo from "$lib/logo.png";
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();

    const openPage = (page)=>{
        dispatch("page", {page: page});
    }

    const logout = ()=>{
        localStorage.removeItem("vendorToken");
        window.location.href = "/";
    }
</script>

<div class="container">
    <img src={logo} alt="Inlet Shop logo">

    <button on:click={()=>openPage("account")}>Account</button> 

    <button on:click={()=>{openPage("products")}}>Products</button>

    <button on:click={()=>{openPage("orders")}}>Orders</button>

    <div class="bottomButtons">
        <button on:click={logout}>Logout</button>
    </div>
</div>

<style>
    .container{
        display: flex;
        flex-direction: column;
        height: 100vh;
        width: 250px;
        background: black;
        position: relative;
        padding-top: 150px;
        padding: 150px 0 0 35px;
    }

    img{
        height: 100px;
        width: 100px;
        position: absolute;
        top: 5px;
        left: 5px;
    }

    .container button{
        background: none;
        border: none;
        color: var(--text);
        text-align: left;
        font-size: 24px;
        cursor: pointer;
        margin-bottom: 25px;
    }

    .bottomButtons{
        position: absolute;
        bottom: 35px;
        left: 0;
        width: 100%;
        padding-left: 35px;
    }
</style>
