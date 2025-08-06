// TODO:待办：：：：到时候，这里消息太多，需要用一个队列管理
// TODO:管理消息的异步队列整理
// TODO:现在的问题，设备4次tal后，这个设备就挂了。重启。设备烧录之后，需要断电，抽线，再上电。
// TODO:如何单独实现一套消息处理逻辑：，抛离这个当前的grammyjs的逻辑,是否仅仅封装api
// 全部实现grammyjs的东西，太重了，但是如果仅仅实现消息协议层处理。其实单独实现。

// TODO:如何拆出来，做成一个中间件

// TODO:实现一个发布订阅者模式：还是利用消息触发事件的订阅，利用主动tal的方法或自定义方法触发事件的发布；

// 临时全局im和mqtt的消息接收变量
let tempImReceiveMessage = null,
    tempTalReceiveMessage = null

let MAOPAO_QA_API = 'https://cloudgateway.qajeejio.com/im'
let tempBotToken = 'sdfsdfsdfsdfdsfdsfd'

// 1.首先创建一个Mappao对象用于im消息事件监听管理
const Mappao = {
    // 存储事件监听器的对象
    listeners: {} as any,

    // 注册事件监听的方法
    on(eventName: string, callback: Function) {
        if (!this.listeners[eventName]) {
            this.listeners[eventName] = []
        }
        this.listeners[eventName].push(callback)
    },

    // 触发事件的方法
    emit(eventName: string, data: any) {
        if (this.listeners[eventName]) {
            this.listeners[eventName].forEach((callback: any) => {
                callback(data)
            })
        }
    },
}

// 2.创建一个Mappao对象用于mqtt消息事件监听管理
const MappaoMqtt = {
    // 存储事件监听器的对象
    listeners: {} as any,
    // 注册事件监听的方法
    on(eventName: string, callback: Function) {
        if (!this.listeners[eventName]) {
            this.listeners[eventName] = []
        }
        this.listeners[eventName].push(callback)
    },
    // 触发事件的方法
    emit(eventName: string, data: any) {
        if (this.listeners[eventName]) {
            this.listeners[eventName].forEach((callback: any) => {
                callback(data)
            })
        }
    },
}

// 改进消息接收函数，使其能实时监听并触发事件

// 使用示例：im消息实时监听
Mappao.on('message', (msg: object) => {
    console.log('Received message im Mappao:', msg)
    // 这里可以处理收到的消息
})

// 使用示例：mqtt消息实时监听
MappaoMqtt.on('message', (msg: object) => {
    console.log('Received message through MappaoMqtt:', msg)
    // 这里可以处理收到的消息
})

// 启动im消息监听
startListeningToMessages()
// 启动mqtt消息监听
startListeningToMqttMessages()

// *******************************未来封装成中间件服务***************************
/**
 * 监听im和mqtt的消息，实时监听并触发事件
 */
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
            Mappao.emit('message', { error: error || 'Unknown error' })
        }

        // 继续监听（这里设置5000秒轮询一次，可根据需要调整）
        setTimeout(checkForNewMessages, 5000)
    }

    // 开始第一次检查
    checkForNewMessages()
}

/**
 * 监听mqtt消息，实时监听并触发事件
 */
async function startListeningToMqttMessages() {
    // 定期检查新消息的函数
    async function checkForNewMqttMessages() {
        try {
            const response = await fetch(
                `${MAOPAO_QA_API}/bot/device/updates?token=${tempBotToken}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )

            if (!response.ok) {
                throw new Error('Failed to get mqtt message')
            }

            const data = await response.json()
            console.log('Received new mqtt message:', data)

            // 当获取到消息时，触发message事件
            Mappao.emit('message', data)
        } catch (error) {
            console.error('Error fetching mqtt message:', error)
            // 出错时也可以触发事件传递错误信息
            Mappao.emit('message', { error: error || 'Unknown error' })
        }

        // 继续监听（这里设置5000秒轮询一次，可根据需要调整）
        setTimeout(checkForNewMqttMessages, 5000)
    }

    // 开始第一次检查
    checkForNewMqttMessages()
}

// *****************************封装im消息

// 1.模拟来自im的一条消息发给bot
// 假装发送im消息
setTimeout(() => {
    sendIMessage()
})

async function sendIMessage(msg?: any) {
    const response = await fetch(`${MAOPAO_QA_API}/bot/msg`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: '请选择一个选项',
            token: 'sdfsdfsdfsdfdsfdsfd',
            type: 37,
            to: {
                id: '01gxme3655z9nj641dvz4vnhvz',
            },
            payload: {
                type: 'InlineKeyboard',
                content: {
                    rows: [
                        {
                            buttons: [
                                {
                                    title: '选项A',
                                    type: 0,
                                    value: 'a',
                                },
                                {
                                    title: '选项B',
                                    type: 0,
                                    value: 'b',
                                },
                            ],
                        },
                        {
                            buttons: [
                                {
                                    title: '选项X',
                                    type: 0,
                                    value: 'x',
                                },
                            ],
                        },
                    ],
                },
            },
        }),
    })
        .then(res => res.json())
        .then(res => {
            console.log('发送im消息成功', res)
        })
}
