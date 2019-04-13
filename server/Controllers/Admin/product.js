const Logo = require('../../Models/Admin/logo')
const Product = require('../../Models/Admin/product')
const ProductType = require('../../Models/Admin/productType')

module.exports = {
    index: async ctx => {
        let logos = await Logo.findAll()
        let products = await Product.findAll()
        let productTypes = await ProductType.findAll()
        await ctx.render('admin/product',{
            logos: logos,
            products: products,
            productTypes: productTypes,
        })
    },
    updateProduct:async ctx => {
        let product = ctx.request.body
        let _product = product.data
        if(product.id!=''){
        _product = {$set: _product}
            await Product.updateById(Product,product.id,_product)
            return ctx.body = {'msg':'更新成功','status':'1'}
        }
        else {
            _product = new Product(_product)
            await _product.save()
            return ctx.body = {'msg':'发布成功','status':'1'}
        }
    },
    delById: async ctx => {
        let product = ctx.request.body
        await Product.deletById(Product,product.id)
        return ctx.body = {'msg':'删除成功','status':'1'}
    },
}
