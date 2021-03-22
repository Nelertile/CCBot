const Discord = require('discord.js')
const client = new Discord.Client()
const guildId = '751436479406014474'
const config = require('./config.json')
require('dotenv').config()

const getApp = (guildId) => {
    const app = client.api.applications(client.user.id)
    if (guildId) {
        app.guilds(guildId)
    }
    return app
}

client.on('ready', async() => {
    console.log('The client is ready!')

    const commands = await getApp(guildId).commands.get()
    console.log(commands)

    await getApp(guildId).commands.post({
        data: {
            name: 'ping',
            description: 'A simple ping pong command',
        },
        data: {
            name: 'serverage',
            description: 'Tells you when the CyberCraftio server Started',
        },
    })

    client.ws.on('INTERACTION_CREATE', async (interaction) => {
        const command = interaction.data.name.toLowerCase()

        if (command === 'ping') {
            reply(interaction, 'pong')
        }
        if (command === 'serverage') {
            reply(interaction, 'the server started on the 23 of december.')
        }
    })
})

const reply = (interaction, response) => {
    client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 4,
            data: {
                content: response,
            },
        },
    })

}

client.login(process.env.TOKEN)