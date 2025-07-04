import { Bot, webhookCallback } from 'grammy'
import { Agent } from 'https'
import express from 'express'

const HENRY_BOT_TOKEN = '7996507522:AAEtMBRvfLZbTQJxkyWmSuIJRoBtA0Tot2I'

// 1. Create a bot
export const bot = new Bot(HENRY_BOT_TOKEN as string, {
    client: {
        // 2. Set the local Bot API URL
        apiRoot: 'https://bot-api',
        baseFetchConfig: {
            compress: true,
            agent: new Agent({
                keepAlive: true,
                // 3. Disable Bot API server certificate verification
                rejectUnauthorized: false,
            }),
        },
    },
})

bot.on('message:text', ctx => ctx.reply(ctx.message.text))

const server = express()
server.use(express.json())

// 4. Register a handler for the bot
server.post('/webhook', webhookCallback(bot, 'express'))

server.listen(80)

// 5. Set webhook for handler in Bot API
bot.api.setWebhook('http://bot/webhook')
