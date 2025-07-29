import { Bot, Context, Api } from 'grammy'
// 引入中间件
import { onlyAccept, onlyBeforeAccept } from './plugin.ts'

/**
 * 扩展 Api 类型，实现更加优雅：
 * 注意：
 * 1. 必须在 bot 实例化之前扩展
 * 2. 扩展的方法必须是异步方法
 * @param {Api} Api
 * @return {void}
 * */
class PixelMugP1 extends Api {
    // 地址：http://10.30.10.14:4999/web/?#/162/1563
    // 如何做一个bin，这里写死

    /**
     * 推送文字到 PixelMug
     * @param ctx
     * @returns
     */
    async postPushText(data: any) {
        let result = await fetch('http://pixelmug.jeejio.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: data.text || 'Hello PixelMug',
                speed: 100,
                direction: 0,
                fontContent: {
                    url: 'textBinUrl.bin',
                    size: 12,
                    type: 'application/bin', //  buf
                },
            }),
        })
        if (!result.ok) {
            throw new Error('Failed to post push text')
        }

        return '✅ PixelMug 发送文字！'
    }

    // http://10.30.10.14:4999/web/?#/162/1573
    /**
     * 当前的水杯信息
     * @param ctx
     * @returns
     */
    async getInfo(data: any) {
        // /devices/{deviceId}/setting

        let result = await fetch(
            `http://pixelmug.jeejio.com/${data.deviceId}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
        if (!result.ok) {
            throw new Error('Failed to get device info')
        }
        let data1 = await result.json()
        console.log(data, 'PixelMug getInfo data')
        return '✅ getInfo 水杯基本信息！'
    }

    /**
     * 获取冒泡设备列表
     * @returns
     */
    async onReceive(params: any) {
        console.log(params, 'onReceive params')
    }
}

class PixelMugG1 extends Api {
    // 地址：http://10.30.10.14:4999/web/?#/162/1563
    // 如何做一个bin，这里写死

    /**
     * 推送文字到 PixelMug
     * @param ctx
     * @returns
     */
    async postPushText(data: any) {
        let result = await fetch('http://pixelmug.jeejio.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: data.text || 'Hello PixelMug',
                speed: 100,
                direction: 0,
                fontContent: {
                    url: 'textBinUrl.bin',
                    size: 12,
                    type: 'application/bin', //  buf
                },
            }),
        })
        if (!result.ok) {
            throw new Error('Failed to post push text')
        }

        return '✅ PixelMug 发送文字！'
    }

    // http://10.30.10.14:4999/web/?#/162/1573
    /**
     * 当前的水杯信息
     * @param ctx
     * @returns
     */
    async getInfo(data: any) {
        // /devices/{deviceId}/setting

        let result = await fetch(
            `http://pixelmug.jeejio.com/${data.deviceId}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
        if (!result.ok) {
            throw new Error('Failed to get device info')
        }
        let data1 = await result.json()
        console.log(data, 'PixelMug getInfo data')
        return '✅ getInfo 水杯基本信息！'
    }
}

type MyContext = Context & { api: PixelMug }

const bot = new Bot<MyContext>(
    '7996507522:AAEtMBRvfLZbTQJxkyWmSuIJRoBtA0Tot2I',
    { client: new PixelMug('7996507522:AAEtMBRvfLZbTQJxkyWmSuIJRoBtA0Tot2I') }
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
    ctx.api = new PixelMugP1('7996507522:AAEtMBRvfLZbTQJxkyWmSuIJRoBtA0Tot2I')
    await next()
})

// 注册中间件：最上面挂中间件：保证可以接收到所有的消息前，先打印日志
// 这样会导致：消息处理完后，不会走了，每一个消息消费一次，除非你再次触发
bot.use(onlyBeforeAccept('grammY'))

// 调用方法test333
bot.command('test', async ctx => {
    // 发送
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
 * 发送冒泡水杯： postPushText 消息
 * 调用方法 postPushText
 */
bot.command('postPushText', async ctx => {
    // if(品类)
    // 调用 水杯：自定义 API 方法
    const result = await ctx.api.PixelMugP2.postPushText(ctx)
    // TODO:计划：发送信息给Telegram
    // await ctx.reply('发送信息给Telegram')
    await ctx.reply(result)
})

/**
 *
 */

/**
 * 获取水杯信息
 * 调用方法 getInfo
 */
bot.command('getInfo', async ctx => {
    // 调用 水杯信息获取：自定义 API 方法
    const result = await ctx.api.getInfo(ctx)
    // TODO:计划：发送信息给Telegram
    // await ctx.reply('发送信息给Telegram')
    await ctx.reply(result)
})

// 注册中间件：最下面挂中间件：保证可以接收到所有的消息后，最后打印日志
bot.use(onlyAccept('grammY'))

bot.on('message', async ctx => {
    ctx.device.

})

bot.start()
