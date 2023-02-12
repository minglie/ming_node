//重启服务器   http://localhost:8091/reload
require("../utils/nodemon/clusterStart")(
    __dirname+"/"+ "restartestMain.js",
    8091,
    process.env.ENV=="dev" ? "nvm use 15.12":"nvm use 8.12 64",
    console.log,
    10000
)