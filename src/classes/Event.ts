import { Event as Properties } from "@";
import { ClientEvents, Awaited } from "discord.js";
import { ClientClass } from "@"

export class Event<V extends keyof ClientEvents> {
    public readonly name: V;
    public readonly run: (client: ClientClass, ...parameters: ClientEvents[V]) => Awaited<void>;

    constructor(properties: Properties<V>) {
        this.name = properties.name;
        this.run = properties.run
    }
}