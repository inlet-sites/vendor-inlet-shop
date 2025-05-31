<script>
    import logo from "$lib/logo.png";
    import {afterNavigate} from "$app/navigation";

    let active = $state();
    let menuOpen = $state(false);

    const logout = ()=>{
        const logout = document.createElement("form");
        form.action = "?/logout";
        form.method = "post";
        form.click();
    }

    const showMobile = ()=>{
        menuOpen = !menuOpen;
    }

    afterNavigate(()=>{
        const path = window.location.pathname;
        if(path.includes("account")){
            active = "account";
        }else if(path.includes("products")){
            active = "products";
        }else if(path.includes("orders")){
            active = "orders";
        }
        showMobile();
    });
</script>

<div class="container" class:open={menuOpen}>
    <img src={logo} alt="Inlet Shop logo">

    <a class:active={active === "account"} href="/dashboard/account">Account</a>

    <a class:active={active === "products"} href="/dashboard/products">Products</a>

    <a class:active={active === "orders"} href="/dashboard/orders">Orders</a>

    <div class="bottomButtons">
        <a href="/help" target="_blank">Help</a>
        <a href="/logout">Logout</a>
    </div>
</div>

<button class="mobileMenu" aria-label="open menu" onclick={showMobile}>
    <svg width="35px" height="35px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="#000000">
        <path d="M3 5H21" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M3 12H21" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M3 19H21" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>
</button>

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
        border-right: 1px solid rgba(255, 0, 0, 0.35);
        left: 0;
    }

    img{
        height: 100px;
        width: 100px;
        position: absolute;
        top: 5px;
        left: 5px;
    }

    .container a{
        background: none;
        border: none;
        color: var(--text);
        text-align: left;
        font-size: 24px;
        cursor: pointer;
        margin-bottom: 25px;
        width: 200px;
        text-decoration: none;
        font-family: inherit;
    }

    .container a{
        display: block;
        font-family: inherit;
    }

    .bottomButtons{
        position: absolute;
        bottom: 35px;
        left: 0;
        width: 100%;
        padding-left: 35px;
    }

    .container a.active{
        color: rgb(231, 0, 31);
    }

    .mobileMenu{
        display: none;
        background: none;
        border: none;
        z-index: 3;
    }

    @media screen and (max-width: 850px){
        .container{
            display: none;
            align-items: center;
            width: 100%;
            position: fixed;
            top: 0;
            left: 0;
            border-right: none;
            z-index: 3;
        }

        .container.open{
            display: flex;
        }

        .container > a{
            margin: 35px 0;
            font-size: 35px;
        }

        .mobileMenu{
            display: flex;
            position: fixed;
            top: 25px;
            right: 25px;
        }
    }
</style>
