const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  users.push({
    "username": req.query.username,
    "password": req.query.password
});
// Send a success message as the response, indicating the user has been added
    res.send("The user " + req.query.username + " has been added!");
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  let myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Promise Resolved");
  }, 6000)});

  console.log("Before Calling Promise");

  myPromise.then((successMessage) => {
    console.log("From Callback " + successMessage);
    res.send(JSON.stringify(books,null,4));
  })

  console.log("After Calling promise");
  
  
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;

  let myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Promise Resolved");
  }, 6000)});

  console.log("Before Calling Promise");

  myPromise.then((successMessage) => {
    console.log("From Callback " + successMessage);
    res.send(books[isbn])

  })

  console.log("After Calling promise");


  
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  const books_arr = [];
  for(var key of Object.keys(books)){
    console.log(key + " -> " + JSON.stringify(books[key]));
    if(books[key].author === author){
        books_arr.push(books[key]);
    }
  }
  res.send(books_arr);

  return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  const books_arr = [];
  for(var key of Object.keys(books)){
    console.log(key + " -> " + JSON.stringify(books[key]));
    if(books[key].title.replace(/\s/g, '') === title.replace(/\s/g, '')){
        books_arr.push(books[key]);
    }
  }
  res.send(books_arr);
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
    const isbn = req.params.isbn;
    res.send(books[isbn].reviews);
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
