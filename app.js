const express=require('express');
const app=express();
const socketIo = require('socket.io');
const http = require('http');
const path=require('path');


app.use(express.urlencoded({extended: true}));
const server = http.createServer(app);
const io = socketIo(server);
app.use(express.static('public'));



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/',function(req,res){

    res.redirect('index');

})

app.get('/index',function(req,res){
    res.render('index');
})
app.get('/admission',function(req,res){
    res.render('admission');
})
app.get('/events',function(req,res){
    res.render('events');
})
app.get('/history',function(req,res){
    res.render('history');
})
app.get('/achievements',function(req,res){
    res.render('achievements');
})

app.get('/facultyStaffInfo',function(req,res){
    res.render('facultyStaffInfo');
})
app.get('/message',function(req,res){
    res.render('message');
})
app.get('/governingbody',function(req,res){
    res.render('governingbody');
})
app.get('/GuidelineforParents',function(req,res){
    res.render('GuidelineforParents');
})
app.get('/library',function(req,res){
    res.render('library');
})
app.get('/clubs',function(req,res){
    res.render('clubs');
})
app.get('/notice',function(req,res){
    res.render('notice');
})
app.get('/contact',function(req,res){
    res.render('contact');
})
app.get('/codeofconduct',function(req,res){
    res.render('codeofconduct');
})
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});


app.listen(3000);