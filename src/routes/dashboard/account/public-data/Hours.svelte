<script>
    import {getContext} from "svelte";

    const vendor = getContext("vendor");
    const loader = getContext("loader");
    const notify = getContext("notify");
    let edit = $state(false);

    const time = (t)=>{
        const ts = t.split(":");
        if(ts[0] < 12){
            if(ts[0][0] === "0"){
                return `${t.substring(1)} AM`;
            }else{
                return `${t} AM`;
            }
        }else{
            return `${ts[0] - 12}:${ts[1]} PM`;
        }
    }

    const submit = ()=>{
        loader(true);

        fetch("/dashboard/account/public-data", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({hours: $vendor.publicData.hours})
        })
            .then(r=>r.json())
            .then((response)=>{
                if(response.error){
                    notify("error", response.error.message);
                }else{
                    vendor.set(response);
                    notify("success", "Business hours updated");
                }
            })
            .catch((err)=>{
                console.log(err);
                notify("error", "Something went wrong, try refreshing the page");
            })
            .finally(()=>{
                loader(false);
                edit = false;
            });
    }
</script>

<div class="Phone">
    <div class="head">
        <h3>Business Hours</h3>
        {#if edit}
            <button onclick={submit} aria-label="Submit">
                <svg width="32px" height="32px" stroke-width="2" viewBox="0 0 24 24" fill="none" color="currentColor">
                    <path d="M5 13L9 17L19 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </button>
        {:else}
            <button onclick={()=>{edit = true}} aria-label="Edit">
                <svg width="28px" height="28px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" color="currentColor">
                    <path d="M14.3632 5.65156L15.8431 4.17157C16.6242 3.39052 17.8905 3.39052 18.6716 4.17157L20.0858 5.58579C20.8668 6.36683 20.8668 7.63316 20.0858 8.41421L18.6058 9.8942M14.3632 5.65156L4.74749 15.2672C4.41542 15.5993 4.21079 16.0376 4.16947 16.5054L3.92738 19.2459C3.87261 19.8659 4.39148 20.3848 5.0115 20.33L7.75191 20.0879C8.21972 20.0466 8.65806 19.8419 8.99013 19.5099L18.6058 9.8942M14.3632 5.65156L18.6058 9.8942" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </button>
        {/if}
    </div>
    
    {#if $vendor}
        {#if edit}
            <form onsubmit={submit}>
                <table class="hoursInput">
                    <tbody>
                        <tr>
                            <td><p>Sunday:</p></td>
                            <td><input type="time" step="60" bind:value={$vendor.publicData.hours.sunday[0]}></td>
                            <td><p>to</p></td>
                            <td><input type="time" step="60" bind:value={$vendor.publicData.hours.sunday[1]}></td>
                        </tr>
                        <tr>
                            <td><p>Monday:</p></td>
                            <td><input type="time" step="60" bind:value={$vendor.publicData.hours.monday[0]}></td>
                            <td><p class="to">to</p></td>
                            <td><input type="time" step="60" bind:value={$vendor.publicData.hours.monday[1]}></td>
                        </tr>
                        <tr>
                            <td><p>Tuesday:</p></td>
                            <td><input type="time" step="60" bind:value={$vendor.publicData.hours.tuesday[0]}></td>
                            <td><p class="to">to</p></td>
                            <td><input type="time" step="60" bind:value={$vendor.publicData.hours.tuesday[1]}></td>
                        </tr>
                        <tr>
                            <td><p>Wednesday:</p></td>
                            <td><input type="time" step="60" bind:value={$vendor.publicData.hours.wednesday[0]}></td>
                            <td><p class="to">to</p></td>
                            <td><input type="time" step="60" bind:value={$vendor.publicData.hours.wednesday[1]}></td>
                        </tr>
                        <tr>
                            <td><p>Thursday:</p></td>
                            <td><input type="time" step="60" bind:value={$vendor.publicData.hours.thursday[0]}></td>
                            <td><p class="to">to</p></td>
                            <td><input type="time" step="60" bind:value={$vendor.publicData.hours.thursday[1]}></td>
                        </tr>
                        <tr>
                            <td><p>Friday:</p></td>
                            <td><input type="time" step="60" bind:value={$vendor.publicData.hours.friday[0]}></td>
                            <td><p class="to">to</p></td>
                            <td><input type="time" step="60" bind:value={$vendor.publicData.hours.friday[1]}></td>
                        </tr>
                        <tr>
                            <td><p>Saturday:</p></td>
                            <td><input type="time" step="60" bind:value={$vendor.publicData.hours.saturday[0]}></td>
                            <td><p class="to">to</p></td>
                            <td><input type="time" step="60" bind:value={$vendor.publicData.hours.saturday[1]}></td>
                        </tr>
                    </tbody>
                </table>
            </form>
        {:else}
            <table class="hoursDisplay">
                <tbody>
                    {#if $vendor.publicData.hours.sunday.length === 2}
                        <tr>
                            <td><p>Sunday:</p></td>
                            <td><p>{time($vendor.publicData.hours.sunday[0])}</p></td>
                            <td><p>to</p></td>
                            <td><p>{time($vendor.publicData.hours.sunday[1])}</p></td>
                        </tr>
                    {/if}
                    {#if $vendor.publicData.hours.monday.length === 2}
                        <tr>
                            <td><p>Monday:</p></td>
                            <td><p>{time($vendor.publicData.hours.monday[0])}</p></td>
                            <td><p>to</p></td>
                            <td><p>{time($vendor.publicData.hours.monday[1])}</p></td>
                        </tr>
                    {/if}
                    {#if $vendor.publicData.hours.tuesday.length === 2}
                        <tr>
                            <td><p>Tuesday:</p></td>
                            <td><p>{time($vendor.publicData.hours.tuesday[0])}</p></td>
                            <td><p>to</p></td>
                            <td><p>{time($vendor.publicData.hours.tuesday[1])}</p></td>
                        </tr>
                    {/if}
                    {#if $vendor.publicData.hours.wednesday.length === 2}
                        <tr>
                            <td><p>Wednesday:</p></td>
                            <td><p>{time($vendor.publicData.hours.wednesday[0])}</p></td>
                            <td><p>to</p></td>
                            <td><p>{time($vendor.publicData.hours.wednesday[1])}</p></td>
                        </tr>
                    {/if}
                    {#if $vendor.publicData.hours.thursday.length === 2}
                        <tr>
                            <td><p>Thursday:</p></td>
                            <td><p>{time($vendor.publicData.hours.thursday[0])}</p></td>
                            <td><p>to</p></td>
                            <td><p>{time($vendor.publicData.hours.thursday[1])}</p></td>
                        </tr>
                    {/if}
                    {#if $vendor.publicData.hours.friday.length === 2}
                        <tr>
                            <td><p>Friday:</p></td>
                            <td><p>{time($vendor.publicData.hours.friday[0])}</p></td>
                            <td><p>to</p></td>
                            <td><p>{time($vendor.publicData.hours.friday[1])}</p></td>
                        </tr>
                    {/if}
                    {#if $vendor.publicData.hours.saturday.length === 2}
                        <tr>
                            <td><p>Saturday:</p></td>
                            <td><p>{time($vendor.publicData.hours.saturday[0])}</p></td>
                            <td><p>to</p></td>
                            <td><p>{time($vendor.publicData.hours.saturday[1])}</p></td>
                        </tr>
                    {/if}
                </tbody>
            </table>
        {/if}
    {/if}
</div>

<style>
    .Phone{
        color: white;
        margin-bottom: 35px;
    }

    .head{
        display: flex;
        align-items: center;
        margin-bottom: 5px;
    }

    .head h3{
        text-decoration: underline;
    }

    form{
        display: flex;
        flex-direction: column;
    }

    button{
        background: none;
        border: none;
        color: red;
        cursor: pointer;
        margin-left: 15px;
    }

    table{
        max-width: 450px;
    }

    .to{
        margin-right: 10px;
    }

    .hoursDisplay{
        border-spacing: 25px 0;
    }

    input{
        font-size: 22px;
        padding-left: 10px;
    }

    @media screen and (max-width: 550px){
        .hoursInput{
            font-size: 14px;
            margin-left: -15px;
        }

        .hoursDisplay{
            border-spacing: 15px 0;
        }

        input{
            font-size: 14px;
        }
    }
</style>
