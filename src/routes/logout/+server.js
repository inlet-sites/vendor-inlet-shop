import {redirect} from "@sveltejs/kit";

export function GET({cookies}){
    cookies.delete("vendorToken", {path: "/"});

    throw redirect(302, "/");
}
