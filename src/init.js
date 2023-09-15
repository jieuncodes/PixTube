import "dotenv/config";
import { app } from "./server";

export const GLOBAL_URL_HTTPS = "https://localhost:";
const PORT = 3000;

const handleListening = () =>
  console.log(`✅Server Listening on port ${PORT}🎉`);

app.listen(PORT, handleListening);
