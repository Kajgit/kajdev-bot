const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('djsplaylist')
        .setDescription('The Discord.JS V14 Series'),
    async execute(interaction) {
        const Embed = new EmbedBuilder()
        .setTitle("DJS Playlist")
        .setDescription("**PLAYLIST**\nhttps://www.youtube.com/watch?v=fbvNcXEXBdU&list=PLAGWPY8arhLRP7h-3YJ0yRKbcHQ_3KA_R&ab_channel=Kaj")
        .setColor("Random")
        interaction.reply({ embeds: [Embed], ephemeral: true })
    }
};