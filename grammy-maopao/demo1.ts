import {
    Bot,
    Keyboard,
    InlineKeyboard,
    Context,
    Composer,
    BotError,
    GrammyError,
    InputFile,
    Transformer,
    session,
    Api,
    ApiCallFn,
    SessionFlavor,
    InlineQueryResultBuilder,
} from 'grammy'

import type { RawApi } from 'grammy/out/core/client'

// 引入中间件
import { onlyAccept } from './plugin.js'

// import { MyApiFlavor } from './my-plugin.ts'

// TODO:未来实现思路：拓展自定义的封装方法，但是外面看起来和grammyjs一样：
// *********扩展自定义 API 方法:方法1
// 获取单聊中：当前设备的方法
// bot.api.getDevices = async function (chat_id: number) {
//     return await this.sendMessage(
//         chat_id,
//         'Hello from custom API method===>getDevices!'
//     )
// }

// *********扩展自定义 API 方法:方法2:不成功
// 使用 transformer 扩展 API
// bot.api.config.use((prev, method, payload, signal) => {
//     // 拦截特定方法名
//     if (method === 'getDevices') {
//         const chat_id = payload['chat_id']
//         return prev(
//             'sendMessage',
//             { chat_id, text: 'Hello from transformer!>getDevices' },
//             signal
//         )
//     } else if (method === 'sendSingleDevice') {
//         const chat_id = payload['chat_id']
//         return prev(
//             'sendMessage',
//             { chat_id, text: 'Hello from transformer!>sendSingleDevice' },
//             signal
//         )
//     }
//     // 其他方法正常转发
//     return prev(method, payload, signal)
// })

// // 类型提示兼容
// declare module '@grammyjs/types' {
//     interface Telegram {
//         sendHelloMessage: {
//             chat_id: number
//         }
//     }
// }

// 使用插件扩展 API
// 注册自定义 API 方法
// bot.api.config.use({
//     async sendHelloMessage(chat_id) {
//         return this.callApi('sendMessage', {
//             chat_id,
//             text: '👋 Hello from custom API method!',
//         })
//     },
// })

// 1. 定义 API 类型扩展
type MyApi = Api & {
    TestFnTest: () => Promise<string>
}
// 2. Transformer：实际实现
const testFnTransformer: Transformer<RawApi> = (
    prev,
    method,
    payload,
    signal
) => {
    if (method === 'TestFnTest') {
        console.log('调用 TestFnTest')
        return Promise.resolve({
            ok: true,
            result: 'TestFnTest Result',
        })
    }
    return prev(method, payload, signal)
}

// 实例化bot时机？？？？？？TODO:扩展 API 类型
// type MyApi = Api & MyApiFlavor
const bot = new Bot<Context, MyApi>(
    '7996507522:AAEtMBRvfLZbTQJxkyWmSuIJRoBtA0Tot2I'
)
// 4. 安装 Transformer
bot.api.config.use(testFnTransformer)

// todo:如何拓展当前的api方法：拓展公司内部的方法：111?

// 注册命令
await bot.api.setMyCommands([
    { command: 'start', description: '最简单的命令11111' },
    { command: 'echo', description: 'echo22222' },
    { command: 'roll', description: '拼手气3333' },
    { command: 'turnon', description: '打开设备4444444' },
    { command: 'turnoff', description: '关闭设备5555' },
    { command: 'test', description: '测试自定义方法6666' },
    { command: 'ttest', description: '测试自定义方法77777' },
])

// 5. 使用自定义 API 方法
bot.command('ttest', async ctx => {
    console.log(ctx)
    console.log(ctx.api.raw, 'ctx.api.raw')
    console.log(ctx.api.raw, 'ctx.api.raw')
})
// 调用命令：注意：修改了注册命令，需要退出当前的bot，再次进入
bot.command('start', ctx => ctx.reply('Hello Bot!'))
bot.command('echo', ctx => ctx.reply('This is a echo command.'))
bot.command('turnon', async ctx => {
    // 调用自定义 API 方法
    ctx.reply('打开设备2222')
})

bot.command('turnoff', ctx => ctx.reply('关闭设备'))

// // 获取单聊中：发送给设备消息的方法
bot.api.sendSingleDevice = async function (chat_id: number) {
    return await this.sendMessage(
        chat_id,
        'Hello from custom API method!===>sendSingleDevice'
    )
}

// 5. 在任意地方调用
bot.command('test', async ctx => {
    console.log(ctx)
    console.log(ctx.api.raw, 'ctx.api.raw')
    console.log(ctx.api.raw, 'ctx.api.raw')
    const result = await ctx.api.TestFnTest()
    await ctx.reply(`API 自定义方法返回callApi：${result}`)
})

// TODO:靠后注册中间件:保证下走完命令触发后，再去中间件。
// 中间件的位置在命令返回以后，所以可以保证命令返回后，再去中间件。
// 注册中间件：
bot.use(onlyAccept('grammY'))

// 监听消息命令
bot.on('message', async ctx => {
    console.log('message监听中')
    let chat_id: any
    chat_id = ctx.chat.id
    const text: any = ctx.msg.text
    await bot.api.sendMessage(chat_id, text, {
        reply_parameters: { message_id: ctx.msg.message_id },
    })
})
// 监听错误
bot.catch(err => console.error(err))

// 启动 Bot（长轮询）
bot.start()
