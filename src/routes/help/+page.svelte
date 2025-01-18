<script>
    import "../../global.css";
</script>

<div class="container">
    <h1>Help and Support</h1>

    <a href="/help/stripe-token" class="helpItem">
        <h2>Creating your Stripe API key/token</h2>
        <p>Learn how to create and use your Stripe API key for accepting payments on Inlet.Shop</p>
        <div class="rightArrow">
            <svg width="46px" height="46px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" color="#000000">
                <path d="M13 6L19 12L13 18" stroke="#590010" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M5 6L11 12L5 18" stroke="#590010" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
        </div>
    </a>

    <p>If none of these answer your questions, feel free to call or email us.</p>

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

    .helpItem{
        display: block;
        border: 3px solid rgba(255, 0, 0, 0.35);
        padding: 15px;
        max-width: 750px;
        border-radius: 0 50px 50px 0;
        color: var(--text);
        text-decoration: none;
        margin: 25px 0;
        position: relative;
        padding-right: 55px;
    }

    .helpItem h2{
        margin-bottom: 15px;
    }

    .rightArrow{
        position: absolute;
        top: calc(50% - 23px);
        right: 15px;
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
</style>
