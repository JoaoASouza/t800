const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Toca uma música')
        .addStringOption(option =>
			option
				.setName('songname')
				.setDescription('Nome da música')),
    async execute(interaction, distube) {

        const songName = interaction.options.getString('songname')

        if (!songName) {
            await interaction.reply('Tem que dizer o nome da música né, bonitão?')
            return;
        }

        await interaction.reply('▶️ Tocando...')

        const voiceChannel = interaction.member?.voice?.channel;

		if (voiceChannel) {
			distube.play(voiceChannel, songName, {
				interaction,
				textChannel: interaction.channel,
				member: interaction.member,
			});
		} else {
			await interaction.reply(
				'Você tem que entra num canal de voz primeiro',
			);
		}
        
    }
}