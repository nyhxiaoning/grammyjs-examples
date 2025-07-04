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

bot.command("start", async (ctx) => {
  const keyboard = new InlineKeyboard()
    .text("苹果", "fruit_apple")
    .text("香蕉", "fruit_banana");

  await ctx.reply("请选择水果：", { reply_markup: keyboard });
});

// 处理按钮点击
bot.on('callback_query:data', async (ctx) => {
  const choice = ctx.callbackQuery.data;
  
  // 1. 立即响应（避免超时）
  await ctx.answerCallbackQuery({
    text: "确认吗？",
    show_alert: true
  });
  
  // 2. 更新消息内容
  await ctx.editMessageText(`✅ 你选择了：${choice.replace('fruit_', '')}`);
});

bot.catch((err) => console.error(err));

// 启动 Bot（长轮询）
bot.start();