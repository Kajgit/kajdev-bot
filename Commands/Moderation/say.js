const { SlashCommandBuilder, ModalBuilder, TextInputStyle, TextInputBuilder, ActionRowBuilder } = require('discord.js');

module.exports = {
    moderatorOnly: true,
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Say a certain thing through the bot')
        .setDMPermission(false),
    async execute(interaction) {

        const modal = new ModalBuilder()
            .setCustomId('sayModal')
            .setTitle("Say something!")

        const modalTitle = new TextInputBuilder()
            .setCustomId('modalSayTitle')
            .setLabel("Title (leave blank if none)")
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('Cool Title!')
            .setMaxLength(256)
            .setRequired(false);

        const modalColor = new TextInputBuilder()
            .setCustomId('modalSayColor')
            .setLabel("HEX Color Code (leave blank if none)")
            .setStyle(TextInputStyle.Short)
            .setMaxLength(7)
            .setPlaceholder('#000000')
            .setRequired(false);
        const modalThumbnail = new TextInputBuilder()
            .setCustomId('modalSayThumbnail')
            .setLabel("Thumbnail link (leave blank if none)")
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('https://image.com/example.png')
            .setRequired(false);

        const modalTimestamp = new TextInputBuilder()
            .setCustomId('modalSayTimestamp')
            .setLabel("Enable timestamp?")
            .setMaxLength(3)
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('Yes/No')
            .setRequired(true);

        const modalDescription = new TextInputBuilder()
            .setCustomId('modalSayDescription')
            .setLabel("Description (leave blank if none)")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(false);


        const firstActionRow = new ActionRowBuilder().addComponents(modalTitle);
        const secondActionRow = new ActionRowBuilder().addComponents(modalColor);
        const thirdActionRow = new ActionRowBuilder().addComponents(modalThumbnail);
        const fourthActionRow = new ActionRowBuilder().addComponents(modalTimestamp);
        const fifthActionRow = new ActionRowBuilder().addComponents(modalDescription);

        modal.addComponents(
            firstActionRow,
            secondActionRow,
            thirdActionRow,
            fourthActionRow,
            fifthActionRow
        );

        await interaction.showModal(modal);
    }
};