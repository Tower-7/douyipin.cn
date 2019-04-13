const Logo = require('../../Models/Admin/logo')
const News = require('../../Models/Admin/news')

module.exports = {
    index: async ctx => {
        let logos = await Logo.findAll()
        let newes = await News.findAll()
        await ctx.render('admin/news',{
            logos: logos,
            newes: newes,
        })
    },
    addNews:async ctx => {
        let news = ctx.request.body
        let _news = news.data
        if(news.id!=''){
        _news = {$set: _news}
            await News.updateById(News,news.id,_news)
            return ctx.body = {'msg':'更新成功','status':'1'}
        }
        else {
            _news = new News(_news)
            await _news.save()
            return ctx.body = {'msg':'发布成功','status':'1'}
        }
    },
    
    getNews:async ctx => {
        let id = ctx.params.id
        let news = await News.findById(News,id)
        return ctx.body = {'news': news}
    },
    delById: async ctx => {
        let news = ctx.request.body
        await News.deletById(News,news.id)
        return ctx.body = {'msg':'删除成功','status':'1'}
    },
}
