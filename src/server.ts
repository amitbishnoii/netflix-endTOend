import "./config/config.js";
import app from "./app.js";
import config from "./config/config.js";

app.listen(config.port, () => {
    console.log("server listening on port:", config.port);
});
