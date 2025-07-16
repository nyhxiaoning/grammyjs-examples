// plugin.ts
import type { Transformer } from './deps.deno.ts'
// 函数的主要功能
export function autoChatAction(): Transformer {
    // 创建并返回一个转换器函数。
    return async (prev, method, payload, signal) => {
        // 保存已设定的时间间隔的 handle，以便我们稍后可以清除它。
        let handle: ReturnType<typeof setTimeout> | undefined
        if (method === 'sendDocument' && 'chat_id' in payload) {
            // 我们现在知道，一份文件正在被发送。
            const actionPayload = {
                chat_id: payload.chat_id,
                action: 'upload_document',
            }
            // 在上传文件的过程中，重复设置聊天动作。
            handle ??= setInterval(() => {
                prev('sendChatAction', actionPayload).catch(console.error)
            }, 5000)
        }
        try {
            // 从 bot 中运行实际的方法。
            return await prev(method, payload, signal)
        } finally {
            // 清除间隔，以便我们停止向客户端发送聊天动作。
            clearInterval(handle)
        }
    }
}
