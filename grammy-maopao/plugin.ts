// plugin.ts
// 从 grammY 中导入类型（我们在 `deps.deno.ts` 中重新导出了它们）。
// 你的插件可以有一个创建中间件的主函数。

// TODO:封装当前的TAL通道消息：
// im的消息通道可以实时监听：当前的设备的消息：中间件开始的时候绑定：
// tal的消息，也可以实时监听：当前的设备的消息：中间件之后绑定：

// 1. 定义 API 类型扩展：实时接收im的绑定消息：
// 每一个消息，都会导致走一遍bot的流程内容：
// TODO:待办：：：：到时候，这里消息太多，需要用一个队列管理
// TODO:管理消息的异步队列整理
// TODO:现在的问题，设备4次tal后，这个设备就挂了。重启。设备烧录之后，需要断电，抽线，再上电。
// TODO:如何单独实现一套消息处理逻辑：，抛离这个当前的grammyjs的逻辑,是否仅仅封装api
// 全部实现grammyjs的东西，太重了，但是如果仅仅实现消息协议层处理。其实单独实现。

// 临时全局im和mqtt的消息接收变量
let tempImReceiveMessage = null,
    tempTalReceiveMessage = null

let MAOPAO_QA_API = 'https://cloudgateway.qajeejio.com/im'
let tempBotToken = 'sdfsdfsdfsdfdsfdsfd'

// 1.首先创建一个Mappao对象用于事件监听管理
const Mappao = {
    // 存储事件监听器的对象
    listeners: {},

    // 注册事件监听的方法
    on(eventName, callback) {
        if (!this.listeners[eventName]) {
            this.listeners[eventName] = []
        }
        this.listeners[eventName].push(callback)
    },

    // 触发事件的方法
    emit(eventName, data) {
        if (this.listeners[eventName]) {
            this.listeners[eventName].forEach(callback => {
                callback(data)
            })
        }
    },
}

// 改进消息接收函数，使其能实时监听并触发事件
async function startListeningToMessages() {
    // 定期检查新消息的函数
    async function checkForNewMessages() {
        try {
            const response = await fetch(
                `${MAOPAO_QA_API}/bot/updates?token=${tempBotToken}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )

            if (!response.ok) {
                throw new Error('Failed to get im message')
            }

            const data = await response.json()
            console.log('Received new messages:', data)

            // 当获取到消息时，触发message事件
            Mappao.emit('message', data)
        } catch (error) {
            console.error('Error fetching im message:', error)
            // 出错时也可以触发事件传递错误信息
            Mappao.emit('message', { error: error?.message })
        }

        // 继续监听（这里设置1秒轮询一次，可根据需要调整）
        setTimeout(checkForNewMessages, 1000)
    }

    // 开始第一次检查
    checkForNewMessages()
}

// 使用示例：注册message事件监听
Mappao.on('message', (msg: object) => {
    console.log('Received message through Mappao:', msg)
    // 这里可以处理收到的消息
})

// 启动消息监听
startListeningToMessages()

async function imReceiveMessage() {
    // 实时获取当前的im消息，通过get接口
    fetch(`${MAOPAO_QA_API}/bot/updates?token=${tempBotToken}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to get im message')
            }
            return response.json()
        })
        .then(data => {
            console.log(data, 'imReceiveMessage data')
            return data
        })
        .catch(error => {
            console.error('Error fetching im message:', error)
            return 'Error fetching im message'
        })
}

async function talReceiveMessage() {
    // 创建并返回一个转换器函数。
    console.log('封装调用talReceiveMessage方法')
    return '封装调用talReceiveMessage方法'
}

/**
 * 第一件事情：拓展中间件：默认初始化会加上，看自己的实现位置
 * 第二件事情：通过API增加当前的bot上自定义api：
 * https://grammy.dev/zh/advanced/transformers，这里增加了API后：这里
 * TODO:Transformer 函数可以被安装在 bot.api 中。 这是一个没有做任何事情的 transformer 函数的例子：
 * @param str
 * @returns
 */
export function onlyAccept(str: string) {
    // 引入参数说明
    console.log(str, 'onlyAccept str')
    // 创建并返回一个中间件。
    return async (ctx: any, next: any) => {
        ctx.tempImReceiveMessage = tempImReceiveMessage
        ctx.tempTalReceiveMessage = tempTalReceiveMessage
        // 获取用户的名字。
        const name = ctx.from?.first_name
        // 增加当前的设备的上报：
        // 如果发现是打开设备命令：

        // 最外层内容
        console.log(ctx.api, JSON.stringify(ctx.api), 'ctx.api')
        // 最外层内容
        console.log(ctx.me, JSON.stringify(ctx.me), 'ctx.me')
        console.log(
            ctx.message.text,
            JSON.stringify(ctx.message.text),
            'ctx.message.text'
        )

        // 命令拦截
        if (ctx.chat.type === 'private') {
            console.log('private')
            if (ctx.message.text === '/turnon') {
                await ctx.reply('打开设备')
                // 获取当前用户下的当前的设备
                // TODO:如何拓展当前的api方法：拓展公司内部的方法：
                // await ctx.api.getDevices();
                if (ctx.api.getDevices === undefined) {
                    console.log('getDevices is undefined')
                } else {
                    // const devices = await ctx.api.getDevices()
                    // console.log(devices, JSON.stringify(devices), 'devices')
                }
            } else if (ctx.message.text === '/turnoff') {
                await ctx.reply('关闭设备')
            }
        }
        // 最外层内容
        console.log(ctx.update, JSON.stringify(ctx.update), 'ctx.update')
        // 通过所有匹配的 updates。
        if (name === undefined || name.includes(str)) {
            // 将控制流传递给下游的中间件。
            await next()
        } else {
            // 告诉他们我们不喜欢他们。

            await ctx.reply(
                `I'm not talking to you! NOT 1111  You don't care about ${str}!`
            )
        }
    }
}

export function onlyBeforeAccept(str: string) {
    // 每隔2s打印一次日志
    // TODO:im的消息通道增加内容。

    setInterval(async () => {
        tempImReceiveMessage = await imReceiveMessage()
        tempTalReceiveMessage = await talReceiveMessage()
        console.log('onlyBeforeAccept')
    }, 2000)

    // 引入tal的mqtt消息通道：
    // TODO:增加tal的mqtt消息通道：

    // 创建并返回一个中间件。
    return async (ctx: any, next: any) => {
        console.log('onlyBeforeAccept')
        // 获取用户的名字。
        const name = ctx.from?.first_name

        console.log(ctx.text, JSON.stringify(ctx.text), 'ctx.text')

        next()
        // 通过所有匹配的 updates。
    }
}
