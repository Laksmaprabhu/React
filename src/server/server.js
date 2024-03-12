
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password: '',
    database:'employee_management_system'
});

db.connect((err) => {
    if(err){
        console.log('DB not connected');
    }
    else{
        console.log('DB connected');  
    }
});
// app.post("/admin", (req, res) => {
 
//   const sql =
//     "INSERT INTO students (`user`, `password`) VALUES(?)";  
   
//       const values = [req.body.user, req.body.password]
//       db.query(sql, [values], (err, result) => {
//         if (err) return res.json({ Error: "Error on insert" });
//         return res.json({ Status: "Success" });
//       })
    
// })
 
app.post("/register", (req, res) => {

  const sql = "INSERT INTO students (`user`, `password`) VALUES(?)";
  const values = [req.body.username, req.body.password];

  db.query(sql, [values], (err, result) => {
if(err) return res.json({Error: "Error on insert"});
return res.json({Status:"Success"});
  })
});

app.get("/users", (req, res) => {
  const getquery = "SELECT * FROM students";
  db.query(getquery, (err, result) => {
    if(err) {
      console.log(err)
      } 
        res.send(result)
  });
});
  // Get a single user by ID
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  const getOneQuery = 'SELECT * FROM students WHERE id = ?';
  db.query(getOneQuery, [userId], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json(result[0]);
  });
});

app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const { user, password } = req.body;

  const updateQuery = 'UPDATE students SET user=?, password=? WHERE id=?';
  db.query(updateQuery, [user, password, userId], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ message: 'User updated successfully' });
  });
});

// Delete a specific user by ID
app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;

  const deleteQuery = 'DELETE FROM students WHERE id = ?';
  db.query(deleteQuery, [userId], (err, result) => {
      if (err) {
          console.error('Error executing query:', err);
          return res.status(500).json({ error: 'Internal server error' });
      }

      if (result.affectedRows === 0) {
          return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json({ message: 'User deleted successfully' });
  });
});

app.listen(5000, () => {
    console.log("Server running...");
  });
  