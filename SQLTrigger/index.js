module.exports = async function (context, todoChanges) {
    context.log(`SQL Changes: ${JSON.stringify(todoChanges)}`)
}
