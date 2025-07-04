// 8169933235:AAEd_2ZH9AI15H71lEvCgDeKXNS4P-O6LfU
// 新的机器人请求：

/**
 * API
 *
Use this token to access the HTTP API:
8169933235:AAEd_2ZH9AI15H71lEvCgDeKXNS4P-O6LfU
Keep your token secure and store it safely, it can be used by anyone to control your bot.

 */

import { Bot } from 'grammy'

// Send a single message to a specific user by ID.

const HENRY_BOT_TOKEN = '7996507522:AAEtMBRvfLZbTQJxkyWmSuIJRoBtA0Tot2I'

// 1. Create a bot with a token (get it from https://t.me/BotFather)
const bot = new Bot(HENRY_BOT_TOKEN) // <-- place your token inside this string

// deno启动
bot.on('message:text', async ctx => {
    const message = ctx.message.text
    console.log('message:', message)
    // 发送消息
    await ctx.reply('你好，我是你的机器人')
})

bot.command('start', async ctx => {
    // 发送消息
    await ctx.reply('你好，我是你的机器人')
})

bot.command('help', async ctx => {
    // 发送消息
    await ctx.reply('你好，我是你的机器人')
})

bot.command('about', async ctx => {
    // 发送消息
    await ctx.reply('你好，我是你的机器人')
})

bot.api.setMyCommands([
    { command: 'start', description: '开始使用' },
    { command: 'help', description: '帮助' },
    { command: 'about', description: '关于' },
])

// bot长轮训
bot.start()
