import errorHandler from "../Errors/handler";
import { readdirSync } from "fs";
import ExtendedClient from ".";
import path from "path";

const setupEvents = (client: ExtendedClient) => {
  try {
    const eventPath = path.join(__dirname, "..", "Events");
    readdirSync(eventPath).forEach(async (file) => {
      const { event } = await import(`${eventPath}/${file}`);
      client.events.set(event.name, event);
      client.on(event.name, event.run.bind(null, client));
    });
  } catch (error) {
    errorHandler(client, error);
  }
};

export default setupEvents;
