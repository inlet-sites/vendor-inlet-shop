export const load = ({params})=>{
    console.log(params.vendorId);
    console.log(params.token);
    return {
        vendorId: params.vendorId,
        token: params.token
    };
}
