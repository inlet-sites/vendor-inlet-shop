export const load = async ({params, fetch, cookies})=>{
    let order = await fetch(`${import.meta.env.VITE_API_URL}/order/${params.orderId}/vendor`, {
        method: "get",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.get("vendorToken")}`
        }
    });
    order = await order.json();

    return {order};
}

export const actions = {
    update: async ({request, cookies, fetch})=>{
        const data = await request.formData();
        let order = await fetch(`${import.meta.env.VITE_API_URL}/order/${data.get("id")}`, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${cookies.get("vendorToken")}`
            },
            body: JSON.stringify({status: data.get("status")})
        });
        order = await order.json();

        return {order};
    },

    decline: async ({request, cookies, fetch})=>{
        const data = await request.formData();
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.get("vendorToken")}`
        };
        const refundProm = fetch(`${import.meta.env.VITE_API_URL}/order/${data.get("id")}/refund`, {
            method: "post",
            headers: headers
        });
        const orderProm = fetch(`${import.meta.env.VITE_API_URL}/order/${id}`, {
            method: "put",
            headers: headers,
            body: JSON.stringify({
                status: "declined",
                note: data.get("declineNote")
            })
        });

        const response = await Promise.all([refundProm, orderProm]);
        return {order: await response[1].json()};
    }
}
