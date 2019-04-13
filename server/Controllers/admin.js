const Logo = require('../Models/Admin/logo')
const Product = require('../Models/Admin/product')
const ProductType = require('../Models/Admin/productType')
const About = require('../Models/Admin/about')
const Banner = require('../Models/Admin/banner')
const Scope = require('../Models/Admin/scope')
const Service = require('../Models/Admin/service')
module.exports = {
    index: async ctx => {
        let logos = await Logo.findAll()
        let banners = await Banner.findAll()
        let productTypes = await ProductType.findAll()
        let abouts = await About.findAll()
        let scopes = await Scope.findAll()
        let services = await Service.findAll()
        await ctx.render('admin/index',{
            logos: logos,
            banners: banners,
            productTypes: productTypes,
            abouts: abouts,
            scopes: scopes,
            services: services,
        })
    },
    //更新
    updateLogo:async ctx => { await update(ctx,Logo) },
    updatBanner:async ctx => { await update(ctx,Banner) },
    updateProductType:async ctx => { await update(ctx,ProductType) },
    updateAbout:async ctx => { await update(ctx,About) },
    updateScope:async ctx => { await update(ctx,Scope) },
    updateService:async ctx => { await update(ctx,Service) },
    //登陆注册页面
    sign: async ctx => {
        await ctx.render('admin/sign')
    },
    //验证登陆中间件
    signRequired: async(ctx,next) => {
        let user = ctx.session.user
        let url = ctx.request.originalUrl
        if(!user){
            return ctx.redirect('/admin/sign?' + url)
        }
        await next()
    },
    delProductType: async ctx => {await del(ctx,ProductType)},
    delService: async ctx => {await del(ctx,Service)},
}

//更新
let update = async(ctx,db)=> {
    let data = ctx.request.body
    let _data = data.data
    if(data.id!=''){
        _data = {$set: _data}
        await db.updateById(db,data.id,_data)
        return ctx.body = {'msg':'更新成功','status':'1'}
    }
    else {
        _data = new db(_data)
        await _data.save()
        return ctx.body = {'msg':'发布成功','status':'1'}
    }
}

//删除
let del = async(ctx,db)=> {
    let del = ctx.request.body
    if(del.id){
        await db.deletById(db,del.id)
        return ctx.body = {'msg':'删除成功','status':'1'}
    }
    else {
        return ctx.body = {'msg':'删除错误','status':'1'}
    }
}