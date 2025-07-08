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
const BOT_DEVELOPER = 8015888418 // bot developer chat identifier

bot.use(async (ctx, next) => {
    //console.log(ctx.from?.id);
    // Modify context object here by setting the config.
    ctx.config = {
        botDeveloper: BOT_DEVELOPER,
        isDeveloper: ctx.from?.id === BOT_DEVELOPER,
    }
    // Run remaining handlers.
    await next()
    await ctx.reply('Exit Middleware!')
})

bot.command('start', async ctx => {
    // Work with modified context here!
    if (ctx.config.isDeveloper) await ctx.reply('Your are My Boss!!')
    else await ctx.reply('Welcome, user!')
})

bot.catch(err => console.error(err))

// 启动 Bot（长轮询）
bot.start()
