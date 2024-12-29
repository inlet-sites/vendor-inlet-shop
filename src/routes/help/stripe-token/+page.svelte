<script>
    import "../../../global.css";
    import tokenHelp01 from "$lib/tokenHelp01.webp";
    import tokenHelp02 from "$lib/tokenHelp02.webp";
    import tokenHelp03 from "$lib/tokenHelp03.webp";
    import tokenHelp04 from "$lib/tokenHelp04.webp";
    import tokenHelp05 from "$lib/tokenHelp05.webp";
    import tokenHelp06 from "$lib/tokenHelp06.webp";
</script>

<div class="container">
    <h1>How to create your Stripe API Token</h1>

    <h2>Create your Stripe account</h2>
    <p>Stripe is the payment processor used by Inlet.Shop to process card payments and ensure that you recieve the money for your products. To simplify the process of getting paid and ensure the lowest fees, each seller on Inlet.Shop needs to create their own Stripe account.</p>
    <p>If you have not created your Stripe account yet, then this is the first step. Go to <a href="https://stripe.com">Stripe</a> and register your account. Once you have an account, Stripe will guide you through the process of adding your business information. Just follow the steps to add this information and then move on to the next step. If you get stuck or need help, feel free to <a href="#contact">reach out</a> to us.</p>

    <h2>Go to the API keys section of the Developer portal</h2>
    <p>Go to Stripe and enter "API keys" in the search bar at the top. Choose the option "Developers > API keys".</p>
    <img src={tokenHelp01} alt="Search for Developers > API key">
    <p>Here you will see a page with "Standard keys" and "Restricted keys". You will be creating a restricted key here.</p>
    <img src={tokenHelp02} alt="API keys page">

    <h2>Create Key</h2>
    <p>First, click on "+ Create restricted key". You should recieve two options, "Providing this key to another website" and "Building your own integration". You want to choose the first option, "Providing this key to another website".</p>

    <p>You should now see a page "Create a restricted key", with textboxes for entering "Name" and "URL". For name, you can enter anything you want. This is just the name that it will be called to identify the key. For URL you need to enter "https://api.inlet.shop". This is the address that will use the key to process transactions.</p>
    <img src={tokenHelp03} alt="API key name and URL">
    <p>There is also a checkbox for "Customize permissions for this key". For simplicity, we recommend not checking this box. However, if you would like to restrictwhat Inlet.Shop can access, then we will go over that below.</p>

    <h2>Granting permissions</h2>
    <p>If you did not choose "Customize permissions for this key", then you can skip this step.</p>
    <p>If you want to customize permissions and are unsure of what you are doing, then please <a href="#contact">contact us</a>. This can be a bit confusing, and if anything is not set correctly, then you will not be able to sell on Inlet.Shop</p>
    <p>On the next page you will see a list of resource types. Each resource has an option for "None", "Read" and "Write" (Some will not have the "Write") option.</p>
    <p>You can set all of the options to "None" at first if you like. The specific items that need to be set are listed below.</p>
    <ul>
        <li>Events = "Read"</li>
        <li>PaymentIntents = "Write"</li>
        <li>Products = "Write"</li>
        <li>Invoices = "Write"</li>
        <li>Prices = "Write"</li>
    </ul>
    <img src={tokenHelp04} alt="Permissions list 1">
    <img src={tokenHelp05} alt="Permissions list 2">
    <p>Select "Create key". You will likely then be prompted for verification from an authenticator app or by sending a code to your phone.</p>

    <h2>Copy the key</h2>
    <p>At this point, you should see a box containing your API key. It will appear to be a long piece of text with random characters. Copy this key and then enter it in on Inlet.Shop when prompted for the "Stripe API Token".</p>
    <p>Note that this key will not be displayed again. If you don't copy it, then you will have to start over again and create a new key.</p>
    <p>The key displayed in the image below is just an example of what it looks like. Do not try to use it, it will not work.</p>
    <img src={tokenHelp06} alt="Copy API key">
    <p>Once you have entered the API key at Inlet.Shop, you are done setting up the API key. You can move on to <a href="/help/webhook-secret">create the webhook secret</a>.</p>

    <h2>Security Concerns</h2>
    <p>Your Stripe API key is used to perform actions on your Stripe account. Therefore you should never share this with anyone, or even save this key on your computer or anywhere else. Once you have provided this to Inlet.Shop, you will not need it again.</p>

    <p>When entering your API key on Inlet.Shop, your key is safely transmitted to our servers. You can verify this by viewing the address bar in the browser when on the website. There should be a lock (this might be in a drop-down menu) to the left of the site address. This means that your data is encrypted and safely transferred from your computer to the Inlet.Shop servers.</p>

    <p>In addition, your key is encrypted on our servers. This means that it cannot be read by anybody else.</p>

    <h2 id="contact">Having trouble?</h2>
    <p>If you run into any trouble with setting up Stripe for sales, just get ahold of us and we will gladly help you out.</p>
    <ul>
        <li><a href="mailto:lee@inletsites.dev">lee@inletsites.dev</a></li>
        <li><a href="tel+18434109586">(843) 410- 9586</a></li>
    </ul>
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

    @media screen and (max-width: 600px){
        img{
            width: 100%;
        }
    }
</style>
