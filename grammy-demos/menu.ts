import { Bot, Keyboard, InlineKeyboard, Context, Composer, 
         BotError, GrammyError, InputFile, session, SessionFlavor, 
         InlineQueryResultBuilder} from "https://deno.land/x/grammy@v1.36.3/mod.ts";
import { freeStorage } from "https://deno.land/x/grammy_storages@v2.5.1/free/src/mod.ts";
import { Menu } from "https://deno.land/x/grammy_menu/mod.ts";
import {
  type Conversation,
  type ConversationFlavor,
  conversations,
  createConversation,
} from "https://deno.land/x/grammy_conversations@v2.1.0/mod.ts";
import { onlyAccept, autoChatAction } from "./plugin.ts"

const bot = new Bot("8071175783:AAGceLv3Hrmdve2rq_5IG5YCTgNO75sZNc4");

const menu = new Menu("root-menu")
  .text("Welcome", (ctx) => ctx.reply("顶层菜单")).row()
  .submenu("下一级菜单", "credits-menu");

const settings = new Menu("credits-menu")
  .text("二级菜单", (ctx) => ctx.reply("二级菜单"))
  .back("Go Back");

menu.register(settings);
// Make it interactive.
bot.use(menu);

bot.command("start", async (ctx) => {
  // Send the menu.
  await ctx.reply("Check out this menu:", { reply_markup: menu });
});

bot.catch((err) => console.error(err));

// 启动 Bot（长轮询）
bot.start();