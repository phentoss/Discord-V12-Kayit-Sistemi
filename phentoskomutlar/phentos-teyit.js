const Discord = require("discord.js");
const db = require("quick.db");
const ayar = require("../phentosayar.js");
const kdb = new db.table("kullanici");
const client = new Discord.Client();

module.exports.run = async (client, message, args) => {
 if(!message.member.roles.has(ayar.register) && (!message.member.hasPermission("ADMINISTRATOR"))) 
 return message.channel.send(`Bu komutu kullanabilmek için ayarlanan kayıt yetkisine sahip olmalısınız!`);
 let kullanıcı = message.mentions.users.first()
    
 
if(!kullanıcı) {
let erkek = kdb.fetch(`teyit.${message.author.id}.erkek`);
let kadın = kdb.fetch(`teyit.${message.author.id}.kadin`);
let kayıtlar = kdb.fetch(`teyit.${message.author.id}.toplam`); 
if(erkek === null) erkek = "0"  
if(erkek === undefined) erkek = "0"
if(kadın === null) kadın = "0"
if(kadın === undefined) kadın = "0"
if(kayıtlar === null) kayıtlar = "0"
if(kayıtlar === undefined) kayıtlar = "0"
return message.channel.send(new Discord.MessageEmbed().setColor("RANDOM").setFooter("Developed By Phentos")
.addField(`Toplam Kayıtları :`,`${kayıtlar}`, true)
.addField(`Erkek Kayıtları :`,`${erkek}`, true)
.addField(`Kadın Kayıtları :`,`${kadın}`, true))
};
  
if(kullanıcı) {
let erkek1 = kdb.fetch(`teyit.${kullanıcı.id}.erkek`);
let kadın1 = kdb.fetch(`teyit.${kullanıcı.id}.kadin`);
let kayıtlar1 = kdb.fetch(`teyit.${kullanıcı.id}.toplam`); 
if(erkek1 === null) erkek1 = "0"  
if(erkek1 === undefined) erkek1 = "0"
if(kadın1 === null) kadın1 = "0"
if(kadın1 === undefined) kadın1 = "0"
if(kayıtlar1 === null) kayıtlar1 = "0"
if(kayıtlar1 === undefined) kayıtlar1 = "0"
message.channel.send(new Discord.MessageEmbed().setColor("RANDOM").setFooter("Developed By Phentos")
.addField(`Toplam Kayıtları :`,`${kayıtlar1}`, true)
.addField(`Erkek Kayıtları :`,`${erkek1}`, true)
.addField(`Kadın Kayıtları :`,`${kadın1}`, true))
};
};

exports.config = {
  name: "teyit",
  guildOnly: true,
  aliases: ["me"],
};