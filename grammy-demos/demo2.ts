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

bot.command('ask', ctx => {
  return ctx.reply('你喜欢猫还是狗？', {
    reply_markup: { force_reply: true }
  });
});

bot.command("mode", async ctx => {
  await ctx.reply("*MD\\!* _Welcome_ to [冒泡](https://jeejio.com)\\.",
      { parse_mode: "MarkdownV2" }
  );
  await ctx.reply('<b>HTML!</b> <i>Welcome</i> to <a href="https://jeejio.com">冒泡</a>.',
      { parse_mode: "HTML"}
  );
});

await bot.api.setMyCommands([
  { command: "ask", description: "选择题" },
  { command: "mode", description: "文本模式" },
]);

// 然后监听用户的回复
bot.on('message', ctx => {
  if (ctx.message.reply_to_message
     && ctx.message.reply_to_message.text === '你喜欢猫还是狗？') {
    ctx.reply(`你选择的是：${ctx.message.text}`);
  }
});

bot.on("edited_message", async (ctx) => {
  // Get the new, edited, text of the message.
  const msg = ctx.msg.text;
  ctx.reply(msg)
});



bot.catch((err) => console.error(err));

// 启动 Bot（长轮询）
bot.start();