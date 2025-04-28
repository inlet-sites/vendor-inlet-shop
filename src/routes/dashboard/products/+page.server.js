export const load = async ({fetch, cookies})=>{
    let products = await fetch(`${import.meta.env.VITE_API_URL}/product/vendor`, {
        method: "get",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.get("vendorToken")}`
        }
    });
    products = await products.json();

    return {products};
}
