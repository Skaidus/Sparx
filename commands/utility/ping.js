const { SlashCommandBuilder } = require('discord.js');
const {metricCmdCalls} = require('../../prometheus')

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		metricCmdCalls.labels({methodName:'ping'}).inc();
		await interaction.reply('Pong!');
	},
};