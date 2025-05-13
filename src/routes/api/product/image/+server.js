export const PUT = async ({request, fetch, cookies})=>{
    const data = await request.formData();
    const response = await fetch(data.get("url"), {
        method: "put",
        headers: {
            Authorization: `Bearer ${cookies.get("vendorToken")}`
        },
        body: data
    });
    return new Response(await response.text());
}

export const PATCH = async ({request, fetch, cookies})=>{
    const data = await request.json();
    const response = await fetch(data.url, {
        method: "put",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.get("vendorToken")}`
        },
        body: JSON.stringify({
            ...data,
            url: undefined
        })
    });
    return new Response(await response.text());
}
