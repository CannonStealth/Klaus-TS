export interface Command {
    name: string,
    aliases?: string | string[]
    category?: string
}