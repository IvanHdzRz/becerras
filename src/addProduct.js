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



