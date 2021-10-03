import { Event } from "@"

export default new Event({
  name: "interactionCreate",
  async run(client, interaction) {

    try {

    if (!interaction.inGuild() && interaction.isCommand()) {
      return interaction.reply("Try using slash commands in a guild!");
    }

    const user = interaction.user;
    const member = await interaction.guild!.members.fetch(user.id);
    const guild = interaction.guild!;

    if (interaction.isCommand()) {
      let cmd = client.commands.get(interaction.commandName)

      if (!cmd) return;
      cmd.run({ client, interaction, member, guild, user }); 
      return;
    }

    return;

  } catch {
    return;
  }
  }
  });
