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

const bot = new Bot('xxxxxxxxxx')

bot.command('ask', ctx => {
    return ctx.reply('你喜欢猫还是狗？', {
        reply_markup: { force_reply: true },
    })
})

bot.command('mode', async ctx => {
    await ctx.reply('*MD\\!* _Welcome_ to [冒泡](https://jeejio.com)\\.', {
        parse_mode: 'MarkdownV2',
    })
    await ctx.reply(
        '<b>HTML!</b> <i>Welcome</i> to <a href="https://jeejio.com">冒泡</a>.',
        { parse_mode: 'HTML' }
    )
})

await bot.api.setMyCommands([
    { command: 'ask', description: '选择题' },
    { command: 'mode', description: '文本模式' },
])

// 然后监听用户的回复
bot.on('message', ctx => {
    if (
        ctx.message.reply_to_message &&
        ctx.message.reply_to_message.text === '你喜欢猫还是狗？'
    ) {
        ctx.reply(`你选择的是：${ctx.message.text}`)
    }
})

bot.on('edited_message', async ctx => {
    // Get the new, edited, text of the message.
    const msg = ctx.msg.text
    ctx.reply(msg)
})

bot.catch(err => console.error(err))

// 启动 Bot（长轮询）
bot.start()
