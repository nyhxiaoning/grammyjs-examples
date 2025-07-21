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
} from 'https://deno.land/x/grammy@v1.36.3/mod.ts'

import { onlyAccept, autoChatAction } from './plugin.ts'

const bot = new Bot('8071175783:AAGceLv3Hrmdve2rq_5IG5YCTgNO75sZNc4')

bot.on('inline_query', async ctx => {
    const q = ctx.inlineQuery.query.trim()

    // 根据用户输入 q 构建不同的结果
    let results: InlineQueryResultArticle[] = []

    if (q === '高兴') {
        results = [
            {
                type: 'article',
                id: 'happy-1',
                title: '😊',
                input_message_content: { message_text: '😊' },
            },
            {
                type: 'article',
                id: 'happy-2',
                title: '😄',
                input_message_content: { message_text: '😄' },
            },
            {
                type: 'article',
                id: 'happy-3',
                title: '😁',
                input_message_content: { message_text: '😁' },
            },
        ]
    } else if (q === '笑哭') {
        results = [
            {
                type: 'article',
                id: 'lol-1',
                title: '😂',
                input_message_content: { message_text: '😂' },
            },
            {
                type: 'article',
                id: 'lol-2',
                title: '🤣',
                input_message_content: { message_text: '🤣' },
            },
            {
                type: 'article',
                id: 'lol-3',
                title: '😹',
                input_message_content: { message_text: '😹' },
            },
        ]
    } else {
        // 可根据需要添加默认提示或留空
        results = [
            {
                type: 'article',
                id: 'hint',
                title: '🔍 请输入 “高兴” 或 “笑哭”',
                input_message_content: {
                    message_text: '试试输入：高兴 或 笑哭',
                },
            },
        ]
    }

    // 将结果返回给 Telegram；用户看见这些选项，点击即可将对应表情插入聊天
    await ctx.answerInlineQuery(results, { cache_time: 60 })
})

bot.catch(err => console.error(err))

// 启动 Bot（长轮询）
bot.start()
