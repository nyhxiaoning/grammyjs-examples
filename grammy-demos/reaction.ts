import { Bot } from 'grammy'

const bot = new Bot('7996507522:AAEtMBRvfLZbTQJxkyWmSuIJRoBtA0Tot2I')

bot.on('message', ctx => ctx.react('🐳'))

bot.on('message_reaction', async ctx => {
    const { emojiAdded } = ctx.reactions()
    if (emojiAdded.includes('👍')) {
        console.log('yes')
        await ctx.reply('点赞')
    }
})

bot.catch(err => console.error(err))

// 启动 Bot（长轮询）
/**
 * 配置参数内容
 *
 */
bot.start({
    allowed_updates: [
        'message',
        'edited_message',
        'callback_query',
        // 'inline_query',
        // 'chosen_inline_result',
        'message_reaction',
        'message_reaction_count',
    ],
})
