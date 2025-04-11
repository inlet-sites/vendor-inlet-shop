<script>
    import ImageUpload from "./ImageUpload.svelte";
    import Phone from "./Phone.svelte";
    import Email from "./Email.svelte";
    import Address from "./Address.svelte";
    import Slogan from "./Slogan.svelte";
    import Description from "./Description.svelte";
    import Hours from "./Hours.svelte";
    import Links from "./Links.svelte";
</script>

<svelte:head>
    <title>Account | Vendor.Inlet.Shop</title>
</svelte:head>

<div class="PublicData">
    <ImageUpload/>
    <Phone/>
    <Email/>
    <Address/>
    <Slogan/>
    <Description/>
    <Hours/>
    <Links/>
</div>

<style>
    .PublicData{
        color: white;
    }
</style>
