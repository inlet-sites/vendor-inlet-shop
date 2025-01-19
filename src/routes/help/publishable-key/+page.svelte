<script>
    import tokenHelp01 from "$lib/tokenHelp01.webp";
    import tokenHelp02 from "$lib/tokenHelp02.webp";
</script>

<div class="container">
    <h1>How to Get your Stripe Publishable Key</h1>

    <h2>Go to the API keys section of the Developer portal</h2>
    <p>Go to Stripe and enter "API keys" in the search bar at the top. Choose the option "Developers > API keys".</p>
    <img src={tokenHelp01} alt="Search for Developers > API key">
    <p>Here you will see a page with "Standard keys" and "Restricted keys". You will be creating a restricted key here.</p>
    <img src={tokenHelp02} alt="API keys page">

    <p>Now, you should see "Publishable key" with a long string of characters. Just click on that string of characters and that should copy it so that you can paste it in on your account page.</p>

    <h2 id="contact">Having trouble?</h2>
    <p>If you run into any trouble with setting up Stripe for sales, just get ahold of us and we will gladly help you out.</p>
    <ul>
        <li><a href="mailto:lee@inletsites.dev">lee@inletsites.dev</a></li>
        <li><a href="tel+18434109586">(843) 410- 9586</a></li>
    </ul>

    <iframe class="rumble" width="640" height="360" src="https://rumble.com/embed/v68krqy/?pub=4gu0cj" frameborder="0" allowfullscreen></iframe>
</div>

<style>
    .container{
        display: flex;
        flex-direction: column;
        color: var(--text);
        width: 100vw;
        max-width: 1200px;
        margin: 0 auto;
        padding: 35px;
    }

    h1{
        font-size: 45px;
    }

    h2{
        margin-top: 35px;
        font-size: 35px;
        text-decoration: underline;
    }

    p{
        margin: 15px;
        font-size: 18px;
    }

    img{
        width: 75%;
        margin: 0 auto;
    }

    a{
        color: white;
    }

    iframe{
        border: 2px solid rgba(255, 0, 0, 0.35);
        margin: 35px auto;
        max-width: 100%;
    }

    @media screen and (max-width: 600px){
        img{
            width: 100%;
        }
    }
</style>
