/**
 * NOTE:这个案例没有按照说明实现
 */

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
} from 'grammy'
// import { Menu } from 'https://deno.land/x/grammy_menu/mod.ts'
import { Menu } from '@grammyjs/menu'
const bot = new Bot('xxxxxxxxxx')

const menu = new Menu('root-menu')
    .text('Welcome', ctx => ctx.reply('顶层菜单'))
    .row()
    .submenu('下一级菜单', 'credits-menu')

// 创建一个简单的菜单。
// const menu = new Menu('movements')
//     .text('^', ctx => ctx.reply('Forward!'))
//     .row()
//     .text('<', ctx => ctx.reply('Left!'))
//     .text('>', ctx => ctx.reply('Right!'))
//     .row()
//     .text('v', ctx => ctx.reply('Backwards!'))

const settings = new Menu('credits-menu')
    .text('二级菜单', ctx => ctx.reply('二级菜单'))
    .back('Go Back')

menu.register(settings)
// Make it interactive.
bot.use(menu)

bot.command('menu', async ctx => {
    await ctx.reply('Here is your menu', { reply_markup: menu })
})

bot.command('startmenu', async ctx => {
    // Send the menu.
    await ctx.reply('Check out this menu:', { reply_markup: menu })
})

bot.command('start', async ctx => {
    // Send the menu.
    await ctx.reply('Check out this menu:', { reply_markup: menu })
})

bot.catch(err => console.error(err))

// 启动 Bot（长轮询）
bot.start()
