//ติดต่อกับฐานข้อมูล
const slugify = require("slugify")
const Blogs = require("../models/blogs")
const { v4: uuidv4 } = require('uuid');

//บันทึกข้อมูล
exports.create=(req,res)=>{
    const {title,content,author} = req.body
    let slug = slugify(title)

    if(!slug)slug=uuidv4();

    //validate
    switch(true){
        case !title:
            return res.status(400).json({error:"Please enter title"})
            break;
        case !content:
            return res.status(400).json({error:"Please enter content"})
            break;
       /* case !author:
            return res.status(400).json({error:"Please enter author"})
            break;*/
    }
    //create
    Blogs.create({title,content,author,slug},(err,blog)=>{
        if(err){
            res.status(400).json({error:"Title duplicate"})
        }
        res.json(blog)
    })
}
//get
exports.getAllblogs=(req,res)=>{
    Blogs.find({}).exec((err,blogs)=>{
        res.json(blogs)
    })
}

//get slug
exports.singleBlog=(req,res)=>{
    let {slug} = req.params
    Blogs.findOne({slug}).exec((err,blog)=>{
        res.json(blog)
    })
}

//remove slug
exports.remove=(req,res)=>{
    const {slug} = req.params
    Blogs.findOneAndRemove({slug}).exec((err,blog)=>{
        if(err) console.log(err)
        res.json({
            message:"Delete complete"
        })
    })
}

//update
exports.update=(req,res)=>{
    const {slug} = req.params
    const {title,content,author} = req.body
    Blogs.findOneAndUpdate({slug},{title,content,author},{new:true}).exec((err,blog)=>{
        if(err) console.log(err)
        res.json(blog)
    })
}