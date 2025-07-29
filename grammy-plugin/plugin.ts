// plugin.ts
// 从 grammY 中导入类型（我们在 `deps.deno.ts` 中重新导出了它们）。
// 你的插件可以有一个创建中间件的主函数。

/**
 * 第一件事情：拓展中间件：
 * 第二件事情：通过API增加当前的bot上自定义api：
 * https://grammy.dev/zh/advanced/transformers，这里增加了API后：这里
 * TODO:Transformer 函数可以被安装在 bot.api 中。 这是一个没有做任何事情的 transformer 函数的例子：
 * @param str
 * @returns
 */
export function onlyAccept(str: string) {
    // 创建并返回一个中间件。
    return async (ctx: any, next: any) => {
        // 获取用户的名字。
        const name = ctx.from?.first_name
        // 增加当前的设备的上报：
        // 如果发现是打开设备命令：
        console.log(
            ctx.api.token,
            JSON.stringify(ctx.api.token),
            'ctx.api.token'
        )
        console.log(ctx.text, JSON.stringify(ctx.text), 'ctx.text')
        console.log(ctx.from, JSON.stringify(ctx.from), 'ctx.from')
        console.log(
            ctx.chat.type,
            JSON.stringify(ctx.chat.type),
            'ctx.chat.type'
        )
        // 最外层内容
        console.log(ctx.api, JSON.stringify(ctx.api), 'ctx.api')
        // 最外层内容
        console.log(ctx.me, JSON.stringify(ctx.me), 'ctx.me')
        console.log(
            ctx.message.text,
            JSON.stringify(ctx.message.text),
            'ctx.message.text'
        )

        ctx.api.sendMessage(
            ctx.chat.id,
            'Hello from custom API method!===>sendSingleDevice'
        )

        // 命令拦截
        if (ctx.chat.type === 'private') {
            console.log('private')
            if (ctx.message.text === '/turnon') {
                await ctx.reply('打开设备')
                // 获取当前用户下的当前的设备
                // TODO:如何拓展当前的api方法：拓展公司内部的方法：
                // await ctx.api.getDevices();
                if (ctx.api.getDevices === undefined) {
                    console.log('getDevices is undefined')
                } else {
                    // const devices = await ctx.api.getDevices()
                    // console.log(devices, JSON.stringify(devices), 'devices')
                }
            } else if (ctx.message.text === '/turnoff') {
                await ctx.reply('关闭设备')
            }
        }
        // 最外层内容
        console.log(ctx.update, JSON.stringify(ctx.update), 'ctx.update')
        // 通过所有匹配的 updates。
        if (name === undefined || name.includes(str)) {
            // 将控制流传递给下游的中间件。
            await next()
        } else {
            // 告诉他们我们不喜欢他们。

            await ctx.reply(
                `I'm not talking to you! NOT 1111  You don't care about ${str}!`
            )
        }
    }
}

export function onlyBeforeAccept(str: string) {
    // 创建并返回一个中间件。
    return async (ctx: any, next: any) => {
        console.log('onlyBeforeAccept')
        // 获取用户的名字。
        const name = ctx.from?.first_name

        console.log(ctx.text, JSON.stringify(ctx.text), 'ctx.text')

        // 通过所有匹配的 updates。
        if (name === undefined || name.includes(str)) {
            // 将控制流传递给下游的中间件。
            await next()
        } else {
            // 告诉他们我们不喜欢他们。

            await ctx.reply(
                `进入中间件首次之前：I'm not talking to you! NOT 1111  You don't care about ${str}!`
            )

            const result2 = await ctx.api.getMaoPaoDevices()
            console.log(result2, JSON.stringify(result2), 'result')
            await ctx.reply(result2)
        }
    }
}
