<script>
    import "../../global.css";
    import HelpItem from "./HelpItem.svelte";

    const helpItems = [
        {
            title: "Creating your Stripe API key",
            text: "Learn how to create and use your Stripe API key for accepting payments on Inlet.shop",
            url: "/help/stripe-token"
        },
        {
            title: "Finding your Stripe Publishable key",
            text: "Find the publishable key that you need to share with Inlet.Shop in order to recieve payments",
            url: "/help/publishable-key"
        },
        {
            title: "Creating the webhook secret",
            text: "How to create the webhook secret for accepting payments on Inlet.Shop",
            url: "/help/webhook-secret"
        },
        {
            title: "Setting up your Account",
            text: "First steps for setting up your account and getting ready to create your first items",
            url: "/help/setup-account"
        },
        {
            title: "Creating Products to Sell or List",
            text: "How to create your products and the different options that you can choose for each product",
            url: "/help/create-product"
        }
    ];
</script>

<div class="container">
    <h1>Help and Support</h1>

    {#each helpItems as item}
        <HelpItem
            title={item.title}
            text={item.text}
            url={item.url}
        />
    {/each}

    <h2 class="rumbleLink">You can find a list of instructional videos <a href="https://rumble.com/user/InletSites">here</a>.</h2>

    <p>If none of these answer your questions, feel free to call or email us:</p>

    <div class="contact">
        <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="#000000">
            <path d="M7 9L12 12.5L17 9" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M2 17V7C2 5.89543 2.89543 5 4 5H20C21.1046 5 22 5.89543 22 7V17C22 18.1046 21.1046 19 20 19H4C2.89543 19 2 18.1046 2 17Z" stroke="#ffffff" stroke-width="1.5"></path>
        </svg>
        <a href="mailto:lee@inletsites.dev">lee@inletsites.dev</a>
    </div>

    <div class="contact">
        <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="#000000">
            <path d="M18.1182 14.702L14 15.5C11.2183 14.1038 9.5 12.5 8.5 10L9.26995 5.8699L7.81452 2L4.0636 2C2.93605 2 2.04814 2.93178 2.21654 4.04668C2.63695 6.83 3.87653 11.8765 7.5 15.5C11.3052 19.3052 16.7857 20.9564 19.802 21.6127C20.9668 21.8662 22 20.9575 22 19.7655L22 16.1812L18.1182 14.702Z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
        <a href="tel:+18434109586">(843) 410-9586</a>
    </div>
</div>

<style>
    .container{
        max-width: 1200px;
        margin: 35px auto;
        color: var(--text);
    }

    .contact{
        display: flex;
        align-items: center;
        margin: 15px;
    }

    .contact a{
        color: white;
        margin-left: 15px;
    }

    .rumbleLink{
        margin-bottom: 35px;
    }

    @media screen and (max-width: 750px){
        h1{
            text-align: center;
        }
    }
</style>
