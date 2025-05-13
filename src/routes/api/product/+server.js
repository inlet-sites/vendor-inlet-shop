export const POST = async ({request, fetch, cookies})=>{
    const data = await request.formData();
    const response = await fetch(`${import.meta.env.VITE_API_URL}/product`, {
        method: "post",
        headers: {
            Authorization: `Bearer ${cookies.get("vendorToken")}`
        },
        body: data
    });
    return new Response(await response.text());
}

export const PUT = async ({request, fetch, cookies})=>{
    const data = await request.json();
    const response = await fetch(`${import.meta.env.VITE_API_URL}/product/${data.productId}`, {
        method: "put",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.get("vendorToken")}`
        },
        body: JSON.stringify({
            ...data,
            productId: undefined
        })
    });
    return new Response(await response.text());
}
