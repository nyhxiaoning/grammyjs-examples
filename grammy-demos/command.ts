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

bot.command("add", (ctx) => {
  const [a, b] = (ctx.match ?? "").split(" ");
  if (a && b) {
    const sum = Number(a) + Number(b);
    if (!isNaN(sum)) {
      ctx.reply(`${a} + ${b} = ${sum}`);
      return;
    }
  }
  ctx.reply("用法：/add <数字1> <数字2>");
});

bot.catch((err) => console.error(err));

// 启动 Bot（长轮询）
bot.start();