export const load = async ({cookies})=>{
    return {
        vt: cookies.get("vendorToken")
    };
}
