export interface Config {
  requestOptions: {
    headers: {
      "X-Riot-Token": string;
    };
  };
  default_league_server: string;
  default_number_of_champs: string;
  bot_icon_url: string;
}
