import resume from "./resume"

export default function log(data: Data[], options: Partial<{ start: boolean, end: boolean, justValue: boolean, size: number }> = { start: false, end: false, justValue: false, size: 68 }) {

    const { start = false, end = false, justValue = false, size = 68 } = options

    if (justValue) {
        data[0].value.forEach(val => {
            console.log(`║${(" > " + resume(val, size, 6)).padEnd(size)}║`) 
        })

        if (end) console.log(`╚${"═".repeat(size)}╝`)
        return;
    }
    if (start) {
    helper(data[0].name, size, true)
    data[0].value.forEach(val => {
        console.log(`║${(" > " + resume(val, size, 6)).padEnd(size)}║`) 
    })
    data.shift()
}

    for (const text of data) {
        helper(text.name, size)
        text.value.forEach(val => {
            console.log(`║${(" > " + resume(val, size, 6)).padEnd(size)}║`) 
        })
    } 
    if (end) console.log(`╚${"═".repeat(size)}╝`)
}

 function helper(text: string, size = 68, start = false) {

    text = ` ( ${text} ) `;
    if (start) console.log(`╔${text.padStart(size / 2 + text.length / 2, "═").padEnd(size, "═")}╗`)
    else console.log(`╠${text.padStart(size / 2 + text.length / 2, "═").padEnd(size, "═")}╣`)
}

interface Data {
    name: string,
    value: string[]
}