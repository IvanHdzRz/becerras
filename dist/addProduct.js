(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
class Product{
    name=""
    price=0
    description=""
    sku=""
    constructor({name,price,description,sku}){
        this.name = name
        this.price = price
        this.description = description
        this.sku = sku
    }
}

module.exports = Product;
},{}],2:[function(require,module,exports){
const ProductModel = require("./ProductModel")
const productRepository = require("./productRepository");

const saveButton = document.getElementById("saveProduct");
const name = document.getElementById("productName")
const sku = document.getElementById("productSKU")
const description = document.getElementById("productDescription")
const price = document.getElementById("productPrice")

saveButton.addEventListener('click',async(e)=>{
    //prevents reload the page
    e.preventDefault();
    try{
        console.log('saving....')
        const productToSave = new ProductModel({
            name:name.value,
            price:price.value,
            description:description.value,
            sku:sku.value
        });
        await productRepository.saveProduct(productToSave);
        console.log("saved....")
        resetForm();
        alert("producto guardado")
    }catch(e){
        alert("ha ocurrido un problema");
        console.log(e);
    }
    
})

function resetForm(){
    name.value=""
    price.value=""
    description.value=""
    sku.value=""
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
    const data = res.json();
    return data;
}



module.exports.saveProduct = saveProduct;
},{"./enviroment":3}]},{},[2]);
