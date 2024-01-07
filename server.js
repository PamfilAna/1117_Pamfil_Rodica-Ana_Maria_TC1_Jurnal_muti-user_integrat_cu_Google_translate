var express = require("express")
var bodyParser = require('body-parser')
var Sequelize = require("sequelize")
var nodeadmin = require("nodeadmin")
var cors = require("cors")
//var axios = require("axios")

var sequelize = new Sequelize('journal', 'root', '', {
    dialect:'mysql',
    host:'localhost',
    define: {
        timestamps: true,
        updatedAt: false
    }
})

sequelize.authenticate().then(function(){
    console.log('Success')
})

var app = express()
app.use(cors());
app.use('/nodeadmin',nodeadmin(app))
//app.use(express.static('public'))
app.use(express.static('public'))
app.use('/new_post',express.static('public/new_post'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded ({
    extended:true
}));

var Posts = sequelize.define('posts', {
    id: {type: Sequelize.INTEGER, primaryKey: true},
    title: Sequelize.STRING,
    content: Sequelize.STRING,
    id_user: Sequelize.INTEGER
})

var Users = sequelize.define('users', {
    id: {type: Sequelize.INTEGER, primaryKey: true},
    name: Sequelize.STRING,
    password: Sequelize.STRING
})

Posts.belongsTo(Users, {foreignKey: 'id_user', targetKey: 'id'})

app.get('/posts', function(request, response) {
    Posts.findAll(
         {
            include: [{
                model: Users,
                where: { id: Sequelize.col('posts.id_user') }
            }]
    }).then(function(posts){
        response.status(200).send(posts)
    })
        
})
app.get('/posts/:id', function(request, response) {
    Posts.findOne({where: {id:request.params.id}}).then(
            function(post) {
                 if(post) {
                    response.status(200).send(post)
                } else {
                    response.status(404).send()
                }
        })
})
app.post('/posts', function(request, response) {
    Posts.create(request.body).then(function(post) {
        response.status(201).send(post)
    })
})
app.put('/posts/:id', function(request, response) {
    Posts.findById(request.params.id).then(function(post) {
        if(post) {
            post.update(request.body).then(function(post){
                response.status(201).send(post)
            }).catch(function(error) {
                response.status(200).send(error)
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})
app.delete('/posts/:id', function(request, response) {
    Posts.findById(request.params.id).then(function(post) {
        if(post) {
            post.destroy().then(function(){
                response.status(204).send()
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.get('/users', function(request, response) {
    Users.findAll().then(function(users){
        response.status(200).send(users)
    })
       
})
app.get('/users/:id', function(request, response) {
    Users.findOne({where: {id:request.params.id}}).then(function(user) {
        if(user) {
            response.status(200).send(user)
        } else {
            response.status(404).send()
        }
    })
})
app.get('/users/ids/:name/:password', function(request, response) {
    Users.findOne({where: {name:request.params.name, password:request.params.password}}).then(function(user) {
        if(user) {
            response.status(200).send(user)
        } else {
            response.status(404).send()
        }
    })
})
app.post('/users', function(request, response) {
    Users.create(request.body).then(function(user) {
        response.status(201).send(user)
    })
})
app.put('/users/:id', function(request, response) {
    Users.findById(request.params.id).then(function(user) {
        if(user) {
            user.update(request.body).then(function(user){
                response.status(201).send(user)
            }).catch(function(error) {
                response.status(200).send(error)
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})
app.delete('/users/:id', function(request, response) {
    Users.findById(request.params.id).then(function(user) {
        if(user) {
            user.destroy().then(function(){
                response.status(204).send()
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})
app.get('/users/:id/posts', function(request, response) {
    Posts.findAll({where:{id_user: request.params.id},
         include: [{
                model: Users,
                where: { id: Sequelize.col('posts.id_user') }
            }]
    }).then(
            function(posts) {
                response.status(200).send(posts)
            }
        )
})
//app.listen(8081)
app.listen(8080)


