<script>
    let {product, displayProduct} = $props();

    const formatPrice = (price)=>{
        return `$${(price / 100).toFixed(2)}`;
    }

    const price = ()=>{
        if(product.variations.length === 1) return formatPrice(product.variations[0].price);
        let max = product.variations[0].price;
        let min = product.variations[0].price;
        for(let i = 1; i < product.variations.length; i++){
            if(product.variations[i].price > max) max = product.variations[i].price;
            if(product.variations[i].price < min) min = product.variations[i].price;
        }
        return `${formatPrice(min)} - ${formatPrice(max)}`;
    }
</script>

<button class="Product" onclick={()=>{displayProduct(product.id)}}>
    <div class="imageContainer">
        <img
            src="{import.meta.env.VITE_API_URL}/document/{product.images[0]}"
            alt={product.name}
            loading="lazy"
        >
    </div>

    <div class="textContent">
        <p class="title">{product.name}</p>
        <p class="price">{price()}</p>
    </div>
</button>

<style>
    .Product{
        display: flex;
        align-items: center;
        height: 100px;
        width: 100%;
        max-width: 1000px;
        margin: 15px 0;
        color: white;
        border: 1px solid rgba(254, 2, 35, 0.15);
        background: none;
        cursor: pointer;
    }

    .imageContainer{
        display: flex;
        align-items: center;
        height: 100%;
        width: 150px;
    }

    img{
        max-height: 100%;
        max-width: 100%;
    }

    .textContent{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: flex-start;
        flex-grow: 0;
        height: 100%;
        width: calc(100% - 150px);
        padding: 5px;
    }

    .title{
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 15px;
    }

    .price{
        font-size: 14px;
    }

    @media screen and (max-width: 600px){
        .Product{
            height: initial;
        }

        .title{
            font-size: 14px;
        }

        .price{
            font-size: 12px;
        }
    }
</style>
