"use strict"
const fs = require("fs");
const ProductUtils = require("./product");
const Product = ProductUtils.Product;
const ShoppingCart = require("./shopping_cart");
const path = require("path")
const utils = require("../utils")

const ProductArray = require("./productArray");

const prodFile = path.join(__dirname, "./../data/products.json")

const jsonStr = fs.readFileSync(prodFile);
const rawProds = JSON.parse(jsonStr);
const products = new ProductArray();
rawProds.forEach(element => {
  products.createProduct(Product.createFromJson(JSON.stringify(element)));
});
function getProducts() {
  return products.getProducts();
}
function getProductById(id) {
  let gotcha = (products.getProductById(id.trim()));
  console.log(JSON.stringify(gotcha));
  return gotcha;
}
function deleteProduct(uuid) {
  return products.deleteProduct(uuid);
}
function createProduct(prod) {
  let toPUSH = Product.createFromObject(prod);
  products.createProduct(toPUSH);
  return 1;
}
function updateProduct(uuid, product) {
  products.updateProduct(uuid, Product.createFromObject(product));
}
module.exports = { getProducts, getProductById, updateProduct, createProduct };
/*module.getProducts = getProducts;
module.getProductById = products.getProductById;
module.createProduct = createProduct;
module.ProductArray = ProductArray;
*/
