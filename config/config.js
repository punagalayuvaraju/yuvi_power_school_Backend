require("dotenv").config();
module.exports = {
    localdev: { host: process.env.MONGODB_URL },
    qa: { host: process.env.MONGODB_URL },
    staging: { host: process.env.MONGODB_URL },
    development: { host: process.env.MONGODB_URL },
    production: { host: process.env.MONGODB_URL },
    test: { host: process.env.MONGODB_URL },
};
