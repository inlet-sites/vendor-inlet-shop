<script>
    import "$lib/global.css";
    import logo from "$lib/logo.png";
</script>

<div class="container">
    <img src={logo} alt="Inlet Shop logo">

    <h1>404 Error</h1>

    <h2>The page you are looking for could not be found</h2>

    <div class="links">
        <a href="/">Return Home</a>
    </div>
</div>

<style>
    .container{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        padding: 15% 0;
        position: relative;
        height: 100vh;
        width: 100vw;
        color: rgb(225, 225, 225);
    }

    a{
        color: rgb(225, 225, 225);
    }

    img{
        position: absolute;
        top: 35px;
        left: 35px;
        height: 150px;
    }

    .links{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .links > *{
        margin: 5px;
    }
</style>
