import {
    Bot,
    Keyboard,
    InlineKeyboard,
    Context,
    Composer,
    BotError,
    GrammyError,
    InputFile,
    session,
    SessionFlavor,
    InlineQueryResultBuilder,
    InputMediaBuilder,
} from 'grammy'

const bot = new Bot('7996507522:AAEtMBRvfLZbTQJxkyWmSuIJRoBtA0Tot2I')
const WEB_APP_URL =
    'https://storage.jeejio.com/jeejio-debug/telegrambot/index.html'

// ——给所有聊天（Default）都设置 Web App 按钮：
await bot.api.setChatMenuButton({
    menu_button: {
        type: 'web_app',
        text: '🚀 打开小程序22',
        web_app: { url: WEB_APP_URL },
    },
})

bot.on('message', async ctx => {
    // 处理消息事件
    if (ctx.message.text === '打开小程序') {
        // 发送 Web App 按钮
        await ctx.reply('点击下面的按钮打开小程序')
    }
    console.log('Received message:', ctx.message)
})
bot.catch(err => console.error(err))

// 启动 Bot（长轮询）
bot.start()
