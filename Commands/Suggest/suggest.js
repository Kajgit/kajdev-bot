const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");
const suggestionSchema = require("../../Models/Suggestion");
const suggestSchema = require("../../Models/SuggestChannel");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("suggest")
        .setDescription("Place a suggestion.")
        .setDMPermission(false),
    async execute(interaction) {
        const { guildId } = interaction;

        suggestSchema.findOne({ GuildID: guildId }, async (err, data) => {

            if (!data || !data.ChannelID) {
                return interaction.reply({ content: "The suggestion system is not set up yet.", ephemeral: true });
            }

            if (data.Enabled === false) {
                return interaction.reply({ content: "The suggestion system is currently disabled.", ephemeral: true });
            }

            const modal = new ModalBuilder()
                .setCustomId('suggestModal')
                .setTitle("Make a suggestion")

            const modalTitle = new TextInputBuilder()
                .setCustomId('modalSuggestTitle')
                .setLabel("Type")
                .setStyle(TextInputStyle.Short)
                .setPlaceholder('For example: Youtube Video')
                .setMaxLength(128)
                .setRequired(true);

            const modalDescription = new TextInputBuilder()
                .setCustomId('modalSuggestDescription')
                .setLabel("Description")
                .setPlaceholder("Briefly explain your suggestion")
                .setStyle(TextInputStyle.Paragraph)
                .setRequired(true);

            const firstActionRow = new ActionRowBuilder().addComponents(modalTitle);
            const fifthActionRow = new ActionRowBuilder().addComponents(modalDescription);

            modal.addComponents(
                firstActionRow,
                fifthActionRow
            );

            await interaction.showModal(modal);

            if (err)
                return interaction.reply({ embeds: [new EmbedBuilder().setDescription("⛔ | Something went wrong!").setColor("Red")], ephemeral: true })
        });
    }
}