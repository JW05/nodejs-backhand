const Todo = require('../../../models/Todo');



const getAll =(req,res)=> {
    todo.find({
        "users": req.user._id
    }, (err,docs)=>{
        if (!err){
            res.json({
                    "status":"succes",
                    "data":{
                        "todos":docs
                    }
                });

        }
    });

    
}

const create= (req,res,next)=> {
    
    let todo = new Todo();
    todo.text = req.body.text;
    todo.user = req.user._id;
    todo.completed = false;
    todo.save((err,doc)=>{
        if(err){
            res.json({
                "status":"error",
                "message":"could not save this todo item"
            });
        }
        if (!err){
            res.json({
                "status":"succes",
                "data": {
                    "todo":doc
                }
            });
        }
    })
}
         
const update = (req, res) => {
   let user = req.user._id;
   let todoId = req.params.id;
   Todo.findOneAndUpdate({
       user: user,
       _id: todoId
   }, {
       completed: true
   }, {
       new: true
   }).then(doc => {
        res.json({
            "status": "success",
            "data": {
                todo: doc
        }
    })
   }).catch(err =>{
       res.json(err);
   })
}
  
module.exports.getAll=getAll;
module.exports.create=create;
module.exports.update=update;