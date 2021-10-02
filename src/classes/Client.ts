import { Client, Collection } from "discord.js";
import Command from "../interfaces/Command"
import { join } from "path"
import { readdir, lstat } from "fs/promises";
import log from "../utils/logs"

export default class extends Client {

    public commands: Collection<string, Command>
    public aliases: Collection<string, string>
    public categories: Collection<string, string[]>
    public dir: string
    public log: typeof log

    constructor() {
        super({ intents: 32767 })

        this.dir = __dirname
        this.commands = new Collection()
        this.aliases = new Collection()
        this.categories = new Collection()
        this.log = log
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
            value: []
        }], { start: true })

  
        await this.load<Command>("../commands", command => {
            let {
                category: cmdCategory = "Misc",
                name,
                aliases
            } = command

            const category = this.categories.get(cmdCategory)
            if (!category || !category.length) this.categories.set(cmdCategory, [name])
            else category.push(name)

            if (aliases && typeof aliases === "string") aliases = [aliases]

            if (aliases && aliases.length) for (const alias of aliases) this.aliases.set(alias, name)

            this.commands.set(name, command) 

       

        })
    }
}

