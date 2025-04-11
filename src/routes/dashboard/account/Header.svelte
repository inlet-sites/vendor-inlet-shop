<script>
    import {afterNavigate} from "$app/navigation";

    let active = $state();

    afterNavigate(()=>{
        const path = window.location.pathname;
        if(path.includes("public-data")){
            active = "public";
        }else if(path.includes("online-sales")){
            active = "sales";
        }else{
            active = "settings"
        }
    });
</script>

<div class="Header">
    <a class:active={active==="settings"} href="/dashboard/account">Settings</a>
    <div class="divider"></div>
    <a class:active={active==="public"} href="/dashboard/account/public-data">Public Information</a>
    <div class="divider"></div>
    <a class:active={active==="sales"} href="/dashboard/account/online-sales">Online Sales</a>
</div>

<style>
    .Header{
        display: flex;
        align-items: center;
        padding-bottom: 10px;
        border-bottom: 1px solid white;
        margin-bottom: 35px;
    }

    .divider{
        border-right: 2px solid white;
        margin: 0 15px;
        height: 45px;
    }

    a{
        color: white;
        text-decoration: none;
        font-size: 22px;
    }

    a.active{
        color: red;
    }

    @media screen and (max-width: 850px){
        .Header{
            margin-top: 35px;
            width: 100%;
        }

        a{
            font-size: 18px;
        }
    }
</style>
