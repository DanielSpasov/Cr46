export interface Music {
    guilds?: Map<string, {
        looping: number;
        connection: any;
        player: any;
        chatPlayer: any;
        isPaused: boolean;
        shuffle: boolean;
        queue?: Array<{
            title: string,
            url: string,
            duration: string
        }>;
    }>;
}