module.exports = {
    index: async ctx => {
        await ctx.render('pc/index',{layout:false})
    },
    news: async ctx => {
        await ctx.render('pc/news',{layout:false})
    },
    business: async ctx => {
        await ctx.render('pc/business',{layout:false})
    },
    join: async ctx => {
        await ctx.render('pc/join',{layout:false})
    },
    about: async ctx => {
        await ctx.render('pc/about',{layout:false})
    }
}