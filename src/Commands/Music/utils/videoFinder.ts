import ytSearch from 'yt-search';
import ytdl from 'ytdl-core';
import ytpl from 'ytpl';



export const videoFinder = async (query: string, permissions): Promise<any> | null => {
    try {
        // VALID URLS
        if (ytdl.validateURL(query)) { 

            // PLAYLISTS
            const isPlaylist = await ytpl.validateID(query); 
            if (isPlaylist) { 
                if(!permissions.youtube.playlists) throw('Youtube playlists are not allowed in this server.');
                const playlistID = await ytpl.getPlaylistID(query);
                const req = await ytpl(playlistID, { limit: 99999 });
                return req.items.map((s: any) => s = { title: s.title, url: s.url, duration: s.duration });
            } else { 

                // SINGLE SONGS
                if(!permissions.youtube.allowed) throw('Youtube is not allowed in this server.');
                const songInfo = await ytdl.getInfo(query);
                return [{
                    title: songInfo.videoDetails.title,
                    url: songInfo.videoDetails.video_url,
                    duration: formatDuration(Number(songInfo.videoDetails.lengthSeconds))
                }];
            }

        // YOUTUBE SEACHING INVALID LINKS
        } else { 
            if(!permissions.youtube.allowed) throw('Youtube is not allowed in this server.');
            const songInfo = await ytSearch(query);
            return (songInfo.videos.length > 1) ? [{
                title: songInfo.videos[0].title,
                url: songInfo.videos[0].url,
                duration: formatDuration(Number(songInfo.videos[0].duration.seconds))
            }] : null;
        }

    } catch(err) { return err }
}

const formatDuration = (seconds: number): string => {
    try {

        let hours = 0;
        let minutes = 0;

        while (seconds >= 60) {
            minutes++;
            seconds -= 60;
            if (minutes === 60) {
                minutes = 0;
                hours++;
            }
        }

        let formatedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        let formatedSeconds = seconds < 10 ? `0${seconds}` : seconds;

        return hours ? `${hours}:${formatedMinutes}:${formatedSeconds}` : `${minutes}:${formatedSeconds}`

    } catch { return null }
}