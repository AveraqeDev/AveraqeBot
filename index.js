const Discord = require('discord.js');
const client = new Discord.Client();
const request = require('snekfetch')
const { RichEmbed } = require("discord.js")

const friends = ['251120969320497152', '296735951089303552', '234252100014571521', '86699222539206656']

const updateMemberCount = () => {
    const channel = global.guild.channels.find(id => id.id === '630911402701488138')
    if(channel) {
        channel.setName(`Members: ${global.guild.memberCount}`)
    }
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)
    global.guild = client.guilds.find(id => id.id === '630897931117133846')
    updateMemberCount();
    client.user.setPresence({
        game: {
            name: `AveraqeDev.com`,
            type: 0
        }
    })
})

client.on('message', msg => {
    if(msg.content.toLowerCase() === '!friend') {
        if(msg.channel !== global.guild.channels.get('630946793357705237')) {
            return msg.reply(`❌ Please run this command in the ${global.guild.channels.get('630946793357705237').toString()} channel`)
                    .then(m => {
                        m.delete(5000)
                        msg.delete(5000)
                    })
        }
        var member = msg.member
        if(friends.includes(member.id)) {
            member.addRole('630951009988116533')
            return msg.reply(`✅ You are one of AveraqeDev's friends! You have been given the role ${global.guild.roles.get('630951009988116533')}`)
                    .then(m => {
                        m.delete(5000)
                        msg.delete(5000)
                    })
        } else {
            return msg.reply(`❌ You are not one of AveraqeDev's friends! Please contact him if you believe this is an error.`)
                    .then(m => {
                        m.delete(5000)
                        msg.delete(5000)
                    })
        }
    }
})

client.on('message', msg => {
    if(msg.content.toLowerCase().startsWith('!8ball')) {
        if(msg.channel !== global.guild.channels.get('630946793357705237')) {
            return msg.reply(`❌ Please run this command in the ${global.guild.channels.get('630946793357705237').toString()} channel`)
                    .then(m => {
                        m.delete(5000)
                        msg.delete(5000)
                    })
        }
        const replies = ["It is certain",
		"It is decidedly so",
			"Without a doubt",
		"Yes, definitely",
			"You may rely on it",
		"As I see it, yes",
			"Most likely",
		"Outlook good",
			"Yes",
		"Signs point to yes",
			"Reply hazy try again",
		"Ask again later",
			"Better not tell you now",
		"Cannot predict now",
			"Concentrate and ask again",
		"Don't count on it",
			"My reply is no",
		"My sources say no",
			"Outlook not so good",
        "Very doubtful"];
        msg.replyText = Math.floor((Math.random() * replies.length) + 0)
        return msg.reply(replies[msg.replyText])
    }
    if(msg.content.toLowerCase().split('').join('') === '!roll') {
        if(msg.channel !== global.guild.channels.get('630946793357705237')) {
            return msg.reply(`❌ Please run this command in the ${global.guild.channels.get('630946793357705237').toString()} channel`)
                    .then(m => {
                        m.delete(5000)
                        msg.delete(5000)
                    })
        }
        return msg.reply(`✅ You rolled a ${Math.floor((Math.random() * 6) + 1)}`)
    }
    if(msg.content.toLowerCase() === '!ping') {
        if(msg.channel !== global.guild.channels.get('630946793357705237')) {
            return msg.reply(`❌ Please run this command in the ${global.guild.channels.get('630946793357705237').toString()} channel`)
                    .then(m => {
                        m.delete(5000)
                        msg.delete(5000)
                    })
        }
        msg.reply('Pong!')
    }
})

client.on('guildMemberAdd', member => {
    const channel = global.guild.channels.find('id', '630897931117133850')
    if(channel) {
        setTimeout(() => {
            channel.send(
                `✅ Welcome to Averaqe Community, ${member}! Member #${global.guild.memberCount}`
            )
            updateMemberCount();
        }, 1000)
    }
})

client.on('guildMemberRemove', () => {
    setTimeout(() => {
        updateMemberCount();
    }, 1000)
})

client.on('message', msg => {
    if(msg.content.toLowerCase().startsWith('!kick')) {
        if(!msg.member.hasPermission("KICK_MEMBERS")) {
            return msg.reply('❌ You do not have permissions to ban members.').then(m => m.delete(5000))
        }
        const member = msg.mentions.members.first()

        if(!member) {
            return msg.reply(
                '❌ Who are you trying to kick? You must mention a user.'
            ).then(m => m.delete(5000))
        }

        if(!member.kickable) {
            return msg.reply(`❌ I can't kick this user. Sorry!`)
                    .then(m => m.delete(5000))
        }

        return member.kick().then(() => msg.reply(`✅ ${member.user.tag} was kicked.`).catch(error => msg.reply(`Sorry, an error occured.`)))
    }
    if(msg.content.toLowerCase() === "!cc") {
        if(!msg.member.hasPermission('MANAGE_MESSAGES')) {
            return msg.reply('❌ You do not have permissions to clear the chat.').then(m => m.delete(5000))
        }
        (async () => {
            msg.delete();
            const fetched = await msg.channel.fetchMessages({ limit: 99 })
            msg.channel.bulkDelete(fetched)
        })()
    }
    if(msg.content.toLowerCase().includes('zack')) {
        return msg.reply(`Don't you mean CheeseDick?`)
    }
    if(msg.content.toLowerCase().includes('CheeseDick')) {
        return msg.channel.send(`<@296735951089303552> Someone is beckoning you!`)
    }
    if(msg.content.toLowerCase().includes('ryan')) {
        return msg.channel.send(`HAAAAANNNNKKKKKKKK`)
    }
    if(msg.content.toLowerCase().includes("matt")) {
        return msg.channel.send(`Oof`)
    }
    if(msg.content.toLowerCase() === '!cat') {
        const cat = request.get('https://aws.random.cat/meow')
        cat.then(r => msg.reply(r.body.file))
    }
    if(msg.content.toLowerCase() === '!dog') {
        const dog = request.get('https://dog.ceo/api/breeds/image/random')
        dog.then(r => msg.reply(r.body.message))
    }
})

client.on('message', msg => {
    if(msg.content.startsWith('!whois')) {
        if(msg.channel !== global.guild.channels.get('630946793357705237')) {
            return msg.reply(`❌ Please run this command in the ${global.guild.channels.get('630946793357705237').toString()} channel`)
                    .then(m => {
                        m.delete(5000)
                        msg.delete(5000)
                    })
        }
        const member = getMember(msg, msg.mentions.members.first)

        const joined = formatDate(member.getJoinedAt)
        const roles = member.roles.filter(r => r.id !== msg.guild.id).map(r => r).join(', ') || 'none'

        const created = formatDate(member.user.createdAt)

        const embed = new RichEmbed()
            .setFooter(member.displayName, member.user.displayedAvatarURL)
            .setThumbnail(member.user.displayedAvatarURL)
            .setColor(member.displayHexColor === '#000000' ? '#ffffff' : member.displayedHexColor)
            .addField('Member information:', stripIndents`**> Display name:** ${member.displayName}
            **> Joined at:** ${joined}
            **> Roles:** ${roles}`, true)
            .addField('User information:', stripIndents`**> ID:** ${member.user.id}
            **> Username:** ${member.user.username}
            **> Tag:** ${member.user.tag}
            **> Created at:** ${created}`).setTimestamp()

            if(member.user.presence.game) {
                embed.addField('Currently playing', stripIndents`**> Name:** ${member.user.presence.game.name}`)
            }

            msg.channel.send(embed)
    }
})

function getMember(msg, toFind = '') {
    toFind = toFind.toLocaleLowerCase

    let target = global.guild.members.get(toFind)

    if(!target && msg.mentions.members) {
        target = msg.mentions.members.first()
    }

    if(!target && toFind) {
        target = global.guild.members.find(member => {
            return member.displayName.toLowerCase().includes(toFind) ||
            member.user.tag.toLowerCase().includes(toFind)
        })
    }

    if(!target) {
        target = msg.member;
    }

    return target;
}

function formatDate(date) {
    return new Intl.DateTimeFormat('en-US').format(date)
}

async function promptMessage(msg, author, time, validReactions) {
    time += 1000

    for(const reaction of validReactions) await msg.react(reaction)

    const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id

    return msg.awaitReactions(filter, { max: 1, time: time }).then(collected => collected.first() && collected.first().emoji.name)
}

client.login(process.env.BOT_TOKEN)