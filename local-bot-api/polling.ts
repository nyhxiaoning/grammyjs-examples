import { Bot } from 'grammy'

const HENRY_BOT_TOKEN = '7996507522:AAEtMBRvfLZbTQJxkyWmSuIJRoBtA0Tot2I'

// 1. Create a bot
export const bot = new Bot(HENRY_BOT_TOKEN as string, {
    client: {
        // 2. Set the local Bot API URL
        // apiRoot: 'http://bot-api:8081',
        apiRoot: '127.0.0.1:8097',
    },
})

bot.on('message:text', ctx => ctx.reply(ctx.message.text))

bot.api.sendMessage(8015888418, 'I wrote a Telegram bot!')
console.log(bot.api, 'api')
// 3. Start the bot
bot.start()
