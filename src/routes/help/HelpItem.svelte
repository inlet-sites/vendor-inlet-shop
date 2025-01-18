<script>
    const {title, text, url} = $props();
</script>

<a class="HelpItem" href="{url}">
    <h2>{title}</h2>
    <p>{text}</p>

    <div class="rightArrow">
        <svg width="46px" height="46px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" color="#000000">
            <path d="M13 6L19 12L13 18" stroke="#590010" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M5 6L11 12L5 18" stroke="#590010" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    </div>
</a>

<style>
    .HelpItem{
        display: block;
        border: 3px solid rgba(255, 0, 0, 0.35);
        padding: 15px;
        max-width: 750px;
        border-radius: 0 50px 50px 0;
        color: var(--text);
        text-decoration: none;
        margin: 25px 0;
        position: relative;
        padding-right: 65px;
    }

    h2{
        margin-bottom: 15px;
    }

    .rightArrow{
        position: absolute;
        top: calc(50% - 23px);
        right: 15px;
    }
</style>
