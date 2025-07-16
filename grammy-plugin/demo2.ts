import { Bot, Context, Api, Transformer } from 'grammy'
import type { RawApi } from 'grammy/out/core/client'

// 1. 扩展 Api 类型
type MyApi = Api & {
    TestFnTest(): Promise<string>
    TestFnTest2(): Promise<string>
}

// 扩展 api 原型
;(Api.prototype as any).TestFnTest2 = async function (): Promise<string> {
    console.log('通过 prototype 增加的方法')
    return '这是通过 prototype 增加的自定义 API 方法'
}

class MyNewApi extends Api {
    async TestFnHello(): Promise<string> {
        console.log('MyApi 子类自定义方法调用')
        return '自定义 API TestFnHello'
    }
}

// 2. Transformer：实际实现
const testFnTransformer: Transformer<RawApi> = (
    prev,
    method,
    payload,
    signal
) => {
    if (method === 'TestFnHello') {
        console.log('调用 TestFnHello')
        return Promise.resolve({
            ok: true,
            result: 'TestFnHello Result',
        })
    }
    return prev(method, payload, signal)
}

// 3. 初始化 bot
const bot = new Bot<Context, MyApi>(
    '7996507522:AAEtMBRvfLZbTQJxkyWmSuIJRoBtA0Tot2I',
    {
        client: new MyNewApi('7996507522:AAEtMBRvfLZbTQJxkyWmSuIJRoBtA0Tot2I'),
    }
)

// 4. 安装 Transformer
// bot.api.config.use(testFnTransformer)

// 5. 使用自定义 API 方法
bot.command('start', async ctx => {
    const res = await ctx.api.TestFnTest2()
    await ctx.reply(`你调用了 TestFnTest2: ${res}`)

    try {
        const res2 = await ctx.api.TestFnHello()
        await ctx.reply(`你调用了 TestFnHello: ${res2}`)
    } catch (err) {
        console.error(err)
    }
})

bot.start()
