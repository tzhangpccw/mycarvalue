import { ValidationPipe } from "@nestjs/common"
// import cookieSession from "cookie-session"
const cookieSession = require('cookie-session');

export const setupApp = (app: any) => {
    app.use(cookieSession({
        keys: ['abcdefg']
    }))
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true
        })
    )
}