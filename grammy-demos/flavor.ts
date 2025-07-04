import { Bot, Keyboard, InlineKeyboard, Context, Composer, 
         BotError, GrammyError, InputFile, session, SessionFlavor, 
         InlineQueryResultBuilder, InputMediaBuilder} from "https://deno.land/x/grammy@v1.36.3/mod.ts";
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
const BOT_DEVELOPER = 8086329372; // bot developer chat identifier

bot.use(async (ctx, next) => {
    //console.log(ctx.from?.id);
  // Modify context object here by setting the config.
  ctx.config = {
    botDeveloper: BOT_DEVELOPER,
    isDeveloper: ctx.from?.id === BOT_DEVELOPER,
  };
  // Run remaining handlers.
  await next();
  await ctx.reply("Exit Middleware!");
});

bot.command("start", async (ctx) => {
    // Work with modified context here!
    if (ctx.config.isDeveloper) await ctx.reply("Your are My Boss!!");
    else await ctx.reply("Welcome, user!");
  });

bot.catch((err) => console.error(err));

// 启动 Bot（长轮询）
bot.start();