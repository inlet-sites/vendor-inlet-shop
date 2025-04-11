<script>
    let {product} = $props();
    const apiUrl = import.meta.env.VITE_API_URL;

    const imageLink = ()=>{
        if(product.images.length > 0){
            return `${apiUrl}/document/${product.images[0]}`;
        }

        for(let i = 0; i < product.variations.length; i++){
            if(product.variations[i].images.length > 0){
                return `${apiUrl}/document/${product.variations[i].images[0]}`;
            }
        }

        return undefined;
    }

    const convertPrice = (price)=>{
        return (price / 100).toFixed(2);
    }

    const getPrice = ()=>{
        if(product.variations.length === 1){
            return `$${(product.variations[0].price / 100).toFixed(2)}`;
        }

        let min = product.variations[0].price;
        let max = product.variations[0].price;
        for(let i = 0; i < product.variations.length; i++){
            if(product.variations[i].price < min) min = product.variations[i].price;
            if(product.variations[i].price > max) max = product.variations[i].price;
        }
        
        return `$${convertPrice(min)} - $${convertPrice(max)}`;
    }
</script>

<a href="/product/{product.id}" class="Product">
    <div class="imageContainer">
        <img src={imageLink()} alt={product.name}>
    </div>

    <div class="details">
        <h3>{product.name}</h3>
        <p>{getPrice()}</p>
    </div>
</a>

<style>
    .Product{
        display: flex;
        align-items: center;
        height: 100px;
        color: white;
        border: 1px solid rgba(255, 0, 0, 0.35);
        margin: 15px 0;
        cursor: pointer;
        text-decoration: none;
    }

    .imageContainer{
        display: flex;
        justify-content: center;
        height: 100%;
        width: 200px;
    }

    img{
        max-height: 100%;
        max-width: 100%;
    }

    .details{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 100%;
    }
</style>
