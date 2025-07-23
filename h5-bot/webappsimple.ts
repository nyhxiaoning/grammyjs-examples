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

const WEB_APP_URL2 =
    'https://storage.jeejio.com/jeejio-debug/telegrambot/telegram.html'

const BOT_WEB_APP_URL = 'https://t.me/testhenry1006_bot/henytesturl'

await bot.on('message', async ctx => {
    console.log('当前 chat_id:', ctx.chat.id)
    console.log('当前 message_id:', ctx.message.message_id)
    // 处理消息事件
    if (ctx.message.text === '点击打开') {
        try {
            await bot.api.sendMessage(ctx.chat.id, '点击打开 WebApp', {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: '点击打开 WebApp',
                                web_app: { url: WEB_APP_URL }, // ✅ 注意这里是 web_app 而不是 url
                            },
                        ],
                    ],
                },
            })
        } catch (error) {
            console.error('Error sending message:', error)
            await ctx.reply('发送消息时出错，请稍后再试。')
        }

        // await bot.api.sendMessage(ctx.chat.id, '点击访问内部链接', {
        //     reply_markup: {
        //         inline_keyboard: [
        //             // TODO:如何让这个内部链接和bot可以通信？

        //             [
        //                 {
        //                     text: 'web_app',
        //                     web_app: {
        //                         url: BOT_WEB_APP_URL,
        //                     },
        //                 },
        //             ],
        //         ],
        //     },
        // })
    } else if (ctx.message.text === '普通url') {
        await bot.api.sendMessage(ctx.chat.id, '点击访问', {
            reply_markup: {
                inline_keyboard: [[{ text: 'web_app', url: BOT_WEB_APP_URL }]],
            },
        })
    } else if (ctx.message.text === '点击打开2') {
        try {
            await bot.api.sendMessage(ctx.chat.id, '点击打开2', {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: '点击打开2',
                                web_app: { url: WEB_APP_URL2 }, // ✅ 注意这里是 web_app 而不是 url
                            },
                        ],
                    ],
                },
            })
        } catch (error) {
            console.error('Error sending message:', error)
            await ctx.reply('发送消息时出错，请稍后再试。')
        }
    }
    console.log('Received message:', ctx.message)
})
bot.catch(err => console.error(err))

// 启动 Bot（长轮询）
bot.start()
