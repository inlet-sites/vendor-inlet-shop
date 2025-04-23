import {redirect} from "@sveltejs/kit";

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

        cookies.set("vendorToken", response.token, {
            httpOnly: true,
            secure: url.protocol === "https",
            sameSite: "strict",
            path: "/"
        });

        throw redirect(303, "/dashboard/account");
    }
}
