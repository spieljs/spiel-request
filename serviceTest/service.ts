import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as cors from 'kcors'
import * as koaBody from 'koa-body';
import * as multer from 'koa-multer';
import { unlink } from 'fs'
import { users } from './assets';

const app = new Koa();
const router = new Router();
const upload = multer({dest: './uploads/'})

router.get('/users', async(ctx, next) => {
    ctx.body = {};
    ctx.body = users;
    next();
});

router.post('/users', async(ctx, next) => {
    const user = ctx.request.body;
    users.push(user);
    ctx.body = users;
    next();
});

router.get('/users/:id', async(ctx, next) => {
    const id = parseInt(ctx.params.id);
    ctx.body = users.find(user => user.id === id);
    if(!ctx.body) ctx.throw(404, 'User not found');
    next();
});

router.post('/upload', upload.single('test'), async(ctx, next) => {
    const req = <multer.MulterIncomingMessage>ctx.req;
    ctx.body = req.file;
    next();
});

router.put('/users/:id', async(ctx, next) => {
    const id = parseInt(ctx.params.id);
    const permission = ctx.request.body;

    ctx.body = users.map(user => {
        const value = user
        if(value.id === id) value.permission = permission;
        return value;
    });
    
    if(!ctx.body) ctx.throw(404, 'User not found');
    next();
})

router.delete('/users/:id', async(ctx, next) => {
    const id = parseInt(ctx.params.id);
    const index = users.findIndex((user: any) => user.id === id);
    users.splice(index, 1);
    ctx.body = users;
    next();
});

router.delete('/upload/:file', async(ctx, next) => {
    const file = ctx.params.file;
    const response = new Promise((resolve, reject) => {
        unlink(`./uploads/${file}`, (err) => {
            if(err && err.code == 'ENOENT') {
                const error = {
                    code: 404,
                    message: `File ${file} doesn't exist`
                }
                reject(error);
            } else if(err) {
                const error = {
                    code: 404,
                    message: `Error occurred while trying to remove file ${file}`
                }
                reject(error)
            } else {
                resolve('file removed');
            }
        });
    });

    try {
        ctx.body = await response;
    } catch(error) {
        ctx.throw(error.code, error.message);
    }
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


app.use(koaBody());

app.use(cors({
    origin: checkOriginAgainstWhitelist,
    credentials: true,
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