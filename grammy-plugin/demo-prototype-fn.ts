import { Bot, Context, Api, Transformer } from 'grammy'
import type { RawApi } from 'grammy/out/core/client'

// 1. 扩展 Api 类型
type MyApi = Api & {
    TestFnTest(): Promise<string>
}

// 扩展 api 原型
;(Api.prototype as any).TestFnTest2 = async function (ctx): Promise<string> {
    console.log('传入上下文', ctx, 'CTX')
    console.log('通过 prototype 增加的方法')
    return '这是通过 prototype 增加的自定义 API 方法'
}

// 3. 初始化 bot
const bot = new Bot<Context, MyApi>(
    '7996507522:AAEtMBRvfLZbTQJxkyWmSuIJRoBtA0Tot2I'
)

// 5. 使用自定义 API 方法
bot.command('start', async ctx => {
    const res = await ctx.api.TestFnTest2(ctx)
    await ctx.reply(`你调用了 TestFnTest2: ${res}`)
})

bot.start()
