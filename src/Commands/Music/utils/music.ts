const music = {
    guilds: new Map(),
    looping: 0,
    connection: null,
    player: null,
    chatPlayer: null,
    isPaused: false,
    shuffle: false
}

export default music