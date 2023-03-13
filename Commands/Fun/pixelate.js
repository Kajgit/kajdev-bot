const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pixelate")
        .setDescription("Get a pixelated form of a user's avatar, easy as that")
        .addUserOption((option) =>
            option.setName("user").setDescription("Select a user")
        ),

    async execute(interaction, client) {
        const { options, user } = interaction;

        let target = options.getUser("user") || user;

        let avatarUrl = target.avatarURL({ size: 512, extension: "jpg" });
        let canvas = `https://some-random-api.ml/canvas/pixelate?avatar=${avatarUrl}`;

        await interaction.reply({
            content: canvas,
        });
    },
};