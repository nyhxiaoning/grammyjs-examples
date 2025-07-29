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

// 创建一个 bot。
const bot = new Bot('xxxxxxxxxx')

bot.command('start', async ctx => {
    const keyboard = new InlineKeyboard()
        .text('苹果', 'fruit_apple')
        .text('香蕉', 'fruit_banana')

    await ctx.reply('请选择水果：', { reply_markup: keyboard })
})

// 处理按钮点击
bot.on('callback_query:data', async ctx => {
    const choice = ctx.callbackQuery.data

    // 1. 立即响应（避免超时）
    await ctx.answerCallbackQuery({
        text: '确认吗？',
        show_alert: true,
    })

    // 2. 更新消息内容
    await ctx.editMessageText(`✅ 你选择了：${choice.replace('fruit_', '')}`)
})

bot.catch(err => console.error(err))

// 启动 Bot（长轮询）
bot.start()
