export const load = async ({fetch, cookies})=>{
    let orders = await fetch(`${import.meta.env.VITE_API_URL}/order?status=paid`, {
        method: "get",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.get("vendorToken")}`
        }
    });
    orders = await orders.json();

    return {orders};
}

export const actions = {
    search: async({request, cookies, fetch})=>{
        const data = await request.formData();
        let orders = await fetch(craftUrl(data), {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${cookies.get("vendorToken")}`
            }
        });
        orders = await orders.json();

        return {orders};
    }
}


const craftUrl = (data)=>{
    const searchFrom = data.get("searchFrom");
    const searchTo = data.get("searchTo");

    let url = `${import.meta.env.VITE_API_URL}/order?`;
    if(searchFrom) url += `from=${searchFrom}&`;
    if(searchTo) url += `to=${searchTo}&`;

    let status = "";
    if(data.get("incomplete")) status += ",incomplete";
    if(data.get("paid")) status += ",paid";
    if(data.get("paymentFailed")) status += ",paymentFailed";
    if(data.get("declined")) status += ",declined";
    if(data.get("confirmed")) status += ",confirmed";
    if(data.get("shipped")) status += ",shipped";
    if(status.length > 1){
        status = status.slice(1);
        url += `status=${status}`
    }

    return url;
}
