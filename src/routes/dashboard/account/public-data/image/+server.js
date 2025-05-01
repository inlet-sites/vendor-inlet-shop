import {json} from "@sveltejs/kit";

export const PUT = async ({request, fetch, cookies})=>{
    const formData = await request.formData();
    let response = await fetch(`${import.meta.env.VITE_API_URL}/vendor/image`, {
        method: "put",
        headers: {
            Authorization: `Bearer ${cookies.get("vendorToken")}`
        },
        body: formData
    });
    response = await response.json();
    return json(response);
}
