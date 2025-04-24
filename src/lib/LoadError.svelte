<script>
    let {code, message} = $props();
    let codeMessage = "";
    switch(code){
        case 400: codeMessage = "Bad Request"; break;
        case 401: codeMessage = "Unauthorized"; break;
        case 403: codeMessage = "Forbidden"; break;
        case 500: codeMessage = "Internal Server Error"; break;
    }
</script>

<div class="LoadError">
    {#if code}
        <h1>Error {code}</h1>
    {/if}
    <h2>{codeMessage}</h2>
    <h3>{message}</h3>

    <div class="buttonBox">
        <a href="/dashboard/account">My Account</a>
        <a href="/">Home</a>
    </div>
</div>

<style>
    .LoadError{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
        height: 100%;
        width: 100%;
    }

    .LoadError > *{
        margin: 5px 0;
    }

    .buttonBox{
        display: flex;
        justify-content: space-around;
        width: 50%;
        margin-top: 35px;
    }

    .buttonBox > *{
        color: white;
        font-size: 20px;
    }
</style>
