const express=require('express');
const app=express();

const path=require('path');


app.use(express.urlencoded({extended: true}));

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

app.get('/history',function(req,res){
    res.render('history');
})
app.get('/achievements',function(req,res){
    res.render('achievements');
})


app.listen(3000);