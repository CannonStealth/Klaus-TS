import { Command as Properties } from "../interfaces/Command"
import { client } from "@";
import { Snowflake } from "discord-api-types";

export class Command {

    public name;
    public category;
    private readonly test;
    private readonly options;
    public readonly run;
    public readonly description;


    constructor(properties: Properties) {

        this.name = properties.name
        this.description = properties.description
        this.category = properties.category
        this.test = properties.test
        this.run = properties.run

          this.options = {
          name: properties.name,
          description: properties.description,
          defaultPermission: properties.default === false ? false : true,
          options: properties.options
        }
    }

    public submit() {   
        
        const app = client.application
        if (!app) throw new Error("Client isn't logged in")
        
        
        if (this.test && client.testServers.length) {
            client.testServers.forEach((server) => {
                app.commands.create(this.options, server).then(e => client.log([{
                    name: "",
                    value: ["Posted command " + this.name]
                }], { justValue: true })).catch(() => undefined)
            })
        } else app.commands.create(this.options).then(e => client.log([{
            name: "",
            value: ["Posted command " + this.name]
        }], { justValue: true })).catch(() => undefined)
        
        return this;
    }

}

/**
 *     name: string;
    description: string;
    category: string
    default?: boolean;
    options?: Array<ApplicationCommandOptionData>;
    test?: boolean
 */