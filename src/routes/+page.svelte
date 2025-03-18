<script>
    import "../global.css";
    import logo from "$lib/logo.png";

    const login = ()=>{
        if(localStorage.getItem("vendorToken")){
            window.location.href = "/dashboard";
        }else{
            window.location.href = "/login";
        }
    }
</script>

<svelte:head>
    <title>Vendor | Inlet.shop</title>
</svelte:head>

<div class="container">
    <header>
        <button onclick={login}>Log In</button>

        <a class="helpLink" href="/help">Help</a>

        <div class="logo">
            <img src={logo} alt="Inlet Sites logo">

            <h2>Inlet.Shop</h2>
        </div>

        <h1>Vendor Portal</h1>

        <a class="aboutLink" href="#about">
            <p>Want to become a vendor on Inlet.Shop?</p>
            <svg width="55px" height="55px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="#000000">
                <path d="M6 9L12 15L18 9" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
        </a>
    </header>

    <div id="about">
        <h1>Our Goals</h1>
        <p>The main goal of Inlet.Shop is to create a marketplace for businesses in the Murrells Inlet area. We want to create a place where local businesses can sell their products for as cheap as possible. Inlet.Shop is created by <a href="https://inletsites.dev">Inlet Sites</a>, a local business, with the aim of assisting other local businesses.</p>

        <h1>Registration</h1>
        <p>In order to register as a vendor on Inlet.Shop, please <a href="#contact">contact</a> us. We meet personally with every business that sells on Inlet.Shop. We do this both to get to know our vendors, and also as a way to prevent illegal/inappropriate sales on the site. This also gives us a chance to help you, as a vendor, set up everything necessary for sales and answer any questions.</p>

        <h1>How it works</h1>
        <p>Once you contact us, we will set up a time to meet. We can help you get set up on the site and give you a walkthrough to show how everything works. We can also answer any questions that you may have at the time. There is no cost or obligation with this meeting.</p>

        <p>Once your account on <a href="https://vendor.inlet.shop">Vendor.Inlet.Shop</a> is created, you can then add all of the information for your business. If you want to make sales online, then you can set up your payment processing directly on the site. If you only wish to list your items, without online sales, then you can skip this step.</p>

        <p>On <a href="https://inlet.shop">Inlet.Shop</a> you will have a page that displays your bussiness with information about it, as well as a page that will display all of your products. Optionally, we can create a custom pagefor your business to display on the site</p>

        <p>When you sell an item on the site, the payment is processed through <a href="https://stripe.com">Stripe</a>. The sales fee is taken from the price and the rest is deposited directly to your account.</p>

        <h1>Vendor Costs</h1>
        <ul>
            <li>3.9% of sales</li>
            <li>$0.30/transaction</li>
            <li>$100 (optional) custom webpage</li>
        </ul>

        <h1>Vendor responsibilities</h1>
        <p>Inlet.Shop is not responsible for fulfilling any orders. It is the responsibility of the vendor to ship, or otherwise fulfill any orders placed on the site.</p>

        <p>Some form of contact information is required for vendors so that customers may contact them. In the event that customers contact Inlet Sites about non-fulfillment or other issues, we will contact the vendor to resolve the issue.</p>
    </div>

    <div id="contact">
        <h1>Contact Information</h1>
        <ul>
            <li>Email: <a href="mailto:lee@inletsites.dev">lee@inletsites.dev</a></li>
            <li>Phone: <a href="tel:+18434109586">(843) 410-9586</a></li>
        </ul>
    </div>
</div>

<style>
    header{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        height: 100vh;
        width: 100vw;
        color: white;
        position: relative;
        padding: 15% 0;
    }

    header button{
        position: absolute;
        top: 35px;
        right: 35px;
        font-size: 28px;
        color: var(--text);
        background: none;
        border: none;
        text-decoration: underline;
        cursor: pointer;
    }

    .helpLink{
        position: absolute;
        top: 35px;
        left: 35px;
        font-size: 28px;
        color: var(--text);
    }

    .aboutLink{
        font-size: 28px;
        position: absolute;
        bottom: 15px;
        left: 0;
        width: 100%;
        text-align: center;
        color: rgb(225, 225, 225);
    }

    .logo{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 75%;
        max-width: 1200px;
        height: 200px;
        font-size: 75px;
    }

    .logo img{
        height: 200px;
        width: 200px;
        margin-right: 35px;
    }

    header h1{
        font-size: 55px;
    }

    #about{
        color: rgb(225, 225, 225);
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
    }

    #about a{
        color: rgb(125, 125, 125);
    }

    #about h1{
        margin-top: 35px;
    }

    #about p{
        font-size: 18px;
        line-height: 28px;
        margin-bottom: 15px;
    }

    #contact{
        color: rgb(225, 225, 225);
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
    }

    #contact a{
        color: rgb(125, 125, 125);
    }

    #contact ul{
        list-style-type: none;
    }

    #contact li{
        font-size: 22px;
        margin: 25px 0;
    }

    @media screen and (max-width: 850px){
        header{
            padding: 35% 0;
        }

        .logo{
            flex-direction: column;
            font-size: 45px;
        }

        .logo img{
            margin: 0;
        }

        header h1{
            font-size: 35px;
        }

        #about{
            padding: 0 15px;
        }

        #contact{
            padding: 0 15px;
        }
    }
</style>
