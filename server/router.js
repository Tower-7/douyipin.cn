const Router = require('koa-router')
const Common = require('./Controllers/common')
const Pc = require('./Controllers/pc')
const Move = require('./Controllers/move')
const Admin = require('./Controllers/admin')
const Qiniu = require('./Controllers/qiniu')
const Product = require('./Controllers/Admin/product')
const News = require('./Controllers/Admin/news')
const router = new Router()

module.exports = (app) => {
	router.post('/sign_up',Common.sign_up)//注册
	router.post('/sign_in',Common.sign_in)//登录
	router.get('/logout',Common.logout)
	router.post('/upload',Common.upload)//上传
	router.get('/m/addArticle',Move.signRequired,Common.addArticle) //编辑文章
	router.get('/m/addArticleContent',Move.signRequired,Common.addArticleContent) //编辑文章详情
	router.get('/m/addArticle/:id',Move.signRequired,Move.viewUpdateArticle) //预览文章
	router.get('/m/addArticleContent/:id',Move.signRequired,Move.viewArticleContent) //预览文章详情
	router.post('/m/saveArticle',Move.signRequired,Common.saveArticle) //上传文章
	// router.post('/m/removeContentPic',Move.signRequired,Common.removeContentPic) //删除图片
	router.post('/m/article/del',Move.signRequired,Common.delArticle) //删除文章
	
    router.get('/',Pc.index)//pc主页
    router.get('/news',Pc.news)//新闻页
    router.get('/news/:id',Pc.newsDetail)//新闻详情页
    router.get('/business',Pc.business)//商业合作
    router.get('/join',Pc.join)//关于我们
    router.get('/about',Pc.about)//关于我们


    //移动端路由
    router.get('/m',Move.index) //移动主页
	router.get('/m/sign',Move.sign) //登陆注册
	router.get('/m/addEssay',Move.signRequired,Move.addEssay) //编辑碎片
	router.post('/m/submitEssay',Move.signRequired,Move.submitEssay) //上传碎片
	router.get('/m/detailRead/:id',Move.detailRead) //文章详情
	router.get('/m/profile',Move.signRequired,Move.profile) //个人主页
	router.get('/m/myWrite/:name',Move.signRequired,Move.myWrite) //个人文章列表
	router.get('/m/myArticle/:name',Move.signRequired,Move.myArticle) //个人文章列表
	router.post('/m/essay/del',Move.signRequired,Move.delEssay) //删除碎片
	router.post('/m/qiniu',Move.signRequired,Qiniu.upload)


	
	//admin
	router.get('/admin/sign',Admin.sign) //登陆注册
	router.get('/admin',Admin.signRequired,Admin.index)
	router.post('/admin/updateLogo',Admin.signRequired,Admin.updateLogo)//updateLogo
	router.post('/admin/updatBanner',Admin.signRequired,Admin.updatBanner)//updateLogo
	router.post('/admin/updateProductType',Admin.signRequired,Admin.updateProductType)//updateProductType
	router.post('/admin/updateAbout',Admin.signRequired,Admin.updateAbout)//updateAbout
	router.post('/admin/updateScope',Admin.signRequired,Admin.updateScope)//updateScope
	router.post('/admin/updateService',Admin.signRequired,Admin.updateService)//updateService
	router.post('/admin/delProductType',Admin.signRequired,Admin.delProductType) //delProductType
	router.post('/admin/delService',Admin.signRequired,Admin.delService) //delService

	router.get('/admin/product',Admin.signRequired,Product.index)
	router.post('/admin/updateProduct',Admin.signRequired,Product.updateProduct)//updateProductType
	router.get('/admin/news',Admin.signRequired,News.index)
	router.post('/admin/addNews',Admin.signRequired,News.addNews)
	router.get('/getNews/:id',News.getNews)
	router.post('/admin/delById',Admin.signRequired,Product.delById)

	

	// router.post('/m/removeContentPic',Move.signRequired,Common.removeContentPic) //删除图片

    // router.post('/m/article/del',Move.signRequired,Common.delArticle) //删除文章
    
    app.use(router.routes()).use(router.allowedMethods())
}
