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
} from 'grammy'

const bot = new Bot('7996507522:AAEtMBRvfLZbTQJxkyWmSuIJRoBtA0Tot2I')

bot.command('add', ctx => {
    const [a, b] = (ctx.match ?? '').split(' ')
    if (a && b) {
        const sum = Number(a) + Number(b)
        if (!isNaN(sum)) {
            ctx.reply(`${a} + ${b} = ${sum}`)
            return
        }
    }
    ctx.reply('用法：/add <数字1> <数字2>')
})

bot.catch(err => console.error(err))

// 启动 Bot（长轮询）
bot.start()
