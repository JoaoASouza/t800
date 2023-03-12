const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Pula uma música'),
    async execute(interaction, distube) {

        await interaction.reply('⏩ Pulando...')

        const queue = distube.getQueue(interaction)
        if (!queue) return interaction.channel.send(`Não tem nada na fila agora`)
        try {

            if (!queue.autoplay && queue.songs.length == 1) {
                queue.stop()
                return
            }

            const song = await queue.skip()
            interaction.channel.send(`Pulado! Agora tocando:\n${song.name}`)
        } catch (e) {
            interaction.channel.send(`${e}`)
        }

    }
}