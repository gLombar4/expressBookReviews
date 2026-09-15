const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
    //write code to check is the username is valid
    //username should be unique
      return !users.some(user => user.username === username);
    
    }
    
    const authenticatedUser = (username,password)=>{ //returns boolean
    //write code to check if username and password match the one we have in records.
      return users.some(user => user.username === username && user.password === password);
    }

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const user = req.body.username;
    if (!user) {
        return res.status(404).json({ message: "Body Empty" });
    }
    // Generate JWT access token
    let accessToken = jwt.sign({
        data: user
    }, 'access', { expiresIn: 60 * 60 });

    // Store access token in session
    req.session.authorization = {
        accessToken
    }
    return res.status(200).send("User successfully logged in");
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    //Write your code here
    let isbn = req.params.isbn;
    let review = req.query.review;
    let username = req.session.authorization.username;
    console.log("we are here ")
    if(books[isbn]){
      if(books[isbn].reviews[username]){
        books[isbn].reviews[username] = [review];
        return res.status(200).json({ message: "Review modified successfully" });
      }
      else{
        books[isbn].reviews[username] = [review];
        return res.status(200).json({ message: "Review added successfully" });
      }
    }
    else{
      return res.status(404).json({message: "No book found with ISBN "+isbn});
    }
  }
  );

regd_users.delete("/auth/review/:isbn", (req, res) => {
    //Write your code here
    let isbn = req.params.isbn;
    let username = req.session.authorization.username;
    if(books[isbn]){
      if(books[isbn].reviews[username]){
        delete books[isbn].reviews[username];
        return res.status(200).json({ message: "Review deleted successfully" });
      }
      else{
        return res.status(404).json({message: "No review found for ISBN "+isbn});
      }
    }
    else{
      return res.status(404).json({message: "No book found with ISBN "+isbn});
    }
  })

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
