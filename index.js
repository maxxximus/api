const express = require("express");
const app = express();
const port = 3002;

app.use(express.json())

const sql = require('mssql')

const sqlConfig = {
    server: '172.187.184.173',
    database: 'GazeDB',
    user: 'sa',
    password: 'Cheesecake!1',
    pool: {
        min: 0, 
        max: 10, 
        idleTimeoutMillis: 30000,
    },
    options:{
        encrypt: false,
        trustServerCertificate: true,
    }


}


app.post('/books', async(req, res) =>{
    const param1 = req.body.param1;


    // var query = "INSERT INTO [employees] (first_name) VALUES (req.body.first_name)";

    const bookName = req.body.bookName;
    const author = req.body.author;
    const publicationDate = req.body.publicationDate;
    const isbn = req.body.isbn;
    const available = req.body.available


    try {
         await sql.connect(sqlConfig);
         var request = new sql.Request();

         request.input(bookName, sqlVarChar, bookName);
         request.input(author, sqlVarChar, author);
         request.input(publicationDate, sqlVarChar, publicationDate);         //  request.input('country_id', sql.VarChar, countryCode)
         request.input(isbn, sqlVarChar, isbn);         //  request.input('country_id', sql.VarChar, countryCode)
         request.input(publicationDate, sqlVarChar, available);         //  request.input('country_id', sql.VarChar, countryCode)
         var query = `INSERT INTO [books] (bookName, author, publicationDate, isbn, publicationDate,) 
         VALUES (@bookName, @author, @publicationDate, @isbn, @publicationDate)`;

         

    const result = await request.query(query)
    
    res.json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Error connecting"})    
    }


})
// app.delete('/books', async(req, res) =>{


//     try {
//         await sql.connect(sqlConfig);
//         var request = new sql.Request();

//         request.input(bookName, sqlVarChar, bookName);
//         request.input(author, sqlVarChar, author);
//         request.input(publicationDate, sqlVarChar, publicationDate);         //  request.input('country_id', sql.VarChar, countryCode)
//         request.input(isbn, sqlVarChar, isbn);         //  request.input('country_id', sql.VarChar, countryCode)
//         request.input(publicationDate, sqlVarChar, available);         //  request.input('country_id', sql.VarChar, countryCode)
//         var query = `INSERT INTO [books] (bookName, author, publicationDate, isbn, publicationDate,) 
//         VALUES (@bookName, @author, @publicationDate, @isbn, @publicationDate)`;

        

//    const result = await request.query(query)
   
//    res.json(result)
//    } catch (error) {
//        console.log(error);
//        res.status(500).json({error: "Error connecting"})    
//    })



// }

app.get('/countries/:countryCode', async (req,res) =>{
const countryCode = req.params.countryCode

    try {
         await sql.connect(sqlConfig);
         var request = new sql.Request();
         request.input('country_id', sql.VarChar, countryCode)
         const query = `SELECT * FROM employees WHERE employee_id = @country_id`

    const result = await request.query(query)
    
    res.json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Error connecting"})    
    }

   
    

})

app.get("/watch", (req, res) => {
  res.send("watch");
});

app.get("/watch/:videoId&:second", (req, res) => {
  console.log(req);
  const videoId = req.params.videoId;
  const second = req.params.second;
  res.send(
    `multiplied ${videoId} by ${second} = ${multiply(videoId, second)} `
  );
});

app.get("/employees", (req, res) => {
  console.log(req);
  const videoId = req.query.employeeId
  const second = req.query.second
//   const second = req.params.second;
  res.send(
    `  ${videoId}   ${second} `
  );
});

function multiply(num, second) {
  return num * second;
}

app.listen(port, () => {
  console.log("server listening");
});
