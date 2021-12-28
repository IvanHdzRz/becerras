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
    const data = res.json();
    return data;
}



module.exports.saveProduct = saveProduct;