class BotManager {
    // 消息队列，用于管理大量消息
    private messageQueue: Array<{
        event: 'message:mappao' | 'message:mappaoMqtt'
        data: any
    }> = []
    // 最大队列长度，防止内存溢出
    private maxQueueSize = 1000
    // 事件监听器存储
    private listeners: Record<
        'message:mappao' | 'message:mappaoMqtt',
        Function[]
    > = {
        'message:mappao': [],
        'message:mappaoMqtt': [],
    }
    // 轮询定时器
    private timers: {
        mappao: NodeJS.Timeout | null
        mappaoMqtt: NodeJS.Timeout | null
    } = {
        mappao: null,
        mappaoMqtt: null,
    }
    // 配置信息
    private config: {
        apiUrl: string
        token: string
    }

    constructor(apiUrl: string, token: string) {
        this.config = {
            apiUrl,
            token,
        }

        // 启动消息队列处理器
        this.startQueueProcessor()
    }

    // 注册事件监听：通过不同事件名区分消息类型
    on(event: 'message:mappao' | 'message:mappaoMqtt', callback: Function) {
        this.listeners[event].push(callback)
        return this // 支持链式调用
    }

    // 触发事件
    private emit(event: 'message:mappao' | 'message:mappaoMqtt', data: any) {
        // 将消息加入队列
        this.enqueueMessage({ event, data })
    }

    // 添加消息到队列
    private enqueueMessage(item: {
        event: 'message:mappao' | 'message:mappaoMqtt'
        data: any
    }) {
        // 超过最大长度时移除最早的消息
        if (this.messageQueue.length >= this.maxQueueSize) {
            this.messageQueue.shift()
        }
        this.messageQueue.push(item)
    }

    // 处理消息队列
    private startQueueProcessor() {
        // 每100ms处理一次队列，可调整频率
        setInterval(() => {
            while (this.messageQueue.length > 0) {
                const item = this.messageQueue.shift()
                if (item) {
                    this.listeners[item.event].forEach(callback => {
                        try {
                            callback(item.data)
                        } catch (error) {
                            console.error(
                                `Error processing ${item.event} message:`,
                                error
                            )
                        }
                    })
                }
            }
        }, 100)
    }

    // 启动IM消息监听
    startImListening(interval: number = 5000) {
        // 清除现有定时器
        if (this.timers.mappao) {
            clearTimeout(this.timers.mappao)
        }

        this.pollImMessages(interval)
        return this
    }

    // 轮询IM消息
    private async pollImMessages(interval: number) {
        try {
            const response = await fetch(
                `${this.config.apiUrl}/bot/updates?token=${this.config.token}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()
            // 触发'message:mappao'事件
            this.emit('message:mappao', data)
        } catch (error) {
            console.error('Error fetching IM messages:', error)
            this.emit('message:mappao', {
                error: (error as Error).message || 'Unknown error',
            })
        }

        // 安排下一次轮询
        this.timers.mappao = setTimeout(
            () => this.pollImMessages(interval),
            interval
        )
    }

    // 启动MQTT消息监听
    startMqttListening(interval: number = 5000) {
        // 清除现有定时器
        if (this.timers.mappaoMqtt) {
            clearTimeout(this.timers.mappaoMqtt)
        }

        this.pollMqttMessages(interval)
        return this
    }

    // 轮询MQTT消息
    private async pollMqttMessages(interval: number) {
        try {
            const response = await fetch(
                `${this.config.apiUrl}/bot/device/updates?token=${this.config.token}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()
            // 触发'message:mappaoMqtt'事件
            this.emit('message:mappaoMqtt', data)
        } catch (error) {
            console.error('Error fetching MQTT messages:', error)
            this.emit('message:mappaoMqtt', {
                error: (error as Error).message || 'Unknown error',
            })
        }

        // 安排下一次轮询
        this.timers.mappaoMqtt = setTimeout(
            () => this.pollMqttMessages(interval),
            interval
        )
    }

    // 停止所有监听
    stopAll() {
        if (this.timers.mappao) {
            clearTimeout(this.timers.mappao)
        }
        if (this.timers.mappaoMqtt) {
            clearTimeout(this.timers.mappaoMqtt)
        }
        return this
    }

    // 清空消息队列
    clearQueue() {
        this.messageQueue = []
        return this
    }
}

// 使用示例
const MAOPAO_QA_API = 'https://cloudgateway.qajeejio.com/im'
const tempBotToken = 'sdfsdfsdfsdfdsfdsfd'

// 创建Bot管理器实例
const bot = new BotManager(MAOPAO_QA_API, tempBotToken)

// 监听Mappao消息（使用'message:mappao'事件名）
bot.on('message:mappao', (ctx: any) => {
    console.log('Received Mappao message222:', ctx)
    // 处理IM消息逻辑
})

// 监听MappaoMqtt消息（使用'message:mappaoMqtt'事件名）
bot.on('message:mappaoMqtt', (ctx: any) => {
    console.log('Received MappaoMqtt message1111:', ctx)
    // 处理MQTT消息逻辑
})

// 启动监听
bot.startImListening(5000) // 每5秒轮询一次IM消息
    .startMqttListening(3000) // 每3秒轮询一次MQTT消息
// 停止监听
// bot.stopAll()
// 清空消息队列
// bot.clearQueue()
