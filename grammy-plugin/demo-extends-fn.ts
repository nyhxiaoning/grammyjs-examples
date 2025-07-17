import { Bot, Context, Api } from 'grammy'
// 引入中间件
import { onlyAccept, onlyBeforeAccept } from './plugin.ts'

class MyApi extends Api {
    async TestFnTest(ctx: any) {
        return '✅ MyApi 调用成功！'
    }

    async getMaoPaoDevices(ctx: any) {
        return '✅ getMaoPaoDevices 调用成功！'
    }

    async sendMaopaoMessage(ctx: any) {
        return '✅ sendMaopaoMessage 调用成功！'
    }

    async onReceiveSingleDevice(ctx: any) {
        return '✅ onReceiveSingleDevice 实时监听设备上报信息成功！'
    }
}

type MyContext = Context & { api: MyApi }

const bot = new Bot<MyContext>(
    '7996507522:AAEtMBRvfLZbTQJxkyWmSuIJRoBtA0Tot2I',
    { client: new MyApi('7996507522:AAEtMBRvfLZbTQJxkyWmSuIJRoBtA0Tot2I') }
)

/**
 * 注册系列的bot方法汇总
 */
// 注册命令
;(async () => {
    await bot.api.setMyCommands([
        {
            command: 'getMaoPaoDevices',
            description: '最简单的命令1111getMaoPaoDevices',
        },
        { command: 'sendMaopaoMessage', description: 'echo-sendMaopaoMessage' },
        {
            command: 'onReceiveSingleDevice',
            description: '拼手气onReceiveSingleDevice',
        },
    ])
})()

/**
 * 扩展 Api 类型，实现更加优雅
 * 中间件实现
 * 注意：
 * 1. 必须在 bot 实例化之前扩展
 * 2. 扩展的方法必须是异步方法
 */
bot.use(async (ctx, next) => {
    // 手动替换 ctx.api
    // 必须一步：❗️ 注意：你需要 middleware 手动挂载 ctx.api。
    // 否则，你将无法调用 ctx.api.TestFnTest() 方法。
    // 因为 ctx.api 是在 bot 实例化时自动挂载的。
    // 你可以在 bot 实例化时传入一个 client 参数，来手动挂载 ctx.api。
    // 或者，你可以在 middleware 中手动挂载 ctx.api。
    ctx.api = new MyApi('7996507522:AAEtMBRvfLZbTQJxkyWmSuIJRoBtA0Tot2I')
    await next()
})

// 注册中间件：最上面挂中间件：保证可以接收到所有的消息前，先打印日志
// 这样会导致：消息处理完后，不会走了，每一个消息消费一次，除非你再次触发
bot.use(onlyBeforeAccept('grammY'))

// 调用方法test333
bot.command('test', async ctx => {
    const result = await ctx.api.TestFnTest()
    await ctx.reply(result)
})

/**
 * 获取当前的冒泡设备列表
 * 调用方法getMaoPaoDevices
 */
bot.command('getMaoPaoDevices', async ctx => {
    const result = await ctx.api.getMaoPaoDevices()
    await ctx.reply(result)
})

/**
 * 发送冒泡消息
 * 调用方法sendMaopaoMessage
 */
bot.command('sendMaopaoMessage', async ctx => {
    const result = await ctx.api.sendMaopaoMessage()
    await ctx.reply(result)
})

/**
 * 监听单个设备上报信息
 * 调用方法onReceiveSingleDevice
 */
bot.command('onReceiveSingleDevice', async ctx => {
    const result = await ctx.api.onReceiveSingleDevice()
    await ctx.reply(result)
})

// 注册中间件：最下面挂中间件：保证可以接收到所有的消息后，最后打印日志
bot.use(onlyAccept('grammY'))

bot.start()
