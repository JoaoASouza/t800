const { Client, Intents } = require('discord.js')
const { birthdays } = require('./birthdays.json')
const cron = require('cron')

const dotenv = require('dotenv');

dotenv.config();

const token = process.env.DISCORD_TOKEN

const client = new Client({ intents: [Intents.FLAGS.GUILDS]})

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

client.login(token)