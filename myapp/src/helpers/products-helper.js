const path = require('path');
const fs = require('fs');


const productsHelper = {

generateId: () =>{
    const allProductsData = productsHelper.getAllProducts();
    return allProductsData.pop().id +1;
},
getAllProducts: () =>{
    const productsData = path.join('./src/data/products-data.json');
    return JSON.parse(fs.readFileSync(productsData, 'utf-8'));
},
writeProductsData: (productsToSave) => {

    const productsToStringify = JSON.stringify(productsToSave, null, ' ');
    return fs.writeFileSync('./src/data/products-data.json', productsToStringify);

},
}

module.exports = productsHelper;