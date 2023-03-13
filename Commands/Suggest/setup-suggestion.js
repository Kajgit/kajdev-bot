const { SlashCommandBuilder, EmbedBuilder, ChannelType } = require("discord.js");
const suggestSchema = require("../../Models/SuggestChannel");

module.exports = {
    adminOnly: true,
    data: new SlashCommandBuilder()
        .setName("suggests")
        .setDescription("Set up your suggesting channel for the suggestions.")
        .setDMPermission(false)
        .addSubcommand(subcommand =>
            subcommand.setName("setup")
                .setDescription("Setup the suggestion system.")
                .addIntegerOption(option =>
                    option.setName("max-reactions")
                        .setDescription("Set a maxiumum of reactions for the bot to accept or decline the suggestion.")
                        .setRequired(true)
                )
                .addChannelOption(option =>
                    option.setName("channel")
                        .setDescription("Channel for suggesting messages.")
                        .addChannelTypes(ChannelType.GuildText)
                        .setRequired(false)
                )
        )
        .addSubcommand(subcommand =>
            subcommand.setName("configure")
                .setDescription("Configure the suggestion system.")
                .addIntegerOption(option =>
                    option.setName("max-reactions")
                        .setDescription("Set a maxiumum of reactions for the bot to accept or decline the suggestion.")
                        .setMaxValue(1000)
                        .setMinValue(1)
                )
                .addChannelOption(option =>
                    option.setName("channel")
                        .setDescription("Channel for suggesting messages.")
                        .addChannelTypes(ChannelType.GuildText)
                )
                .addStringOption(option =>
                    option.setName("toggle")
                        .setDescription(`Do you want to enable/disable the suggestion system?`)
                        .addChoices(
                            { name: "Enable", value: "enable" },
                            { name: "Disable", value: "disable" }
                        )
                )
        ),

    async execute(interaction) {
        const { channel, guildId, options } = interaction;

        const subcommand = options.getSubcommand();

        const embed = new EmbedBuilder()
            .setColor("Green")
            .setTimestamp();

        switch (subcommand) {
            case "setup":
                const suggestChannel = options.getChannel("channel") || channel;
                const maxReactions = options.getInteger("max-reactions");

                suggestSchema.findOne({ GuildID: guildId }, async (err, data) => {
                    if (data) {
                        embed.setDescription("The suggestion system is already set up. Please use `/suggests configure` to make any changes.")
                    } else {
                        await suggestSchema.create({
                            GuildID: guildId,
                            ChannelID: suggestChannel.id,
                            Reactions: maxReactions,
                            Enabled: true
                        });

                        embed.setDescription("Data was succesfully sent to the database.")
                    }

                    if (err) {
                        embed.setDescription("Something went wrong. Please contact the developers.")
                            .setColor("Red")
                            .setTimestamp();
                    }

                    return interaction.reply({ embeds: [embed], ephemeral: true });
                });
            case "configure":
                const newChannel = options.getChannel("channel") || channel;
                const newMaxReactions = options.getInteger("max-reactions");
                const toggler = options.getString("toggle");

                suggestSchema.findOne({ GuildID: guildId }, async (err, data) => {

                    if (!data) 
                        return interaction.reply({ content: "The suggestion system is not set up yet. Use `/suggests setup` to set it up.", ephemeral: true });
                    

                    data.ChannelID = newChannel.id;
                    data.Reactions = newMaxReactions;
                    switch (toggler) {
                        case "enable":
                            data.Enabled = true;
                            break;
                        case "disable":
                            data.Enabled = false;
                            break;
                    }
                    data.save();

                    if (err) {
                        embed.setDescription("Something went wrong. Please contact the developers.")
                            .setColor("Red")
                            .setTimestamp();
                    }

                    embed.setDescription("Succesfully updated the configuration.");

                    return interaction.reply({ embeds: [embed], ephemeral: true });
                });
        }
    }
}