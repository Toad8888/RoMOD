const Discord = require("discord.js")
let coins = require("./coins.json");
let xp = require("./xp.json");




const TOKEN = "NDA5NDQ5NzY0NjY1Njg4MDc1.DYVEeg.XjeVxxd2Zi-Sg8oyRoVBTYeaE5s";
const PREFIX = "+"



var bot = new Discord.Client();

bot.on("ready", function() {
    console.log("Ready");
});

bot.on("message", function(message){
  if(message.author.equals(bot.user)) return;

  if(!message.content.startsWith(PREFIX)) return;

  var args = message.content.substring(PREFIX.length).split(" ");

  switch(args[0].toLowerCase()){
      case "ping":
      message.channel.sendMessage("Pong!")
      break;
      case"info":
      var embed = new Discord.RichEmbed()
      .setTitle("Info")
      .setColor("0x00FFFF")
      .setDescription("Im a bot made by Bounce Cafe Owner.");
      message.channel.sendEmbed(embed);
      break;
      case"help":
      var embed = new Discord.RichEmbed()
      .setDescription("Commands")
      .addField("Fun commands,","Ping info Gives u a bit of information. Prefix is + Working on other commands. ")
      .setColor("0x00FFFF")
      .setTitle("Moderation commands")
      .setDescription("Kick - Kicks people from the server")
      .setDescription("Ban - Bans people from the server!")
      .setTitle("Other commands")
      .setFooter("Bot made by BC Owner.")
      .setDescription("Say commands, serverinfo command, botinfo command, purge command and many more. Added Support command that dms you support server.")

      .setThumbnail(message.author.avatarURL)
     message.author.sendEmbed(embed);
      break;
      case"botinfo":
      var embed = new Discord.RichEmbed()
      .setDescription("Bot information")
      .setColor("#15f153")
      .setThumbnail(message.author.avatarURL)
      .addField("Bot Name", bot.user.username)
      .addField("Created On", bot.user.createdAt);
      message.channel.sendEmbed(embed);
      break;
      case"serverinfo":
      var embed = new Discord.RichEmbed()
      .setDescription("Server information")
      .setColor("#15f153")
      .addField("Server Name",message.guild.name)
      .addField("Created On", message.guild.createdAt)
      .addField("You Joined", message.member.joinedAt)
      .addField("Total Members", message.guild.memberCount);
      message.channel.sendEmbed(embed);
      break;
      case"kick":
      let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Can't find user!");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("~Kick~")
    .setColor("#e56b00")
    .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
    .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Kicked In", message.channel)
    .addField("Tiime", message.createdAt)
    .addField("Reason", kReason)
    let kickChannel = message.guild.channels.find(`name`, "incidents");
    if(!kickChannel) return message.channel.send("Can't find incidents channel.");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);
    break;
   
    case"ban":
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Can't find user!");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("No can do pal!");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("~Ban~")
    .setColor("#bc0000")
    .addField("Banned User", `${bUser} with ID ${bUser.id}`)
    .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Banned In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", bReason);

    let incidentchannel = message.guild.channels.find(`name`, "incidents");
    if(!incidentchannel) return message.channel.send("Can't find incidents channel.");

    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);
     break;
     case"say":
      // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing: 
    message.channel.send(sayMessage);
    break;
  case"report":
  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
     if(!rUser) return message.channel.send("Couldn't find user.");
    let rreason = args.join(" ").slice(22);
  
    let reportEmbed = new Discord.RichEmbed()
   .setDescription("Reports")
  .setColor("#15f153")
  .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
 .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
.addField("Channel", message.channel)
.addField("Time", message.createdAt)
.addField("Reason", rreason);

    let reportschannel = message.guild.channels.find(`name`, "reports");
   if(!reportschannel) return message.channel.send("Couldn't find reports channel.");

  
    message.delete().catch(O_o=>{});
     reportschannel.send(reportEmbed);
     break;
   
     case"support":
     var embed = new Discord.RichEmbed()
     .setTitle("Support")
     .setColor("#15f153")
     .setDescription("Need support Join this server and say your questions in Support channel. https://discord.gg/ns82PMQ");
     message.author.sendEmbed(embed);
     break;
     
     
     
 
default:
       message.channel.sendMessage("Invaild Command");
    }
  
});

bot.login(TOKEN);
