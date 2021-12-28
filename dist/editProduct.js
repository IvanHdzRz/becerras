(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
class Product{
    name=""
    price=0
    description=""
    sku=""
    id=0
    constructor({name,price,description,sku,id=0}){
        this.name = name
        this.price = price
        this.description = description
        this.sku = sku
        this.id=id
    }
}

module.exports = Product;
},{}],2:[function(require,module,exports){
const ProductModel = require("./ProductModel")
const productRepository = require("./productRepository");
//load html values
const saveButton = document.getElementById("saveProduct");
const deleteButton = document.getElementById("deleteProduct");
const productTitle = document.getElementById("productTitle")
const name = document.getElementById("productName")
const sku = document.getElementById("productSKU")
const description = document.getElementById("productDescription")
const price = document.getElementById("productPrice")
const formEditProduct = document.getElementById("formEditProduct");
const loader = document.getElementById("loaderSpinner");
//getting uri params
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')
//initialize page info
formEditProduct.style.display="none";
productTitle.innerText="Product Id: "+id;
initializeForm(id);

saveButton.addEventListener('click',async(e)=>{
    //prevents reload the page
    e.preventDefault();
    try{
        console.log('saving....')
        const productToSave = new ProductModel({
            name:name.value,
            price:price.value,
            description:description.value,
            sku:sku.value,
            id:id
        });
        await productRepository.editProduct(productToSave);
        console.log("saved....")
        alert("producto guardado")
    }catch(e){
        alert("ha ocurrido un problema");
        console.log(e);
    }
    
})

deleteButton.addEventListener('click',async()=>{
    try{
        console.log('...borrando')
        await productRepository.deleteProduct(id);
        window.location="/products.html"
        console.log('borrado')
    }catch(e){
        console.log(e)
        alert('ha ocurrido un error')
    }
})

async function initializeForm(productId){
    try{
        console.log('cargando')
        const productData =await productRepository.getProductById(productId)
        name.value= productData.name
        sku.value = productData.sku
        description.value = productData.description
        price.value = productData.price
        formEditProduct.style.display="block"
        loader.style.display="none"
        console.log('listo')
    }catch(e){
        alert("ha ocurrido un error")
        loader.innerText="ha ocurrido un error"
        console.log(e);
    }
    
}




},{"./ProductModel":1,"./productRepository":4}],3:[function(require,module,exports){
const domain ={
    apiUrl:"http://localhost",
    apiPort:"3000"
}

const apiEndPoints={
    products:"products",
    rates:""
}

module.exports.domain = domain;
module.exports.apiEndPoints = apiEndPoints;
},{}],4:[function(require,module,exports){
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
const getAllProducts=async()=>{
    const {apiUrl,apiPort} = enviroment.domain
    const {products} = enviroment.apiEndPoints
    const res = await fetch(`${apiUrl}:${apiPort}/${products}`)
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
module.exports.getAllProducts= getAllProducts;
},{"./enviroment":3}]},{},[2]);
