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
        <p>Once a vendor contacts us, we will set up a time to meet. During this meeting, we will simply help you to set up everything that you need to sell on the site. For example, we use a payment system called Stripe for accepting payments. We will help your business get set up on Stripe. We can also create your account right there, with just a little information about your business.</p>

        <p>Once your account is set up, we will then walk your through using the site and creating products to sell online so that you feel comfortable with it.</p>

        <p>All money earned on Inlet.Shop goes directly to your Stripe account, then to you. Each month, Inlet Sites will send you a bill for our fees.</p>

        <h1>Vendor Costs</h1>
        <p>Most of the cost for selling will be due to the payment processor, Stripe. They have a fee of 2.9% plus $0.30/transaction. This amount is taken automatically when the payment is processed.</p>

        <p>Inlet.Shop has a $25/month fee, plus 1% of sales on the site. We do not take this automatically, but will send a bill at the end of each month for the total amount owed.</p>

        <p>So, a summary of costs:</p>
        <ul>
            <li>$25/month</li>
            <li>3.9% of sales</li>
            <li>$0.30/transaction</li>
        </ul>

        <h1>Vendor responsibilities</h1>
        <p>Inlet.Shop is not responsible for fulfilling any orders. It is the responsibility of the vendor to ship, or otherwise fulfill any orders placed on the site.</p>

        <p>Some form of contact is required for vendors so that customers may contact them. In the event that customers contact Inlet Sites about non-fulfillment or other issues, we will contact the vendor to resolve the issue.</p>
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
