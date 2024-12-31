<script>
    import {onMount} from "svelte";
    import "../../../global.css";
    import secretHelp01 from "$lib/secretHelp01.webp";
    import secretHelp02 from "$lib/secretHelp02.webp";
    import secretHelp03 from "$lib/secretHelp03.webp";
    import secretHelp04 from "$lib/secretHelp04.webp";
    import secretHelp05 from "$lib/secretHelp05.webp";

    let userId = $state();

    onMount(()=>{
        const vendorToken = localStorage.getItem("vendorToken");
        if(vendorToken){
            fetch(`${import.meta.env.VITE_API_URL}/vendor/self`, {
                method: "get", 
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("vendorToken")}`
                }
            })
                .then(r=>r.json())
                .then((response)=>{
                    if(response.error){
                        userId = "<your-ID>";
                    }else{
                        userId = response.id;
                    }
                })
                .catch((err)=>{
                    userId = "<your-ID>";
                });
        }else{
            userId = "<your-ID>";
        }
    });
</script>

<div class="container">
    <h1>How to create and retrieve the webhook secret</h1>
    <p class="note">We recommend <a href="#contact">contacting us</a> for help setting this up. We can do all the heavy lifting for you. However, you can do this yourself if you feel comfortable with it.</p>

    <h2>Go to the webhooks page</h2>
    <p>To start, go to your Stripe dashboard page. Then use the search bar to search for "webhook". Choose the option "Developers > Webhooks".</p>
    <img src={secretHelp01} alt="Search for webhooks">

    <h2>Create the "endpoint"</h2>
    <p>Click on the button "+ Create and event destination". This will display a new page with many options</p>
    <img src={secretHelp02} alt="Create an endpoint">
    
    <p>At the top, leave it on "Add an endpoint"</p>
    <p>Set the endpoint URL to "https://api.inlet.shop/order/webhook/{userId}"</p>
    <p class="note">*If you are logged in, then you should see the correct URL. If not, then log in to see it, or <a href="#contact">contact us</a> for help.</p>
    <p>You can leave the description blank or put any description in it that you would like.</p>
    <p>Listen to: "Events on your account".</p>
    <p>Leave the version as it is.</p>
    <p>Click on the "+ Select events" button</p>
    <img src={secretHelp03} alt="Webhook settings">

    <h2>Selecting Events</h2>
    <p>On the page "Select events to send" search for "Payment Intent" and open the drop down. Then just choose "Select all Payment Intent events". Then click "Add events" at the bottom.</p>
    <img src={secretHelp04} alt="Add events">

    <p>Once, this is done, click "Add enpoint" at the bottom.</p>
    <p>The details of the webhook will now be displayed on the page. Find "Signing secret" and click "Reveal" just below it. This will show you the webhook secret (it should start with 'whsec'). Copy this and enter it on Inlet.Shop when prompted for the Webhook Secret.</p>
    <img src={secretHelp05} alt="Find the webhook secret">

    <p>After entering the API key and the webhook secret, you are all set to begin selling on Inlet.Shop!</p>

    <h2 id="contact">Contact Us</h2>
    <p>As always, if you have any issues or just want help setting things up. Feel free to get in touch with us and we can walk you through everything.</p>
    <ul>
        <li><a href="mailto:lee@inletsites.dev">lee@inletsites.dev</a></li>
        <li><a href="tel:+18434109586">(843) 410-9586</a></li>
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
