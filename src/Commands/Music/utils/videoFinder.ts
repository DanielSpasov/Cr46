import ytSearch from 'yt-search';
import ytdl from 'ytdl-core';



export const videoFinder = async (query: string): Promise<any> | null => {
    try {
        if (ytdl.validateURL(query)) {
            const songInfo = await ytdl.getInfo(query);
            return {
                title: songInfo.videoDetails.title,
                url: songInfo.videoDetails.video_url,
                duration: formatDuration(Number(songInfo.videoDetails.lengthSeconds))
            };
        } else {
            const songInfo = await ytSearch(query);
            return (songInfo.videos.length > 1) ? {
                title: songInfo.videos[0].title,
                url: songInfo.videos[0].url,
                duration: formatDuration(Number(songInfo.videos[0].duration.seconds))
            } : null;
        }
    } catch { return null }
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