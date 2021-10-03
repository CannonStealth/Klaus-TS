import { Client, ClientEvents, Collection, Snowflake } from "discord.js";
import { Command, log, caps, Event } from "@"
import { join } from "path"
import { readdir, lstat } from "fs/promises";

export class ClientClass extends Client {

    public commands: Collection<string, Command>
    public aliases: Collection<string, string>
    public categories: Collection<string, string[]>
    public readonly dir;
    public log;
    public readonly invite;
    public readonly testServers: Snowflake[];

    constructor() {
        super({ intents: 32767 })

        this.testServers = ["741157880211701803"]
        this.dir = __dirname
        this.commands = new Collection()
        this.aliases = new Collection()
        this.categories = new Collection()
        this.log = log
        this.invite = "https://discord.com/oauth2/authorize?client_id=894282303348547614&scope=applications.commands%20bot&permissions=8589934591"
    }

    public async load<T>(path: string, callback?: (file: T) => unknown) {
        const folders = await readdir(join(this.dir, path))

        for (const folder of folders) {
            const file = join(this.dir, path, folder)
            const stat = await lstat(file)

            if (stat.isDirectory()) {
                this.load(file)
                continue
            }

            if (folder.endsWith(".js") || (folder.endsWith(".ts") && !folder.endsWith(".d.ts"))) {
                const parameter: T = (await import(file)).default

                if (callback) callback(parameter)
            }
        }
    }


    public async init() {

        this.log([{
            name: "Client", 
            value: ["Starting Client"]
        }, { 
            name: "Commands",
            value: []
        }], { start: true })
  
        await this.load<Command>("../commands", command => {        

            command.category = caps(command.category)
            command.name = command.name.toLowerCase()

            const category = this.categories.get(command.category)
            if (!category) this.categories.set(command.category, [command.name])
            else category.push(command.name)


            this.commands.set(command.name, command)
             

            log([{
                name: "",
                value: [`Loading command ${command.name}`]
            }], { justValue: true })
        })

        await this.load<Event<keyof ClientEvents>>("../events", event => {
            this.log([{
                name: "Events",
                value: ["Loading event " + event.name]
            }])
            this.on(event.name, event.run.bind(null, this))
        })
    }
}

