const Logo = require('../Models/Admin/logo')
const Products = require('../Models/Admin/product')
const ProductType = require('../Models/Admin/productType')
const About = require('../Models/Admin/about')
const Banner = require('../Models/Admin/banner')
const News = require('../Models/Admin/news')
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
        let number = 4
        let newes = await News.findFourList(News,number)
        await ctx.render('pc/index',{
            logos: logos,
            banners: banners,
            productTypes: productTypes,
            abouts: abouts,
            scopes: scopes,
            services: services,
            newes: newes,
        })
    },
    news: async ctx => {
        let logos = await Logo.findAll()
        let newes = await News.findAll()
        await ctx.render('pc/news',{
            logos: logos,
            newes: newes,
        })
    },
    newsDetail: async ctx => {
        let logos = await Logo.findAll()
        let id = ctx.params.id
        let news = await News.findById(News,id)
        await ctx.render('pc/newsDetail',{
            logos: logos,
            news:news,
        })
    },
    business: async ctx => {
        let logos = await Logo.findAll()
        let products = await Products.findAll()
        await ctx.render('pc/business',
        {
            logos: logos,
            products:products,
        }
        )
    },
    join: async ctx => {
        await ctx.render('pc/join',{layout:false})
    },
    about: async ctx => {
        await ctx.render('pc/about',{layout:false})
    }
}