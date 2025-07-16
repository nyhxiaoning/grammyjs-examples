import { Bot, Api, Context } from 'grammy'

// 自定义 API 方法的类型定义
export type MyApiFlavor = {
    sendHelloMessage(
        chat_id: number | string
    ): Promise<ReturnType<Api['sendMessage']>>
}
