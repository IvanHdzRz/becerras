const enviroment = require("./enviroment")

const saveProduct=async(product)=>{
    const {apiUrl,apiPort} = enviroment.domain
    const {products} = enviroment.apiEndPoints
    const res = await fetch(`${apiUrl}:${apiPort}/${products}`,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        body: JSON.stringify(product)
    })
    const data = await res.json();
    return data;
}

const getProductById=async(productId)=>{
    const {apiUrl,apiPort} = enviroment.domain
    const {products} = enviroment.apiEndPoints
    const res = await fetch(`${apiUrl}:${apiPort}/${products}/${productId}`)
    const data = await res.json();
    return data;
}

const editProduct=async(product)=>{
    const {apiUrl,apiPort} = enviroment.domain
    const {products} = enviroment.apiEndPoints
    const res = await fetch(`${apiUrl}:${apiPort}/${products}/${product.id}`,{
        method:'PUT',
        headers:{
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        body: JSON.stringify(product)
    })
    const data = await res.json();
    return data;
}

const deleteProduct = async(productId)=>{
    const {apiUrl,apiPort} = enviroment.domain
    const {products} = enviroment.apiEndPoints
    const res = await fetch(`${apiUrl}:${apiPort}/${products}/${productId}`,{
        method:'DELETE',
        headers:{
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        
    })
    const data =await  res.json();
    return data;
} 
module.exports.saveProduct = saveProduct;
module.exports.getProductById = getProductById;
module.exports.editProduct = editProduct;
module.exports.deleteProduct = deleteProduct;