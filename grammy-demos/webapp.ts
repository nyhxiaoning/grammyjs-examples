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

await bot.api.setMyCommands([
    { command: 'startweb_app', description: '回复一下' },
    { command: 'startwebapp2', description: '打开小程序222' },
])

bot.command('startweb_app', async ctx => {
    ctx.reply('Hello Bot!')
    // ——给所有聊天（Default）都设置 Web App 按钮：
    // await bot.api.setChatMenuButton({
    //     menu_button: {
    //         type: 'web_app',
    //         text: '🚀 打开小程序',
    //         web_app: { url: WEB_APP_URL },
    //     },
    // })
})

bot.command('startwebapp2', async ctx => {
    ctx.reply('Hello Bot222!')
    // const keyboard = new InlineKeyboard().webApp(
    //     '点击打开 Web App',
    //     WEB_APP_URL
    // )
    // await ctx.reply('点击下方按钮打开H5页面', {
    //     reply_markup: keyboard,
    // })
})

bot.catch(err => console.error(err))

// 启动 Bot（长轮询）
bot.start()
