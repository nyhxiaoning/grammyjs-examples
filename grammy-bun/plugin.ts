// Your plugin can have one main function that creates middleware
export function onlyAccept<C extends Context>(str: string): Middleware<C> {
    // Create and return middleware.
    return async (ctx, next) => {
      // Get first name of user.
      const name = ctx.from?.last_name;
      // Let through all matching updates.
      if (name === undefined || name.includes(str)) {
        // Pass on control flow to downstream middleware.
        await next();
      } else {
        // Tell them we don't like them.
        await ctx.reply(`I'm not talking to you! You don't care about ${str}!`);
      }
    };
  }

  // Main plugin function
export function autoChatAction(): Transformer {
    // Create and return a transformer function.
    return async (prev, method, payload, signal) => {
      // Save the handle of the set interval so we can clear it later.
      let handle: ReturnType<typeof setTimeout> | undefined;
      if (method === "sendDocument" && "chat_id" in payload) {
        // We now know that a document is being sent.
        const actionPayload = {
          chat_id: payload.chat_id,
          action: "upload_document",
        };
        // Repeatedly set the chat action while the file is being uploaded.
        handle ??= setInterval(() => {
          prev("sendChatAction", actionPayload).catch(console.error);
        }, 4000);
      }
  
      try {
        // Run the actual method from the bot.
        return await prev(method, payload, signal);
      } finally {
        // Clear the interval so we stop sending the chat action to the client.
        clearInterval(handle);
      }
    };
  }
  