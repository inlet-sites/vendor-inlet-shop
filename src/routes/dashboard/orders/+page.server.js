export const load = async ({fetch, cookies})=>{
    try{
        let orders = await fetch(`${import.meta.env.VITE_API_URL}/order?status=paid`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${cookies.get("vendorToken")}`
            }
        });
        orders = await orders.json();
        
        if(orders.error) return {error: orders.error.message};

        return {orders};
    }catch(e){
        return {error: "Something went wrong, try refreshing the page"};
    }
}
