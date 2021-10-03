import { ApplicationCommandOptionData, CommandInteraction, GuildMember, Guild, User } from "discord.js"
import { ClientClass } from "@"

export interface Command {
    name: string;
    description: string;
    category: string
    default?: boolean;
    options?: Array<ApplicationCommandOptionData>;
    test?: boolean

    run: (options: {
        client: ClientClass,
        interaction: CommandInteraction;
        member: GuildMember;
        guild: Guild;
        user: User;
    }) => unknown;
}