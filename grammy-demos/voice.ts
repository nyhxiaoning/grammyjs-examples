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

bot.on('message:voice', async ctx => {
    const voice = ctx.msg.voice

    const duration = voice.duration // in seconds
    await ctx.reply(`Your voice message is ${duration} seconds long.`)

    const fileId = voice.file_id
    await ctx.reply('The file identifier of your voice message is: ' + fileId)
    await ctx.api.sendChatAction(ctx.chat.id, 'record_voice')
    await ctx.replyWithVoice(fileId, {
        caption: '学你的话',
    })
})

bot.catch(err => console.error(err))

// 启动 Bot（长轮询）
bot.start()
