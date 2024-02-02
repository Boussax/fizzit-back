import sanitizedConfig from "../config";
import app from "./app";

const port: number = sanitizedConfig.PORT;

app.listen(port, () => {
  console.log(`[server] Server is running on port ${port}`);
});
