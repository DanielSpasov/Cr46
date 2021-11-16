export interface Config {
    prefix: string;
    requestOptions: { headers: { "X-Riot-Token": string } };
    interaction_url: string;
}