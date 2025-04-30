import {redirect} from "@sveltejs/kit";

export const load = async ({fetch, cookies})=>{
    const vendorToken = cookies.get("vendorToken");
    if(!vendorToken) redirect(302, "/login");

    try{
        let vendor = await fetch(`${import.meta.env.VITE_API_URL}/vendor/self`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${vendorToken}`
            }
        });
        vendor = await vendor.json();

        if(vendor.error){
            cookies.delete("vendorToken", {path: "/"});
            redirect(302, "/login");
        }

        return {vendor};
    }catch(e){
        redirect(302, "/");
    }
}
