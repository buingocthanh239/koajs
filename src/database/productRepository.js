const fs = require('fs');
const {data: products } = require('./products.json')
const { faker } = require('@faker-js/faker'); 
const writeFileHelper = require('../helpers/writeFileHelper');
const { DEFAULT_LIMIT, DEFAULT_SORT } = require('../const/index')

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
    return writeFileHelper(data);
}

const create =  (data) => {
    const newProduct = {
        id: faker.number.int(),
        ...data
    }
    const updateProductData = [newProduct, ...products];
    return writeFileHelper(updateProductData);
}

const getById = (id) => {
    return products.find(product => product.id === parseInt(id))
}

const updateById = (id, updateData) => {
    const newProducts = products.filter(product => product.id !== parseInt(id));
    newProducts.push(updateData)
    return writeFileHelper(newProducts);
}

const deletById = (id) => {
    const newProducts = products.filter(product => product.id !== parseInt(id))
    return writeFileHelper(newProducts);
}


// get all products with logic 
const pickFiels = (product, fields) => {
    if(!fields) return product;
    const arrFields = fields.split(',');
    const productWithFields = {}
    arrFields.forEach(field => {
        productWithFields[field] = product[field]
    }) 
    return productWithFields;
}

const orderProductsByDate = (products, sort) => {
    if(sort === 'DESC') return products.sort((curr, next) => new Date(next.createdAt) - new Date (curr.createdAt))
    return products.sort((curr, next) => new Date(curr.createdAt) - new Date (next.createdAt))
}

const getALl = ({limit = DEFAULT_LIMIT, sort = DEFAULT_SORT, fields}) => {
    let productData = [...products];
    if (sort) {
        orderProductsByDate(productData, sort)
    }
    if (limit) {
        productData = productData.slice(0, parseInt(limit))
    }
    return productData.map(product => pickFiels(product, fields))
}

module.exports = {
    initData,
    getALl,
    getById,
    updateById,
    deletById,
    create
}