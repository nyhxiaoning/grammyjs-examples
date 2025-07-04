import { Bot } from 'grammy'

// Send a single message to a specific user by ID.

const HENRY_BOT_TOKEN = '7996507522:AAEtMBRvfLZbTQJxkyWmSuIJRoBtA0Tot2I'

// 1. Create a bot with a token (get it from https://t.me/BotFather)
const bot = new Bot(HENRY_BOT_TOKEN) // <-- place your token inside this string

// 自定义command
bot.command('start', ctx => {
    return ctx.reply('Hello, world!')
})

bot.command('poll', ctx => {
    return ctx.reply('Polling...')
})

bot.command('help', ctx => {
    return ctx.reply('Help message')
})

bot.command('ask', ctx => {
    return ctx.reply('请输入你的问题')
})

// 另一种api出现命令:添加内容
bot.api.setMyCommands([
    { command: 'start', description: 'Start the bot' },
    { command: 'poll', description: 'Polling...' },
    { command: 'help', description: 'Help message' },
    { command: 'ask', description: 'Please input your question' },
])

bot.on('message', ctx => {
    return ctx.reply('你说的是: ' + ctx.message.text)
})
// 2. Send message to user `1234` (find user IDs with https://t.me/getidsbot)
// bot.api.sendMessage(8015888418, 'I wrote a Telegram bot!')

// bot 长轮训:注意：不加这个，这个脚本会马上关闭
bot.catch(err => {
    console.log(`Error while handling update ${err}: ${err.error}`)
})

bot.start()
