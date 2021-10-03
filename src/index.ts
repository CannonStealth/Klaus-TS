import "module-alias/register"
import "dotenv/config"
import { ClientClass } from "@"
const client = new ClientClass()

client.on("ready", () => client.init())

client.login(process.env.TOKEN)

export { client };