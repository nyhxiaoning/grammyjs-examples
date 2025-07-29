import { Bot } from 'https://deno.land/x/grammy@v1.36.3/mod.ts'
import { Menu } from 'https://deno.land/x/grammy_menu@v1.3.0/mod.ts'

// 创建一个 bot。
const bot = new Bot('')

// 创建一个简单的菜单。
const menu = new Menu('my-menu-identifier')
    .text('A', ctx => ctx.reply('You pressed A!'))
    .row()
    .text('B', ctx => ctx.reply('You pressed B!'))

// 使其具有互动性。
bot.use(menu)

bot.command('start', async ctx => {
    // 发送菜单。
    await ctx.reply('Check out this menu:', { reply_markup: menu })
})

bot.start()
