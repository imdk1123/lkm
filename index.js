const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TOKEN;
const bot = new TelegramBot(token, {polling: true});


// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for 'photos'.
bot.on('photo', (msg) => {
  const chatId = process.env.CHATID; // Group ID;
  if (msg.chat.id === msg.from.id) { // Only forward messages from real people
      // Send the photo to the group
      bot.sendPhoto(chatId, msg.photo[msg.photo.length-1].file_id);
  }
});