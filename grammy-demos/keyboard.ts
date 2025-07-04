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
// 创建回复键盘
const replyKeyboard = new Keyboard()
  .text("📊 统计数据")      // 第一行按钮
  .text("⚙️ 设置")
  .row()                  // 换行
  .text("❤️ 喜欢")
  .text("🌟 收藏")
  .row()
  .text("取消操作").resized()  // 自动调整按钮大小
  //.oneTime();             // 一次性键盘（发送后隐藏）

// 处理 /start 命令
bot.command("start", async (ctx) => {
  await ctx.reply("请选择操作：", {
    reply_markup: replyKeyboard,
  });
});

// 处理按钮点击
bot.on("message:text", async (ctx) => {
  const text = ctx.message.text;
  if (text === "❤️ 喜欢") {
    await ctx.reply("你输入了喜欢");
  } else if (text === "取消操作") {
    await ctx.reply("操作已取消", {
      reply_markup: { remove_keyboard: true }, // 主动移除键盘
    });
  }
});

bot.catch((err) => console.error(err));

// 启动 Bot（长轮询）
bot.start();