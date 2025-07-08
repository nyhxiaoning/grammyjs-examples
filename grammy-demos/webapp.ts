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
const WEB_APP_URL = 'https://t.me/maopaoBot/jeejiohome'

// ——给所有聊天（Default）都设置 Web App 按钮：
await bot.api.setChatMenuButton({
    menu_button: {
        type: 'web_app',
        text: '🚀 打开小程序',
        web_app: { url: WEB_APP_URL },
    },
})

bot.catch(err => console.error(err))

// 启动 Bot（长轮询）
bot.start()
