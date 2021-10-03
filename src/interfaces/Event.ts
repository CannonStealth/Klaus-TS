import { Awaited, ClientEvents } from "discord.js"
import { ClientClass } from "@"

export interface EventInterface<V extends keyof ClientEvents> {
    name: V;
    run: (client: ClientClass, ...parameters: ClientEvents[V]) => Awaited<void>
}