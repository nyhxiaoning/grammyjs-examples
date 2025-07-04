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

bot.command("start", (ctx) => ctx.reply("Hello Bot!"));
bot.command("echo", (ctx) => ctx.reply("This is a echo command."));
bot.command('roll', async ctx => {
    const dice = await ctx.api.sendDice(ctx.chatId);
});
  await bot.api.setMyCommands([
    { command: "start", description: "最简单的命令" },
    { command: "echo",  description: "echo"       },
    { command: "roll",  description: "拼手气"      },
  ]);

  bot.on('message', async ctx => {
    let chat_id: string;
    chat_id = ctx.chat.id;
    const text : string = ctx.msg.text;
    await bot.api.sendMessage(chat_id, text, 
        {reply_parameters: { message_id: ctx.msg.message_id }}
    );
  });

bot.catch((err) => console.error(err));

// 启动 Bot（长轮询）
bot.start();