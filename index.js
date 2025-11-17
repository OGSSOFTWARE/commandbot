require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers // Wichtig für Member-Events
  ]
});

const embeds = {
  vouch: new EmbedBuilder()
    .setTitle('Please Leave A Vouch - Get 10% Off')
    .setURL('https://ogsware.com/')
    .setDescription(`If you would like to receive a **10% discount** on your next order, please leave a https://discord.com/channels/1339668113473409186/1339668114517917822 by following these steps:


<:YellowDot:1381703990781415424> Use the command /vouch  
<:YellowDot:1381703990781415424> Rate your purchase from 1 to 5 stars  
<:YellowDot:1381703990781415424> Write a brief review about your experience  
<:YellowDot:1381703990781415424> Attach a picture (this is crucial)

Once you've completed these steps, contact the server owner to claim your **10% discount** on your next order.`)
    .setColor('#FFFF00')
    .setImage('https://media.discordapp.net/attachments/1376632471260762112/1376632582149640212/G23FX56.gif')
    .setFooter({
      text: 'OGSWare | © 2025 Copyright. All Rights Reserved.',
      iconURL: 'https://media.discordapp.net/attachments/1376632471260762112/1376632582590173315/IMG_3328.gif'
    }),

  paypal: new EmbedBuilder()
    .setTitle('Interested In Purchasing? - Purchase With PayPal')
    .setURL('https://ogsware.com/')
    .setDescription(`Thank you for your interest in our services, to start your **PayPal payment** please follow these instructions:


<:YellowDot:1381703990781415424> Send as Family & Friends  
<:YellowDot:1381703990781415424> Send from PayPal balance  
<:YellowDot:1381703990781415424> Do not provide a note

**PayPal Link: https://www.paypal.com/paypalme/ogstools**`)
    .setColor('#FFFF00')
    .setImage('https://media.discordapp.net/attachments/1376632471260762112/1376632582149640212/G23FX56.gif')
    .setFooter({
      text: 'OGSWare | © 2025 Copyright. All Rights Reserved.',
      iconURL: 'https://media.discordapp.net/attachments/1376632471260762112/1376632582590173315/IMG_3328.gif'
    }),
};

// ⏱ Dauerhaft Status setzen
client.once('ready', async () => {
  console.log(`✅ Logged in as ${client.user.tag}`);

  const setBotPresence = () => {
    client.user.setPresence({
      activities: [{ name: '⭐ ogsware.com', type: 3 }],
      status: 'online'
    });
  };

  setBotPresence();
  setInterval(setBotPresence, 15 * 60 * 1000); // Alle 15 Minuten aktualisieren
});

// 📩 Nachrichtenbefehle
client.on('messageCreate', async message => {
  if (message.author.bot) return;

  const cmd = message.content.toLowerCase();

  const commands = {
    '!vouch': 'vouch',
    '!paypal': 'paypal',
  };

  if (commands[cmd] && embeds[commands[cmd]]) {
    await message.delete().catch(err => console.error('❌ Failed to delete message:', err));
    return message.channel.send({ embeds: [embeds[commands[cmd]]] });
  }
});

// 🎉 Neuer Benutzer tritt dem Server bei
client.on('guildMemberAdd', async member => {
  const logChannelId = '1339668114702602424'; // 🟡 DEIN Channel-ID hier

  const channel = member.guild.channels.cache.get(logChannelId);
  if (!channel) return console.error('❌ Log channel not found.');

  const welcomeEmbed = new EmbedBuilder()
    .setTitle('🎉 New Member Joined')
    .setDescription(`Welcome <@${member.id}> to **${member.guild.name}**!`)
    .setColor('#FFFF00')
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .addFields(
      {
        name: 'Username',
        value: `${member.user.username}#${member.user.discriminator}`, // korrektes Format
        inline: true
      },
      {
        name: 'Account Created',
        value: `<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>`,
        inline: true
      }
    )
    .setFooter({
      text: `User ID: ${member.id}`,
      iconURL: 'https://media.discordapp.net/attachments/1376632471260762112/1376632582590173315/IMG_3328.gif'
    })
    .setTimestamp();

  channel.send({ embeds: [welcomeEmbed] }).catch(console.error);
});

client.login(process.env.DISCORD_TOKEN);


