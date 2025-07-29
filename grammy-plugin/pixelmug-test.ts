import { Bot, Context, Api } from 'grammy'
// 引入中间件
import { onlyAccept, onlyBeforeAccept } from './plugin.ts'

let tempToken = '01k1aghr4cqatby951a1454cx9'

/**
 * 扩展 Api 类型，实现更加优雅：
 * 注意：
 * 1. 必须在 bot 实例化之前扩展
 * 2. 扩展的方法必须是异步方法
 * @param {Api} Api
 * @return {void}
 * */
class PixelMug extends Api {
    // 地址：http://10.30.10.14:4999/web/?#/162/1563
    // 如何做一个bin，这里写死

    /**
     * 推送图片到 PixelMug
     * @param ctx
     * @returns
     */
    async Push(data: any) {
        var raw = JSON.stringify(data)
        var myHeaders = new Headers()
        // TODO:必须设置请求头信息内容json格式和token
        myHeaders.append('Content-Type', 'application/json')
        myHeaders.append('token', tempToken)
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        }
        // let result = await fetch('http://pixelmug.jeejio.com/pixelarts/push',requestOptions)
        // if (!result.ok) {
        //     throw new Error('Failed to post push text')
        // }

        let data1 = await fetch(
            'http://pixelmug.jeejio.com/pixelarts/push',
            requestOptions
        )
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error))

        return `${data1?.result || '✅ PixelMug 发送图片！'}`
    }

    // http://10.30.10.14:4999/web/?#/162/1573
    /**
     * 获取当前的水杯信息
     * @param ctx
     * @returns
     */
    async getUser() {
        // /devices/{deviceId}/setting

        let result = await fetch(`http://pixelmug.jeejio.com/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                token: tempToken,
            },
        })
        if (!result.ok) {
            throw new Error('Failed to get device info')
        }
        let data1 = await result.json()
        console.log(data1, 'PixelMug getInfo data')
        return `水杯所在位置是:${data1?.result?.cityName}`
    }

    /**
     * 获取冒泡设备列表
     * @returns
     */
    async onReceive(params: any) {
        console.log(params, 'onReceive params')
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
            command: 'setcupgif',
            description: 'setcupgif',
        },
        { command: 'getcupinfo', description: 'echo-getCupInfo' },
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
    ctx.api = new PixelMug('7996507522:AAEtMBRvfLZbTQJxkyWmSuIJRoBtA0Tot2I')
    await next()
})

// TODO:请求前：注册中间件：最上面挂中间件：保证可以接收到所有的消息前，先打印日志
// 这样会导致：消息处理完后，不会走了，每一个消息消费一次，除非你再次触发
bot.use(onlyBeforeAccept('grammY'))

/**
 * 给水杯设置一张图片
 * 调用方法 setcupgif
 */
bot.command('setcupgif', async ctx => {
    // JSON 数据
    const requestData = {
        fileUrl:
            'https://storage.qajeejio.com/im/artifact/gif/01JQX5ZRCCD53VGJ4F7312M5B6/jeejio.gif',
        fileSize: '10470',
        type: 'STILL',
        deviceIdList: ['11ZKCBTTUX0MBS000063'],
    }
    const result = await ctx.api.Push(requestData)
    await ctx.reply(result)
})

/**
 * 获取用户的信息
 * 调用方法 getcupinfo
 */
bot.command('getcupinfo', async ctx => {
    const result = await ctx.api.getUser()
    console.log(result, 'getCupInfo result')
    await ctx.reply(result)
})

// TODO:请求后：增加返回值信息的挂载处理逻辑：
// 注册中间件：最下面挂中间件：保证可以接收到所有的消息后，最后打印日志
bot.use(onlyAccept('grammY'))

bot.on('message', async ctx => {
    console.log(ctx.message.text, 'ctx.message.text')
})

bot.start()
