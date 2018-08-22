const express=require('express');
const static=require('express-static');


var server=express();
server.listen(8099);

//4.static数据
server.use(static('./js/phoneCarmer/'));
