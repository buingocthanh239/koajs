const Koa = require('koa');
const { koaBody } = require('koa-body');
const path = require('path');
const render = require('koa-ejs');
const routes = require('./routes/routes')

const app = new Koa();
render(app, {
    root: path.join(__dirname, 'view'),
    layout: 'template',
    viewExt: 'html',
    cache: false,
    debug: true
  });


app.use(koaBody());
app.use(routes.routes());   
app.use(routes.allowedMethods());

app.listen(5000);