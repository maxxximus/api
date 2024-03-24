const express = require("express");
const app = express();
const port = 3002;

require('dotenv').config() // commonJS



// const ff = 
// [
//     {
//       "product_id": 1,
//       "design": "Barbour",
//       "itemcode": "00001",
//       "itemname": "hhgff",
//       "image": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcS0EdoCIq0kNfv7KppApxwq0gvQf4p1ML96PrK0wAdnGtQ7K9TbC30Z0swMQCWjzhoyFsqbP1zANjXI0z_vAMunKDmkGEC9L_4xkAVDzWUqzldi7qC4GjXteQ",
//       "price": 57.45,
//       "details": "hhhh ddd"
//     },
//     {
//       "product_id": 2,
//       "design": "Boss",
//       "itemcode": "00002",
//       "itemname": "twin pack",
//       "image": "https://www.retrodesignerwear.com/cdn/shop/products/Superdry-Vintage-Tee-Coastal-Pink-Grit.jpg?v=1606047258&width=900",
//       "price": 54.55,
//       "details": "hhhh ddd"
//     },
//     {
//       "product_id": 3,
//       "design": "Superdry",
//       "itemcode": "00003",
//       "itemname": "twin pack",
//       "image": "https://www.houseoffraser.co.uk/images/products/32281819_l.jpg",
//       "price": 34.55,
//       "details": "hhhh ddd"
//     },
//     {
//       "product_id": 4,
//       "design": "Barbour",
//       "itemcode": "00004",
//       "itemname": "twin ",
//       "image": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcS0EdoCIq0kNfv7KppApxwq0gvQf4p1ML96PrK0wAdnGtQ7K9TbC30Z0swMQCWjzhoyFsqbP1zANjXI0z_vAMunKDmkGEC9L_4xkAVDzWUqzldi7qC4GjXteQ",
//       "price": 39.55,
//       "details": "gggg hhhh ddd"
//     },
//     {
//       "product_id": 5,
//       "design": "Boss",
//       "itemcode": "00005",
//       "itemname": "penguin ",
//       "image": "https://www.houseoffraser.co.uk/images/imgzoom/55/55036001_xxl.jpg",
//       "price": 14.55,
//       "details": "gggg hhhh ddd"
//     },
//     {
//       "product_id": 6,
//       "design": "Barbour",
//       "itemcode": "00006",
//       "itemname": "elk ",
//       "image": "https://www.houseoffraser.co.uk/images/imgzoom/55/55036001_xxl.jpg",
//       "price": 44.99,
//       "details": "gggg hhhh ddd"
//     },
//     {
//       "product_id": 7,
//       "design": "Tommy",
//       "itemcode": "00007",
//       "itemname": "hnu ",
//       "image": "https://www.houseoffraser.co.uk/images/imgzoom/59/59764203_xxl.jpg",
//       "price": 42.99,
//       "details": "gggg hhhh ddd"
//     },
//     {
//       "product_id": 8,
//       "design": "Adidas",
//       "itemcode": "00008",
//       "itemname": "goo ",
//       "image": "https://spikeleisurewear.co.uk/wp-content/uploads/2020/08/SL211.jpg",
//       "price": 22.99,
//       "details": "gggg hhhh ddd"
//     },
//     {
//       "product_id": 9,
//       "design": "Boss",
//       "itemcode": "00009",
//       "itemname": "jug ",
//       "image": "https://www.houseoffraser.co.uk/images/imgzoom/55/55036001_xxl.jpg",
//       "price": 27.99,
//       "details": "gggg hhhh ddd"
//     },
//     {
//       "product_id": 10,
//       "design": "Boss",
//       "itemcode": "00010",
//       "itemname": "juice ",
//       "image": "https://www.houseoffraser.co.uk/images/imgzoom/55/55036001_xxl.jpg",
//       "price": 21.99,
//       "details": "gggg hhhh ddd"
//     }
//   ]




sqlConfig = {
  server: process.env.SERVER,
  database: 'RobEcomm',
  user: process.env.USER,
  password: process.env.PASSWORD,
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



const cors = require('cors'); 


app.use(cors());
app.use(express.json());


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

const sql = require('mssql')







app.get("/", (req, res) => {
    res.send("watch");
  });
  

app.get("/item", async (req, res) => {
    try {
        await sql.connect(sqlConfig);
        var request = new sql.Request();
      
        const query = `SELECT  p.design, p.itemname ,sizes.[size], p.[image], p.itemcode, p.product_id, p.price , p.details
        FROM product p
        inner JOIN item ON item.product_id=p.product_id
        inner JOIN sizes ON  sizes.sizes_id = item.sizes_id `


 const result = await request.query(query)

          
        let result1 =  result.recordset.reduce((res, row) => {
            let el = res.find(el => el["product_id"] === row["product_id"]);
            // If we find the object in the output array simply update the objectives
            if (el) {
        el.size = [...el.size, ...row.size];
            } else {
                row.size = [row.size]
            // If we _don't_ find the object, add to the output array.
              res.push({ ...row});
            }
            return res;
        }, [])

  
  
   res.json(result1)
   } catch (error) {
       console.log(error);
       res.status(500).json({error: "Error connecting"})    
   }
  });




// req.body -insert into product table
// {"design":"tomm","itemcode": "56788", "itemname":"goo", "image": "http","price": 34.67, "details": "loccch ddd"}
    app.post("/create", async (req, res) => {
        const {design, itemcode, itemname, image, price, details} = req.body

        try {
            await sql.connect(sqlConfig);
            var request = new sql.Request();
            request.input('design', sql.VarChar, design)
            request.input('itemcode', sql.VarChar, itemcode)
            request.input('itemname', sql.VarChar, itemname)
            request.input('image', sql.VarChar, image)
            request.input('price', sql.Decimal(5,2), price)
            request.input('details', sql.VarChar, details)
            const query = `INSERT INTO Product (design,itemcode,itemname, image,price,details)
             values (@design, @itemcode, @itemname, @image, @price, @details)`
   
       const result = await request.query(query)
      
       res.json(result)
       } catch (error) {
           console.log(error);
           res.status(500).json({error: "Error connecting"})    
       }
   
         
      });





// req.body -insert into product table
// {"design":"tomm","itemcode": "56788", "itemname":"goo", "image": "http","price": 34.67, "details": "loccch ddd"}
app.put("/update/:product_id", async (req, res) => {
    const product_id = req.params.product_id
    const {design, itemcode, itemname, image, price, details} = req.body

    try {
        await sql.connect(sqlConfig);
        var request = new sql.Request();
        request.input('product_id', sql.Int, product_id)

        request.input('design', sql.VarChar, design)
        request.input('itemcode', sql.VarChar, itemcode)
        request.input('itemname', sql.VarChar, itemname)
        request.input('image', sql.VarChar, image)
        request.input('price', sql.Decimal(5,2), price)
        request.input('details', sql.VarChar, details)

        const query =   `UPDATE Product
SET design = @design, itemcode = @itemcode, itemname = @itemname,
 image = @image, price = @price, details = @details
WHERE product_id = @product_id `;
   
   const result = await request.query(query)
  
   res.json(result)
   } catch (error) {
       console.log(error);
       res.status(500).json({error: "Error connecting"})    
   }

     
  });




     // named route “parameters”.
      app.get('/item/:item_id', async (req,res) =>{                // localhost:3000/item/1
        const product_id = req.params.item_id
        
            try {
                 await sql.connect(sqlConfig);
                 var request = new sql.Request();
                 request.input('product_id', sql.Int, product_id)

                const query = `SELECT  p.design, p.itemname ,sizes.[size], p.[image], p.itemcode, p.product_id, p.price , p.details
                 FROM product p
                 INNER JOIN item ON item.product_id=p.product_id
                 INNER JOIN sizes ON  sizes.sizes_id = item.sizes_id
                  WHERE p.product_id = @product_id`
        
            const result = await request.query(query)


            


            
            let result1 =  result.recordset.reduce((res, row) => {
                let el = res.find(el => el["product_id"] === row["product_id"]);
                // If we find the object in the output array simply update the objectives
                if (el) {
            el.size = [...el.size, ...row.size];
                } else {
                    row.size = [row.size]
                // If we _don't_ find the object, add to the output array.
                  res.push({ ...row});
                }
                return res;
            }, [])
            console.log("fffggggggg", result1);
    
            res.json(result1)
            } catch (error) {
                console.log(error);
                res.status(500).json({error: "Error connecting"})    
            }
        
           
           
        
        })


        app.get('/sizes/:item_id', async (req,res) =>{                // localhost:3000/item/1
            const product_id = req.params.item_id
            
                try {
                     await sql.connect(sqlConfig);
                     var request = new sql.Request();
                     request.input('product_id', sql.Int, product_id)
    
                    const query = `Select sizes.size
                     FROM product p
                     INNER JOIN item ON item.product_id=p.product_id
                     INNER JOIN sizes ON  sizes.sizes_id = item.sizes_id
                      WHERE p.product_id = @product_id`
            
                const result = await request.query(query)
                result.recordset.map()



                
                console.log("fff", result.recordset);
       
                res.json(result)
                } catch (error) {
                    console.log(error);
                    res.status(500).json({error: "Error connecting"})    
                }
            
               
               
            
            })


      // query string
      app.get('/product', async (req,res) =>{    // localhost:3000/product?design=Boss&size=1
       const design = req.query.design
    const size = req.query.size
        
            try {
                 await sql.connect(sqlConfig);
                 var request = new sql.Request();
                 request.input('design', sql.VarChar, design)
                 request.input('size', sql.Int, size)
                 const query = `SELECT * FROM Item WHERE design = @design AND size = @size`
        
            const result = await request.query(query)
           
            res.json(result)
            } catch (error) {
                console.log(error);
                res.status(500).json({error: "Error connecting"})    
            }
        
           
           
        
        })



  
    app.listen(port, () => {
        console.log("server listening");
      });
      



