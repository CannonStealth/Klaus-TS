export default interface Command {
    name: string,
    aliases?: string | string[]
    category?: string
}