const ytdl = require('ytdl-core')

module.exports = client => {
    const queue = new Map()

    client.on('message', async msg => {
        if(msg.author.bot) return;

        if(!msg.content.startsWith("!")) return

        const serverQueue = queue.get(msg.guild.id)

        if(msg.content.toLowerCase().startsWith('!play')) {
            execute(msg, serverQueue)
            return
        } else if(msg.content.toLowerCase().startsWith("!skip")) {
            skip(msg, serverQueue)
            return
        } else if(msg.content.toLowerCase().startsWith('!stop')) {
            stop(msg, serverQueue)
            return
        } else if(msg.content.toLowerCase().startsWith('!nowplaying')) {
            nowPlaying(msg, serverQueue)
            return
        }
    })

    async function execute(msg, serverQueue) {
        const args = msg.content.split(' ')
        const voiceChannel = msg.member.voiceChannel
        if(!voiceChannel) return msg.channel.send('❌ You need to be in a voice channel to play music!')
        const permissions = voiceChannel.permissionsFor(msg.client.user)
        if(!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
            return message.channel.send('❌ I need the permissions to join and   speak in your voice channel!')
        }
    
        const songInfo = await ytdl.getInfo(args[1])
        const song = {
            title: songInfo.title,
            url: songInfo.video_url
        }
    
        if(!serverQueue) {
            const queueConstruct = {
                textChannel: msg.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 5,
                playing: true
            }
    
            queue.set(msg.guild.id, queueConstruct)
    
            queueConstruct.songs.push(song)
    
            try {
                var connection = await voiceChannel.join()
                queueConstruct.connection = connection
                this.play(msg, queueConstruct.songs[0])
            } catch (err) {
                console.log(err)
                queue.delete(msg.guild.id)
                return msg.channel.send(err)
            }
        } else {
            serverQueue.songs.push(song)
            return msg.channel.send(`✅ ${song.title} has been added to the queue!`)
        }
    }
    
    function play(msg, song) {
        const queue = msg.client.queue
        const guild = msg.guild
        const serverQueue = queue.get(msg.guild.id)
    
        if(!song) {
            serverQueue.voiceChannel.leave()
            queue.delete(guild.id)
            return
        }
    
        const dispatcher = serverQueue.connection.playStream(song.url)
                .on('end', () => {
                    console.log('Music ended!')
                    serverQueue.songs.shift()
                    this.play(msg, serverQueue.songs[0])
                })
                .on('error', error => {
                    console.error(error)
                })
        dispatcher.setVolumeLogarithmic(serverQueue.volume / 5)
    }
    
    function skip(msg, serverQueue) {
        if(!msg.member.voiceChannel) {
            return msg.channel.send('❌ You need to be in a voice channel to stop the  music!')
        }
        if(!serverQueue) {
            return msg.channel.send('❌ There is no song that I could skip!');
        }
        serverQueue.connection.dispatcher.end()
    }
    
    function stop(msg, serverQueue) {
        if(!msg.member.voiceChannel) {
            return msg.channel.send('❌ You need to be in a voice channel to stop the  music!')
        }
        if(!serverQueue) {
            return msg.channel.send('❌ There is no song that I could skip!');
        }
        serverQueue.songs = []
        serverQueue.connection.dispatcher.end()
    }
    
    function nowPlaying(msg, serverQueue) {
        if(!serverQueue) {
            return msg.channel.send('❌ There is no song playing. to play a song run !play <youtube link>')
        }
        return msg.channel.send(`Now playing: ${serverQueue.songs[0].title}`)
    }
}