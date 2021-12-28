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




