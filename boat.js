const { Telegraf } = require('telegraf');
const  { GoogleGenAI } = require( "@google/genai");
const express = require('express');
require('dotenv').config();

const app = express();
const port = 3000;

// if (!process.env.TOKEN) {
//     console.error('TOKEN not found in .env file');
//     process.exit(1);
// }

// const bot = new Telegraf(process.env.TOKEN);
const bot = new Telegraf('');

bot.start((ctx) => {
    ctx.reply('Hello!');
});

bot.command('howareyou', (ctx) => {
    ctx.reply('I am fine!');
});

bot.command('location', (ctx) => {
    ctx.replyWithLocation(19.8177, 85.8286);
});
//llms intigrate
//Rag
bot.on('text',async (ctx)=>{
const ai = new GoogleGenAI({});
  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: `${ctx.message.text}`,
  });
  await ctx.reply(response.text)
})








bot.launch();

console.log('Bot is running...');

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});