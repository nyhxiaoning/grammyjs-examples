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

const BOT_WEB_APP_URL = 'https://t.me/testhenry1006_bot/henytesturl'

bot.command('startwebappurl', async ctx => {
    await ctx.reply('startwebappurl点击!')

    await bot.api.sendMessage(ctx.chat.id, '普通url', {
        reply_markup: {
            inline_keyboard: [
                [{ text: '普通url点击跳转', url: BOT_WEB_APP_URL }],
            ],
        },
    })
})

await bot.on('message', async ctx => {
    console.log('当前 chat_id:', ctx.chat.id)
    console.log('当前 message_id:', ctx.message.message_id)
    // 处理消息事件
    if (ctx.message.text === '打开小程序') {
        // 发送 Web App 按钮
        await ctx.reply('点击下面的按钮打开小程序')
        // await ctx.reply('点击下方按钮打开H5页面', {
        //     reply_markup: {
        //         keyboard: [
        //             [
        //                 {
        //                     text: '打开加法器222',
        //                     web_app: {
        //                         url: 'https://storage.jeejio.com/jeejio-debug/telegrambot/index.html',
        //                     },
        //                 },
        //             ],
        //         ],

        //         resize_keyboard: true,
        //         one_time_keyboard: true,
        //     },
        // })

        // TODO:这里点击访问时一个外链：这里如何做成一个内嵌的H5页面？
        // 发送 Web App 按钮

        // TODO:解决url如何跳转到Telegram内部打开
        // await bot.api.sendMessage(ctx.chat.id, '点击访问', {
        //     reply_markup: {
        //         inline_keyboard: [[{ text: '点击跳转', web_app: { url: WEB_APP_URL } }]],
        await bot.api.sendMessage(ctx.chat.id, '点击访问', {
            reply_markup: {
                inline_keyboard: [[{ text: '点击跳转', url: WEB_APP_URL }]],
            },
        })

        // await bot.api.setChatMenuButton({
        //     menu_button: {
        //         type: 'web_app',
        //         text: '🚀 打开小程序22',
        //         web_app: { url: WEB_APP_URL },
        //     },
        // })
    } else if (ctx.message.text === '/startaddgame22@testhenry1006_bot') {
        // 发送 Web App 按钮
        const keyboard = new InlineKeyboard()
            .text('苹果', 'fruit_apple')
            .text('香蕉', 'fruit_banana')

        await ctx.reply('请选择水果：', { reply_markup: keyboard })
    } else if (ctx.message.text === '点击打开') {
        try {
            await bot.api.sendMessage(ctx.chat.id, '点击打开 WebApp', {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: '点击打开 WebApp',
                                web_app: { url: BOT_WEB_APP_URL }, // ✅ 注意这里是 web_app 而不是 url
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
    }
    console.log('Received message:', ctx.message)
})
bot.catch(err => console.error(err))

// 启动 Bot（长轮询）
bot.start()
