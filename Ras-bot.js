const Discord = require('discord.js') // discord.js modülü tanımlıyoruz.
const client = new Discord.Client() // client tanımalamsı
const { readdirSync } = require('fs'); // tanımlamalar
const { join } = require('path'); // tanımlamalar
const { Client, MessageEmbed } = require('discord.js')

client.commands= new Discord.Collection(); // komutları alıyoruz

const prefix = "ras!"

const commandFiles = readdirSync(join(__dirname, "komutlar")).filter(file => file.endsWith(".js")); // Belli bir klasörden belli .js uzantılı dosyaları buluyor.

for (const file of commandFiles) {
    const command = require(join(__dirname, "komutlar", `${file}`));
    client.commands.set(command.kod, command); // Komutları Ayarlıyoruz.
}

client.on("error", console.error);

client.on('ready', () => {
    client.user.setActivity('Ras-BOT Küçük Bir Bot.')
    console.log('Botumuz Aktif')
});

client.on("message", async message => {

    if(message.author.bot) return;

    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);

        const command = args.shift().toLowerCase();

        if(!client.commands.has(command)) return;


        try {
            client.commands.get(command).run(client, message, args);

        } catch (error){
            console.error(error);
        }
    }
})

client.on('ready', () => {
  console.log(`botunuz aktif. ${client.user.tag}!`);
});

client.on('guildMemberAdd', member => {
   const girişçıkış = member.guild.channels.cache.find(channel => channel.name === 'gelen-giden');
   girişçıkış.send(`Kimler Gelmiş!Hoş Geldin :), ${member}`);
});

client.on('guildMemberRemove', member => {
    const girişçıkış = member.guild.channels.cache.find(channel => channel.name === 'gelen-giden');
   girişçıkış.send(`${member} Aramızdan Ayrıldı Onu Özleyeceğiz :( ,`);
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
    msg.channel.send('As Hg Karşm');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'bb') {
    msg.channel.send('görüşürüz kendine iyi bak :) ');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'by') {
    msg.channel.send('görüşürüz kendine iyi bka karşim :) ');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === '@Ras-BOT') {
    msg.channel.send('prefix:ras!');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'davet_link') {
    msg.author.send('https://discord.com/oauth2/authorize?client_id=842451043379183697&scope=bot&permissions=8589934591');
  }
});

client.on("message", message => {
  if (message.content.startsWith('ras!rolver')) {
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Yetkin Yok')
    let role = message.mentions.roles.first();
    let member = message.mentions.members.first();
    member.roles.add(role)
  }
});

client.on("guildMemberAdd", member => {
  try {
  let role = member.guild.roles.cache.find(role => role.name === 'Üye')
  member.roles.add(role);
} catch(e) {
  console.log(e)
}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'destek_sunucusu') {
    msg.author.send('https://discord.gg/3aVakRBu5n');
  }
});

var oyun = [
"Yardım Menüsü Gelmiştir ras!yardım",
"Destek Sunucusu: ras!destek",
"Toplu Mesaj Silme Komudu Gelmiştir",
"Avatar Ve Ping Komutu Gelmiştir",
"Un Ban komudu Gelmiştir ras!unban",
""
];

setInterval(function() {

var random = Math.floor(Math.random()*(oyun.length-0+1)+0);

client.user.setActivity(oyun[random]);
}, 2 * 2500);

client.login('ODQyNDUxMDQzMzc5MTgzNjk3.YJ1frA.AJ1IZhlzuj-DkcDYmd_F1tzpfdA')
