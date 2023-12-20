const Koa = require('koa');
const router = require('@koa/router')();
const {koaBody} = require('koa-body');
const User = require('./user.model.js');
const cors = require('@koa/cors');

const app = module.exports = new Koa();

app.use(cors());

app.use(koaBody({
  jsonLimit: '1kb'
}));

router.get('/users',listAll);
router.get('/user/:id',listOne);
router.post('/add',addUser);
router.get('/edit/:id/:status',changeStatus);

async function listOne(ctx) {
   ctx.body = await User.findOne({
        where: { id : ctx.params.id }
    }).catch((error) => {
        console.error('Failed to retrieve data : ', error);
    }); 
}

async function changeStatus(ctx) {
   await User.findOne({
        where: { id : ctx.params.id }
    }).then(async (user) => {
      ctx.body= await user.update({status:ctx.params.status});
  }).catch((error) => {
        console.error('Failed to retrieve data : ', error);
    }); 
}
 
async function listAll(ctx) {
  ctx.body=await User.findAll();
}

async function addUser(ctx) {
  await User.create({
       firstName: ctx.request.body.firstName,
       lastName: ctx.request.body.lastName,
       email: ctx.request.body.email,
       birthDate: ctx.request.body.birthDate,
       registrationDate: ctx.request.body.registrationDate,
       ipAddress: ctx.request.body.ipAddress,
       status: ctx.request.body.status
   }).then(res => {
       ctx.body = res;
   }).catch((error) => {
       console.error('Failed to create a new record : ', error);
   });
 
}
 
app.use(router.routes());

if (!module.parent) app.listen(3000);
