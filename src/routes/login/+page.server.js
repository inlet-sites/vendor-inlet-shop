import {redirect} from "@sveltejs/kit";

export const load = async ({cookies})=>{
    const vendorToken = cookies.get("vendorToken");
    if(cookies.get("vendorToken")) throw redirect(302, "/dashboard/account");
}

export const actions = {
    login: async ({request, cookies, fetch, url})=>{
        const data = await request.formData();
        const email = data.get("email");
        const password = data.get("password");

        let response = await fetch(`${import.meta.env.VITE_API_URL}/vendor/token`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        response = await response.json();

        if(response.error){
            return {error: response.error};
        }else{
            cookies.set("vendorToken", response.token, {
                httpOnly: true,
                secure: url.protocol === "https",
                sameSite: "strict",
                path: "/"
            });

            throw redirect(303, "/dashboard/account");
        }
    }
}
