(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){

// headers must be a string array
//rows must be a object array
function createTable({headers,rows}){
    const table= document.createElement("table");
    const tableHeadersContainer = document.createElement("thead");
    const tableBody = document.createElement("tbody")
    headers.forEach(header => {
        const tableHeader = document.createElement("th")
        tableHeader.innerText=header;
        tableHeadersContainer.appendChild(tableHeader);
    });

    rows.forEach(row=>{
        const rowData = Object.values(row);
        const tableRow = document.createElement("tr")
        
        rowData.forEach(item=>{
           const tableData = document.createElement("td")
           tableData.innerHTML=item
           tableRow.appendChild(tableData)
        })
        tableBody.appendChild(tableRow);
    })
    table.appendChild(tableHeadersContainer)
    table.appendChild(tableBody)
    return table;
}

module.exports.createTable = createTable;
},{}],3:[function(require,module,exports){
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
},{"./enviroment":1}],4:[function(require,module,exports){
const productRepository = require('./productRepository');
const helpers = require('./helpers')
const tableContainer = document.getElementById("productTableWrapper");

let products=[];
initilizePage();

async function initilizePage(){
    console.log('cargfando')
    const data = await productRepository.getAllProducts();
    const formatedData = data.map((product)=>{
        return {
            id: product.id,
            Nombre: product.name,
            Precio: product.price,
            SKU: product.sku,
            Descripcion:product.description,
            Editar: `<a href="./editproduct.html?id=${product.id}"> Edit </a>`
        }
    })
    console.log(Object.keys(data))
    const table = helpers.createTable({headers:Object.keys(formatedData[0]),rows:formatedData});    
    

    tableContainer.appendChild(table);
    
    console.log('ya cargo')
    products=data;
}





},{"./helpers":2,"./productRepository":3}]},{},[4]);
