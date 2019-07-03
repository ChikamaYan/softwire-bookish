import * as passportJwt from 'passport-jwt';
let JwtStrategy = passportJwt.Strategy;


export class CookieHandler{

    setStrategy(passport,key) {
        function cookieExtractor(req) {
            let token = null;
            if (req && req.headers.cookie) {
                token = CookieHandler.getJwtFromCookie(req.headers.cookie);
            }
            return token;
        }

        let opts = {
            jwtFromRequest: cookieExtractor,
            secretOrKey: key
        };

        passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
            return done(null, jwt_payload.username);
        }));
    }

    static getJwtFromCookie(cookieString) {
        let cookies = cookieString.split(";");
        for (let c of cookies) {
            if (c.startsWith("jwt=")) {
                return c.slice(4);
            }
        }
    }
}