import Koa from 'koa'
import Router from 'koa-router'
import axios from 'axios'

const app = new Koa()
const router = new Router()

// 你的 bot token (从 BotFather 获得)

const BOT_TOKEN = '7996507522:AAEtMBRvfLZbTQJxkyWmSuIJRoBtA0Tot2I'

const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`

// 封装一个发送消息的函数
async function sendMessage(chatId: any, text: any) {
    try {
        const res = await axios.post(`${TELEGRAM_API}/sendMessage`, {
            chat_id: chatId,
            text,
        })
        return res.data
    } catch (err: any) {
        console.error('发送消息失败:', err.response?.data || err.message)
    }
}

// 示例 API：触发通知
router.post('/notify', async (ctx: any) => {
    const { msg } = ctx.request.body
    const chatId = process.env.CHAT_ID // 群ID 或 用户ID
    await sendMessage(chatId, msg || '来自 Mini App 的通知')
    ctx.body = { ok: true, message: '通知已发送' }
})

app.use(router.routes())
app.listen(3000, () => console.log('Koa 服务已启动 http://localhost:3000'))
