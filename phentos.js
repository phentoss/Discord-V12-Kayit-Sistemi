const Discord = require("discord.js")     
const client = new Discord.Client();      
const config = require("./phentosayar.js")    
const moment = require ('moment');
const chalk = require ('chalk');
const fs = require("fs");                
require('./util/Loader.js')(client);    

client.commands = new Discord.Collection(); 
client.aliases = new Discord.Collection();  
fs.readdir('./phentoskomutlar/', (err, files) => { 
  if (err) console.error(err);               
  console.log(`${files.length} komut yüklenecek.`); 
  files.forEach(f => {                      
    let props = require(`./phentoskomutlar/${f}`);  
    console.log(`${props.config.name} komutu yüklendi.`);  
    console.log(`Phentos Moruk`)     
    client.commands.set(props.config.name, props); 
    props.config.aliases.forEach(alias => {          
      client.aliases.set(alias, props.config.name);  
    });
  });
})

client.login(config.token)

////////////////// -Hoşgeldin- //////////////////
   client.tarihHesapla = (date) => {
  const startedAt = Date.parse(date);
  var msecs = Math.abs(new Date() - startedAt);

  const years = Math.floor(msecs / (1000 * 60 * 60 * 24 * 365));
  msecs -= years * 1000 * 60 * 60 * 24 * 365;
  const months = Math.floor(msecs / (1000 * 60 * 60 * 24 * 30));
  msecs -= months * 1000 * 60 * 60 * 24 * 30;
  const weeks = Math.floor(msecs / (1000 * 60 * 60 * 24 * 7));
  msecs -= weeks * 1000 * 60 * 60 * 24 * 7;
  const days = Math.floor(msecs / (1000 * 60 * 60 * 24));
  msecs -= days * 1000 * 60 * 60 * 24;
  const hours = Math.floor(msecs / (1000 * 60 * 60));
  msecs -= hours * 1000 * 60 * 60;
  const mins = Math.floor((msecs / (1000 * 60)));
  msecs -= mins * 1000 * 60;
  const secs = Math.floor(msecs / 1000);
  msecs -= secs * 1000;

  var string = "";
  if (years > 0) string += `${years} yıl ${months} ay`
  else if (months > 0) string += `${months} ay ${weeks > 0 ? weeks+" hafta" : ""}`
  else if (weeks > 0) string += `${weeks} hafta ${days > 0 ? days+" gün" : ""}`
  else if (days > 0) string += `${days} gün ${hours > 0 ? hours+" saat" : ""}`
  else if (hours > 0) string += `${hours} saat ${mins > 0 ? mins+" dakika" : ""}`
  else if (mins > 0) string += `${mins} dakika ${secs > 0 ? secs+" saniye" : ""}`
  else if (secs > 0) string += `${secs} saniye`
  else string += `saniyeler`;

  string = string.trim();
  return `\`${string} önce\``;
};
 client.on("guildMemberAdd", (member, message) => {
      const sunucuid = "804259678644469760"; //Sunucu 
      const id = "806162034252185650"; //Kanal 
      const kayıtsızRole = "804259974866927668"; //Kayıtsız rol 
      const jailRole = "804259975621902406"
      if (member.guild.id !== sunucuid) return;
      const channel = member.guild.channels.cache.get(id);
    let memberGün = moment(member.user.createdAt).format("DD");
    let memberTarih = moment(member.user.createdAt).format("YYYY HH:mm:ss");
    let guvenilirlik = Date.now()-member.user.createdTimestamp < 1000*60*60*24*7;
    let memberAylar = moment(member.user.createdAt).format("MM").replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık");
    let üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
    var üs = üyesayısı.match(/([0-9])/g)
    üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
      if(üs) {
      üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
        return {
          '0': `<a:bsayi0:804425251538206800>   `,
          '1': `<a:bsayi1:804425258559078470> `,
          '2': `<a:bsayi2:804425267816300574> `,
          '3': `<a:bsayi3:804425264120594543> `,
          '4': `<a:bsayi4:804425261013663745> `,                  
          '5': `<a:bsayi5:804425255217004544> `,
          '6': `<a:bsayi6:804425273016713216>`,
          '7': `<a:bsayi7:804425288875638824> `,
          '8': `<a:bsayi8:804425269715796009> `,
          '9': `<a:bsayi9:804425290822451331>`}[d];
            })
          } 
    const phentosfoto = new Discord.MessageAttachment("https://media.discordapp.net/attachments/751273426651709440/806160822010380388/evils_banner.gif");
    channel.send(`<a:byuvarlanma:804422840098357248> Hoş geldin, ${member} Seninle Beraber ${üyesayısı} Kişiyiz!\n<a:byuvarlanma:804422840098357248> Kaydının yapılması için sesli kanala bağlanıp teyit vermen gerekli.\n<a:byuvarlanma:804422840098357248> <@&rolid> rolündeki yetkililer seninle ilgilenecektir.\n<a:byuvarlanma:804422840098357248> #kurallar kanalından sunucumuzun kurallarını okumayı ihmal etme!
    \n<a:byuvarlanma:804422840098357248> Bu Hesap Şüpheli mi ? ${guvenilirlik ? "Evet <a:biptal:804422826945675365>" : "Hayır <a:bonay2:804422835879149568>" }\n<a:byuvarlanma:804422840098357248> Bu Hesabın Kuruluş Tarihi: ${memberGün} ${memberAylar} ${memberTarih} **(**${member.client.tarihHesapla(member.user.createdAt)}**)**
      `,phentosfoto)
     if (guvenilirlik) {
    member.roles.set(["804259975621902406"])
    member.roles.add("804259975621902406")
      return;  
      }
     
    });
