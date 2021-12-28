//Express
const express = require("express");
const app = express();


//MySql2
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'users',
    password: "abcd1234=",
  });


//Serve os arquivos estaticos automaticamente
app.use(express.static("public"));

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false}))


//Subindo servidor
app.listen(8080, () => {

    console.log("servidor local rodando na porta 8080")

});





app.get("/users", (req, res) => {

     connection.query(
            'SELECT * FROM users',
            function(err, results, fields) {     
                 res.send(results); // results contains rows returned by server              
            }
          );    
})

app.post("/users",  (req, res) => {

    const { name, sobrenome, email } = req.body;

    const sql = "INSERT INTO users (name, lastName, email) VALUES (?,?,?)";
    
    const fields = [req.body.name, req.body.sobrenome, req.body.email]; 
    
   connection.query(sql, fields, function (err, results) {

            if (err) throw err;
            console.log("record inserted")
        }
    )

    
    res.sendFile(__dirname + "/public/response.html");

})



