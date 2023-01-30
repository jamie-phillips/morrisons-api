const fetch = require("node-fetch");
const fs = require("fs");

//https://groceries.morrisons.com/webshop/api/v1/products/479274011/details
let baseURL = "https://groceries.morrisons.com";
let apiURL = `${baseURL}/webshop/api/v1`;

async function product(sku) {
  let url = `${apiURL}/products/${sku}/details`;
  let response = await fetch(url);
  let json = await response.json();
  return json;
}

async function search(searchTerm) {
  let url = `${apiURL}/search?hideOOS=true&searchTerm=${searchTerm}`;
  let response = await fetch(url);
  let json = await response.json();
  console.log(json.mainFopCollection.sections[0].fops);
  return json;
}

//https://groceries.morrisons.com/productImages/114/114306011_0_640x640.jpg?identifier=a3cd9b1161010dc4738e3d0a8f821847
async function image(sku, hash) {
  let url = `${baseURL}/productImages/${sku.slice(0, 3)}/${sku}_0_100x100.jpg?identifier=${hash}`;
  let response = await fetch(url);
  let blob = await response.blob();
  console.log(blob);
  let arrayBuffer = await blob.arrayBuffer();
  let imageBuffer = Buffer.from(arrayBuffer);
  let imageName = "./image.jpeg";

  fs.createWriteStream(imageName).write(imageBuffer);
}

async function imageHash(sku) {
  let response = await product(sku);
  let hash = response.product.image.hash;
  return hash;
}

module.exports = { product, search, image, imageHash };
