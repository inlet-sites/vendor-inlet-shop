export async function PUT({request, fetch, cookies}){
    const data = await request.formData();
    const response = await fetch(`${import.meta.VITE_API_URL}/vendor`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.get("vendorToken")}`
        },
        body: JSON.stringify({newOrderSendEmail: data.get("newOrderSendEmail")})
    });
    return await response.json();
}
