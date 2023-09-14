const fs = require('fs');
const {data: products } = require('./products.json')
const { faker } = require('@faker-js/faker'); 
const writeFileHelper = require('../helpers/writeFileHelper');
const { LIMIT, ORDER_BY, SORT_TYPE } = require('../const/index')

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
    const updateProductData = [data, ...products];
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

const getALl = (option) => {
    let returnProduct = products
    if (!option.limit) option.limit = LIMIT;
    if(!option.sortType) option.sortType = SORT_TYPE;
    if (!option.orderBy) option.orderBy = ORDER_BY;
  
    if(option.sortType = 'ASC') {
        if (option.orderBy === 'id')  returnProduct.sort((curr,next) => curr.id - next.id);
        if (option.orderBy === 'price')  returnProduct.sort((curr,next) => parseInt(curr.price) - parseInt(next.price));
        if (option.orderBy === 'createdAt') returnProduct.sort((curr, next) => new Date(curr.createdAt) - new Date(next.createdAt))
        returnProduct.sort((curr, next) => curr[option.orderBy] - next[option.orderBy])
    } 
    if (option.sortType === 'DESC') {
        if (option.orderBy === 'id')  returnProduct.sort((curr,next) => next.id - curr.id);
        if (option.orderBy === 'price')  returnProduct.sort((curr,next) => parseInt(next.price) - parseInt(curr.price));
        if (option.orderBy === 'createdAt') returnProduct.sort((curr, next) => new Date(next.createdAt) - new Date(curr.createdAt))
        returnProduct.sort((curr, next) => next[option.orderBy] - curr[option.orderBy])
    }
    return returnProduct.slice(0,parseInt(option.limit))  
}

module.exports = {
    initData,
    getALl,
    getById,
    updateById,
    deletById,
    create
}