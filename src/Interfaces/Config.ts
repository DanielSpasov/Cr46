export interface Config {
    prefix: string;
    valid_channels: string[];
    roles_channel: string;
    requestOptions: { headers: { "X-Riot-Token": string } };
    lol_api_url: string;
    lol_ddragon_url: string;
    interaction_url: string;
}