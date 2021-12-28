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