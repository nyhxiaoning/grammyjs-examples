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

bot.command("group", async (ctx) => {
  await ctx.replyWithMediaGroup([
    { type: "photo", media: "https://www.st-martin.org/assets/uploads/sites/3/2025/02/9.jpg", caption: "寄居蟹" },
    { type: "photo", media: "https://www.st-martin.org/assets/uploads/sites/3/2025/02/11.jpg", caption: "hermitCrab" },
    { type: "photo", media: "https://questionableevolution.com/wp-content/uploads/2013/08/hermit_crab.jpg" },
    { type: "photo", media: new InputFile("./test.jpg") },
  ]);
});

bot.hears("show me a doc", async (ctx) => {
  await ctx.api.sendChatAction(ctx.chatId,"upload_document");
  await ctx.replyWithDocument(new InputFile("./document.pdf"));
});

bot.catch((err) => console.error(err));

// 启动 Bot（长轮询）
bot.start();