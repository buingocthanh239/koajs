const fs = require('fs');
const {data: products } = require('./products.json')
const { faker } = require('@faker-js/faker')

const createFakeData = () => ({
    id: faker.number.int(),
    name: faker.person.fullName(),
    price: faker.commerce.price(),
    description: faker.commerce.productDescription(),
    product: faker.commerce.productName(),
    color: faker.color.human(),
    createdAt: faker.date.anytime(),
    image: faker.image.url()
})

const initData = () => {
    const data = []
    for(let i = 0; i < 100; i++ ) {
        data.push(createFakeData())
    }
    return fs.writeFileSync('./src/database/products.json', JSON.stringify({
        data: data
      }));
}

const create =  (data) => {
    const updateProductData = [data, ...products];
    return fs.writeFileSync('./src/database/products.json', JSON.stringify({
        data: updateProductData
      }));
}

const getById = (id) => {
    return products.find(product => product.id === parseInt(id))
}

const updateById = (id, updateData) => {
    const newProducts = products.filter(product => product.id !== parseInt(id));
    newProducts.push(updateData)
    return fs.writeFileSync('./src/database/products.json', JSON.stringify({
        data: newProducts
      })); 
}

const deletById = (id) => {
    const newProducts = products.filter(product => product.id !== parseInt(id))
    return fs.writeFileSync('./src/database/products.json', JSON.stringify({
        data: newProducts
      })); 
}

const getALl = (option) => {
    let returnProduct = products
    if(option.limit) {
        returnProduct =  products.slice(0,parseInt(option.limit))  
    }  
    if (option.orderBy) {
        if (option.orderBy === 'id') return returnProduct.sort((curr,next) => curr.id - next.id);
        if (option.orderBy === 'price') return returnProduct.sort((curr,next) => parseInt(curr.price) - parseInt(next.price));
        return returnProduct.sort((curr, next) => curr[option.orderBy] - next[option.orderBy])
    }
    return returnProduct
}

module.exports = {
    initData,
    getALl,
    getById,
    updateById,
    deletById,
    create
}