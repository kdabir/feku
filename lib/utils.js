export function printError(message, code=1) {
    console.error(message)
    process.exit(code)
}
