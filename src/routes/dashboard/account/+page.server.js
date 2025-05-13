export const actions = {
    changePassword: async ({request, fetch, cookies})=>{
        const data = await request.formData();
        const url = `${import.meta.env.VITE_API_URL}/vendor/${data.vendorId}/password`;
        let response = await fetch(url, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${cookies.get("vendorToken")}`
            },
            body: JSON.stringify({
                password: data.get("password"),
                confirm: data.get("confirmPassword")
            })
        });
        return await response.json();
    },

    orderEmail: async ({request, fetch, cookies})=>{
        const data = await request.formData();
        let response = await fetch(`${import.meta.env.VITE_API_URL}/vendor`, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${cookies.get("vendorToken")}`
            },
            body: JSON.stringify({newOrderSendEmail: data.get("newOrderSendEmail")})
        });
        return await response.json();
    }
}
