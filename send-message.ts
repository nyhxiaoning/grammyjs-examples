import { Bot } from 'grammy'

// Send a single message to a specific user by ID.

const HENRY_BOT_TOKEN = '7996507522:AAEtMBRvfLZbTQJxkyWmSuIJRoBtA0Tot2I'

// 1. Create a bot with a token (get it from https://t.me/BotFather)
const bot = new Bot(HENRY_BOT_TOKEN) // <-- place your token inside this string

// 2. Send message to user `1234` (find user IDs with https://t.me/getidsbot)
bot.api.sendMessage(8015888418, 'I wrote a Telegram bot!')
