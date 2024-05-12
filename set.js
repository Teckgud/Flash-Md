const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0hHWG85ZndYdEVnb1ByTXY5NG92Z21ITXJEUTl3SkNWQkp0c3ZRNEsyMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMmYzbTlxQzZqbExQR3UzUHNOQVlNV1IxK2VGRnNLaTgzWWdrWUFaY1ZIQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrTzEvM3Uyck9EcSsvMjRaWEppRkpNWDdXclhxK2JUSUZJS3ErRWlXb21vPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJYeVFYNjBXTXM0M3cyR1c3STRDSjRCVXJqSUdNQm5wUnlSSzhHaWZMc2tVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlKcTlwUndhZDZ2T1FvbFd2cUNkNklHYUMzVXVtWTVxMkN0bFNnOUlLWFk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InJhRWtNcW9FandLWE1qUlVoZlBBaGZjVEt5RktxcURGSXNWdnNGRDJRRVU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEJXYUNlWldQeFpwd3ZDWTJna0haeUNmUy9wVVppdXZ5WWVjOVVBdUZscz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicWNiZmNJUVFKZ2lGSndjQ0NnWXBkK2l1N0hiUkcyRndJdVpEUVV6Qk9IST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9NT05BSnZiV0x1QzJPcFdhVDd6Vi85VE5Ld2oxWHNoUC9xbFVjMXdIdXFVQnJ1ZC9EZExSVTcxRnJFV253Sjh1ZDEzV2xidmdPb29MU0JDWGtZcWlRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTU5LCJhZHZTZWNyZXRLZXkiOiJ6V29pbGk5Mm1yL1Fzd0Rsc1RiR3Joai9UVTZCN3Nxc1FwTm9CTEVZWHk0PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJiZ0NDcDJPcFQ1cXNVMHZnVWN3cGx3IiwicGhvbmVJZCI6IjcwYmVkNTk0LWVjYzYtNDU4ZC04MGViLWQ1YTA2YWY2Mjk1MSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1NUUxNmpSOUNQNlBZT3h2dWhaNWs1cnZmakU9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZmN2RWQvTUNlY1M4QUhmeVo1U0VkQW5tTVpNPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ik1CM0FGTTlQIiwibWUiOnsiaWQiOiIyNjM3MTc4Njk1NzQ6MTRAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiTGlsbmVtIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNOMm0xOGtIRVBibC83RUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJleTdKR0p3ZndnY080YzhWVGZnSmduQmxlaWtLVWhLbGYvL2R2dStBY0RVPSIsImFjY291bnRTaWduYXR1cmUiOiJhNEdqaEM0c3JZV3lzV3Jna2YzUHVJL3c3Z0FnU1RDT3BhMDZHalVpa2lQTzN0NW4vSDFNQnJ1TzhpMExLRnFEaWdWaEFyUTlXQXg5ZndpNldLNGhBdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoidm1Qa3UxbjRuVDYxUFJPeWE2WFpvZ05aYkRXRW00K3IwNmhmWmlmL2gvN1FVZm5rQ0xvckQ2clFha2k2a2hrbnk2Skt4SzJTU2lDNlh6elFRKzJhamc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNjM3MTc4Njk1NzQ6MTRAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWHN1eVJpY0g4SUhEdUhQRlUzNENZSndaWG9wQ2xJU3BYLy8zYjd2Z0hBMSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcxNTQ2NzAxMn0=',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "263717869574",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "oui",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'Lil-nem',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
