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