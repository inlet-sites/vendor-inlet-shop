export const POST = async ({request, fetch, cookies})=>{
    const data = await request.formData();
    const response = await fetch(`${import.meta.env.VITE_API_URL}/variation`, {
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
    const url = `${import.meta.env.VITE_API_URL}/product/${data.productId}/variation/${data.variationId}`;
    const response = await fetch(url, {
        method: "put",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.get("vendorToken")}`
        },
        body: JSON.stringify({
            ...data,
            productId: undefined,
            variationId: undefined
        })
    });
    return new Response(await response.text());
}
