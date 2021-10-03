import { Command } from "@";

export default new Command({
    name: "test",
    description: "testing command",
    category: "private",
    test: true,
    run({ client, interaction }) {
        interaction.reply("Hello")
    }
})