export const PUT = async ({request, fetch, cookies})=>{
    console.log("wtf");
    const data = await request.json();
    console.log(data);
    let response = await fetch(`${import.meta.env.VITE_API_URL}/vendor`, {
        method: "put",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.get("vendorToken")}`
        },
        body: JSON.stringify(data)
    });
    return new Response(await response.text());
}
