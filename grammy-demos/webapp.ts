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
const WEB_APP_URL = "https://t.me/maopaoBot/jeejiohome";

// ——给所有聊天（Default）都设置 Web App 按钮：
await bot.api.setChatMenuButton({
  menu_button: {
    type: "web_app",
    text: "🚀 打开小程序",
    web_app: { url: WEB_APP_URL },
  },
});


bot.catch((err) => console.error(err));

// 启动 Bot（长轮询）
bot.start();