export const load = async ({params, fetch, cookies})=>{
    console.log(cookies.get("vendorToken"));
    let product = await fetch(`${import.meta.env.VITE_API_URL}/product/${params.productId}`, {
        method: "get",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.get("vendorToken")}`
        }
    });
    product = await product.json();

    return {product};
}
