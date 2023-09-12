const productRepository = require('../../database/productRepository'); 

const initDataProduct = async (ctx) => {
    try {
       const products = productRepository.initData();
       ctx.body = {
        data: products
       }
    } catch (e) {
        ctx.status = 500;
        ctx.body = {
            success: false,
            data: [],
            error: e.message
          };
    }
}

const createProductById = async (ctx) => {
    try {
        const newProdut = ctx.request.body;
        productRepository.create(newProdut);
        ctx.status = 201;
        ctx.body = {
            success: true
        }
    } catch (e) {
        ctx.status = 500;
        ctx.body = {
            success: false,
            data: [],
            error: e.message
        }
    }
}

const updateProductById = async (ctx) => {
    try {
        const updateProductData = ctx.request.body;
        const {id} = ctx.params
        productRepository.updateById(id, updateProductData);
        ctx.status = 200;
        ctx.body = {
            success: true
        }
    } catch (e) {
        ctx.status = 500; 
        ctx.body = {
            success: false,
            data: [],
            error: e.message
        }
    }
}

const deleteProductById = (ctx) => {
    try {
        const {id} = ctx.params
        productRepository.deletById(id)
        ctx.status = 200;
        ctx.body = {
            success: true
        }
    } catch (e) {
        ctx.status = 500; 
        ctx.body = {
            success: false,
            data: [],
            error: e.message
        }
    }
}

const getProductById = async (ctx) => {
    try { 
        const {id} = ctx.params;
        const products = [productRepository.getById(id)];
        if (!products) {
            throw new Error(`Product ${id} not found`)
        } 
        await  await ctx.render('product', { products })
    } catch (e) {
        ctx.status = 404; 
        ctx.body = {
            success: false,
            data: [],
            error: e.message
        }
    }
}

const getAllProduct = async (ctx) => {
   try {
        const {limit, orderBy, sortType } = ctx.query;
        const products = productRepository.getALl({ limit, orderBy, sortType})
        await ctx.render('product', { products })
   }  catch (e) {
        ctx.status = 404; 
        ctx.body = {
            success: false,
            data: [],
            error: e.message
        }
    }

}

module.exports = {
    initDataProduct,
    createProductById,
    updateProductById,
    deleteProductById,
    getAllProduct,
    getProductById
}