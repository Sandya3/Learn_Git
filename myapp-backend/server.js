const express=require('express');
const mysql=require('mysql2');
const cors=require('cors');
const bodyParser=require('body-parser');

const app = express();
const port=5000;
app.use(cors());
app.use(bodyParser.json());
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'nodereact'
});

db.connect((err) => {
    if(err) throw err;
    console.log('connected to nodereact database ...');
});

//crud operation
app.get('/user',(req,res)=> {
    db.query('SELECT * FROM user',(err , results) => {
        if(err) throw err;
        res.json(results);
    });
});

app.post('/user',(req,res)=> {
    const user = req.body
    db.query('INSERT INTO  user SET ?', user,(err , results) => {
        if(err) throw err;
        res.json({id:results.insertId,...user});
    });
});

app.listen(port,() => {
    console.log( `server is running at http://localhost:${port}`);
})