const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const { Client, Intents, Message } = require('discord.js')
const { birthdays } = require('./birthdays.json')
const cron = require('cron')

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]})

function prepareBirthdayMessage(userName, birthDay) {

    let scheduledMessage = new cron.CronJob(`00 01 00 ${birthDay.getDate() + 1} ${birthDay.getMonth()} *`, () => {

        const guild = client.guilds.cache.get('759556197887639572')
        const channel = guild.channels.cache.get('904039024300269599')

        channel.send(`Parabéns, ${userName}!`)

    })

    scheduledMessage.start()
}

client.once('ready', () => {
    console.log("Tudo pronto")

    birthdays.forEach(birthday => {

        let birthdayDate = new Date(birthday.date)
        prepareBirthdayMessage(birthday.name, birthdayDate)

    })
})

client.on("messageCreate", (msg) => {

    if (msg.author.bot) return

    const prefix = "$"
    if (!msg.content.startsWith(prefix)) return

    const message = msg.content.slice(1)
    const tokens = message.split(" ")

    const command = tokens.shift()


    if (command == "letra" || command == "traducao") {

        const artist = tokens.slice(0, tokens.indexOf("-")).join(" ")
        const song = tokens.slice(tokens.indexOf("-") + 1).join(" ")

        fetch(`https://api.vagalume.com.br/search.php?art=${artist}&mus=${song}`)
            .then(response => response.json())
            .then(result => {

                if (result.type == "notfound") {
                    msg.channel.send("Não encontrei o artista " + artist)
        
                } else if (result.type == "song_notfound") {
                    msg.channel.send("Não encontrei a música " + song)
        
                } else if (command == "letra") {
                    msg.channel.send(result.mus[0].text)
                }

                else if (command == "traducao") {
                    msg.channel.send(result.mus[0].translate[0].text)
                }

            })
            .catch(err => {
                msg.channel.send("Deu ruim aqui -> " + err)
            })
    }

})

client.login(process.env.DISCORD_TOKEN)