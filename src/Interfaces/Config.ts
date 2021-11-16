export interface Config {
    prefix: string;
    requestOptions: { headers: { "X-Riot-Token": string } };
    lol_api_url: string;
    lol_ddragon_url: string;
    interaction_url: string;
}