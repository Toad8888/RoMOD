const Discord = require("discord.js");
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

client.login('NDA5NDQ5NzY0NjY1Njg4MDc1.DYVEeg.XjeVxxd2Zi-Sg8oyRoVBTYeaE5s"');


