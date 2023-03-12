const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Limpa a fila'),
    async execute(interaction, distube) {

        await interaction.reply('❌ Limpando a fila...')

        const queue = distube.getQueue(interaction)
        if (!queue) return interaction.channel.send(`Não tem nada na fila agora`)
        try {
            queue.stop()
        } catch (e) {
            interaction.channel.send(`${e}`)
        }

    }
}