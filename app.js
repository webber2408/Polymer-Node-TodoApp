var express = require('express')
var con = require('./db/db')
var cors = require('cors')
var bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json());
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));

// to retrieve all todos
app.get('/getAllTodos',(req,res) => {
    con.query('SELECT * FROM todoList',function(err,result){
        if (err) throw err
        else{
            //console.log(result);
            res.status(200).send({
                success: 'true',
                message:'All todos',
                todos: result
            })
        }

    }) 
});

//to add a new todo
app.post('/addTodo',(req,res)=>{
    const newTodo = {
        task:req.body.task,
        completed:"false"
    }
    // console.log(req.body)
    // db.todos.push(newTodo)
    con.query('INSERT INTO todoList SET ?',newTodo,function(err,result){
        if (err) throw err
        else{
            res.status(200).send({
                success:'true',
                message:"New todo added successfully!",
                newTodo
            })
        }
    });

    
});

// to delete the todo
app.post('/deleteTodo',(req,res)=>{

    con.query('DELETE FROM todoList WHERE id = ?',req.body.id,function(err,result){
        if (err) throw err
        else{
            res.status(200).send({
                success:'true',
                message:"Todo deleted successfully!",
            })
        }
    });

    
});



const PORT = 5003;

app.listen(PORT,()=>{
    console.log(`Server Status => Running on port ${PORT}`);
})