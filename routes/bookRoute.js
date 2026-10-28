const express = require("express");
const router = express.Router();
const Book = require("../models/bookModel.js");

router.get("/",async (req, res)=>{
    const page = parseInt(req.query.page, 10);
    const limit = parseInt(req.query.limit, 10);
    const santPage = (page > 1) ? page : 1;
    const santLimit = (limit < 1) ? 10 : limit;
    const skip = (santPage-1) * santLimit;

    const {books, totalRecords }= Promise.all([ 
        Book.find().skip(skip).limit(santLimit),
        Book.countDocuments()
    ]);

    if(!books){
        return res.status(404).json({
            message : "No Books record found"
        })
    }
    return res.status(200).json({
        success : true,
        metadata:{
            currentPage : santPage,
            totalRecords : totalRecords
        },
        data: books
    });
});

router.post("/", async (req, res)=>{
    const {title, author, category} = req.body;
    if(!title){
        return res.status(400).json({
            message : "Title is required",
        })
    }
    const newBook = {
        title : title,
        author : author,
        category : category,
        availabilityStatus : "available",
        creationDate : Date.now()
    }

    const added = await Book.create(newBook);

    if(!added){
        return res.status(500).json({
            message : "New book is not added"
        });
    }

    return res.status(201).json({
        success : true,
        message : "New Book added",
    })
});

router.patch("/:id", async (req, res)=>{
    const id = req.params.id;
    const {newAvailabilityStatus} = req.body;

    const book = await Book.find({_id : id});

    if(!book){
        return res.status(404).json({
            message : "Book for this ID does not exists"
        })
    }

    const update = book.updateOne({$set : {availabilityStatus : newAvailabilityStatus}});

    if(!update){
        return res.status(400).josn({
            message : "Status not updated"
        });
    }
    return res.status(200).json({
        success : true,
        message : "Updated Successfully"
    })
});

module.exports = router;