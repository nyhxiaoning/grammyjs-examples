import { Api, Bot, Context } from 'grammy'

/**
 * 扩展 Api 类型，实现更加优雅
 * 注意：
 * 1. 必须在 bot 实例化之前扩展
 * 2. 扩展的方法必须是异步方法
 *
 */
declare module 'grammy' {
    interface Api {
        TestFnTest(): Promise<string>
    }
}

Api.prototype.TestFnTest = async function () {
    return '✅ prototype 新增方法成功TestFnTest'
}

type MyContext = Context

const bot = new Bot<MyContext>('7996507522:AAEtMBRvfLZbTQJxkyWmSuIJRoBtA0Tot2I')

bot.command('test', async ctx => {
    const result = await ctx.api.TestFnTest()
    await ctx.reply(result)
})

bot.start()
