const Discord = require("discord.js");
const db = require("quick.db");
const ayar = require("../phentosayar.js");
const kdb = new db.table("kullanici");
client = new Discord.Client();

module.exports.run = async (client, message, args) => {
let uye = message.mentions.users.first() || message.author;
let bilgi = kdb.get(`teyit.${uye.id}.toplam`);
let yazı = "Top Teyit Listesi"
  
let top = message.guild.members.cache.filter(uye => kdb.get(`teyit.${uye.id}.toplam`)).array().sort((uye1, uye2) => Number(kdb.get(`teyit.${uye2.id}.toplam`))-Number(kdb.get(`teyit.${uye1.id}.toplam`))).slice(0, 15).map((uye, index) => (index+1)+" • <@"+ uye +"> | \`" + kdb.get(`teyit.${uye.id}.toplam`) +"\` Kayıta Sahip.").join('\n');
message.channel.send(new Discord.MessageEmbed().setAuthor(yazı).setTimestamp().setColor("RANDOM").setFooter("Developed Phentos").setDescription(top));
  
}

exports.config = {
  name: "topteyit",
  guildOnly: true,
  aliases: ["top"],
};