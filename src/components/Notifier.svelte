<script>
    let {type, message} = $props();

    $effect(()=>{
        if(type){
            setTimeout(()=>{
                type = "";
            }, 7500);
        }
    })
</script>

{#if type === "error"}
    <div class="notifier {type}">
        <svg width="35px" height="35px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="#000000">
            <path d="M19.1414 5C17.3265 3.14864 14.7974 2 12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19M19.1414 5C20.9097 6.80375 22 9.27455 22 12C22 17.5228 17.5228 22 12 22C9.20261 22 6.67349 20.8514 4.85857 19M19.1414 5L4.85857 19" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
        <p>{message}</p>
    </div>
{:else if type === "success"}
    <div class="notifier {type}">
        <svg width="35px" height="35px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="#000000">
            <path d="M7 12.5L10 15.5L17 8.5" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
        <p>{message}</p>
    </div>
{/if}

<style>
    .notifier{
        display: flex;
        align-items: center;
        position: fixed;
        bottom: 15px;
        right: 15px;
        height: 75px;
        z-index: 100;
        padding: 0 35px 0 15px;
    }

    .notifier svg{
        margin-right: 35px;
    }

    .error{
        background: rgba(249, 114, 114, 0.75);
        color: rgb(200, 200, 200);
        font-weight: bold;
    }

    .success{
        background: rgba(10, 237, 2, 0.5);
        font-weight: bold;
    }
</style>
