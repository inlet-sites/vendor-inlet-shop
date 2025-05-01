export const PUT = async ({request, fetch, cookies})=>{
    const data = await request.json();
    let response = await fetch(`${import.meta.env.VITE_API_URL}/vendor`, {
        method: "put",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.get("vendorToken")}`
        },
        body: JSON.stringify(data)
    });
    response = await response.json();
    return response;
}
