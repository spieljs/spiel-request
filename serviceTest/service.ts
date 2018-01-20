import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as cors from 'kcors'
import { users } from './assets';

const app = new Koa();
const router = new Router();

// const app = express();

router.get('/users', async(ctx, next) => {
    ctx.body = {}
    ctx.body = users;
    next();
})

router.get('/users/:id', async(ctx, next) => {
    const id = parseInt(ctx.params.id);
    ctx.body = users.find(user => user.id === id);
    if(!ctx.body) ctx.throw(404, 'User not found');
    next();
});

var whitelist: Array<string> = [
    'http://localhost:9876',
];

function checkOriginAgainstWhitelist(ctx: any) {  
    const requestOrigin = ctx.accept.headers.origin;
    if (!whitelist.some((el: string) => el === requestOrigin)) {
        return ctx.throw(`${requestOrigin} is not a valid origin`);
    }
    return requestOrigin;
}

app.use(cors({
    origin: checkOriginAgainstWhitelist,
    keepHeadersOnError: true
}));
app.use(router.routes());
app.use(async(ctx, next) => {
    console.log(ctx.url);
    next();
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});