var server = require('express')();
var mongodb = require('mongodb');
var bodyParser = require('body-parser');
var cors = require('cors');

server.use(bodyParser.json({extended:true}));
server.use(cors());

var dburl = "mongodb://127.0.0.1:27017";
var dbName = 'pizzeria';
var dbClient = new mongodb.MongoClient;

var user_email = '';

server.get("/pizza", (request, response) => {
    dbClient.connect(dburl, (err, connect) => {
        if(err)
            response.send(err)
        else {
            var db = connect.db(dbName);
            db.collection('pizza').find().toArray((err, data) => {
                response.send(data);
            })
        }
    })
})

server.get("/ingredients", (request, response) => {
    dbClient.connect(dburl, (err, connect) => {
        if(err)
            response.send("<h1>Problem in server. Please try after sometime</h1>")
        else {
            var db = connect.db(dbName);
            db.collection('ingredients').find().toArray((err, data) => {
                response.send(data);
            })
        }
    })
})

server.post("/signup", (request, response) => {
    var user_signUp_info = request.body;
    dbClient.connect(dburl, (err, connect) => {
        if(err)
            response.send("<h1>Probelm in Server. Please try after sometime</h1>")
        else {
            var db = connect.db(dbName);
            db.collection('user').find({email: user_signUp_info.email}).toArray((err, data) => {
                if(data.length === 0) {
                    db.collection('user').insertOne({name: user_signUp_info.name, email: user_signUp_info.email, password: user_signUp_info.password})
                    response.send("Account Created !!\nPlease Login to your account.")
                }
                else 
                    response.send("User already exist");
            })
        }
    })
})

server.post("/login", (request, response) => {
    var user_logIn_info = request.body;
    dbClient.connect(dburl, (err, connect) => {
        if(err)
            response.send("<h1>Problem in server. Please try after sometime</h1>")
        else {
            var db = connect.db(dbName);
            db.collection('user').find({email: user_logIn_info.email}).toArray((err, data) => {
                if(data.length === 0)
                    response.send("Email Invalid")
                else {
                    if(data[0].password === user_logIn_info.password) {
                        db.collection('cart').find({email: user_logIn_info.email}).toArray((err, data1) => {
                            user_email = user_logIn_info.email;
                            response.send({name: data[0].name, msg:'Logged In !!', len: data1.length})
                        })
                    }
                    else 
                        response.send("Password Incorrect")
                }
            })
        }
    })
})

server.get('/logout', (request, response) => {
    dbClient.connect(dburl, (err, connect) => {
        if(err)
            response.send("<h1>Problem in server. Please try after sometime</h1>")
        else {
            if(user_email !== '') {
                response.send('Logout Successfull !!')
                user_email = ''
            }
            else
                response.send('Please Log-In in order to Log Out !!')
        }
    })
})

server.post("/update_Cart", (request, response) => {
    var pizza = request.body;
    dbClient.connect(dburl, (error, connect) => {
        if (error)
            response.send("<h1>Problem in server. Please try after sometime</h1>")
        else {
            var db = connect.db(dbName);
            db.collection("cart").updateOne({email: user_email, name: pizza.name },{$set: {quantity: pizza.quantity}})
            db.collection("cart").updateOne({email: user_email, name: pizza.name },{$set: {total_price: pizza.price * pizza.quantity}})
            response.send("update successfull")
        }
    })
})

server.post("/insert_cart", (request, response) => {
    var items = request.body;
    dbClient.connect(dburl, (err, connect) => {
        if (err)
            response.send("<h1>Problem in server. Please try after sometime</h1>")
        else {
            var db = connect.db(dbName);
            if (user_email === '') 
                response.send("Log-In to proceed !!"); 
            else {
                db.collection("cart").find({email: user_email, name: items.name}).toArray((err, data) => {
                    if(data.length != 0){
                        response.send("Already in Cart!!")
                    }
                    else{
                        db.collection("cart").insertOne({email: user_email, name: items.name, image: items.image, quantity: 1, price: items.price, total_price: items.price})
                        response.send(items.name + " added into the cart !!");
                    }
                })
            }
        }
    })
})

server.post("/insert_toppings_cart", (request, response) => {
    var toppings = request.body;
    dbClient.connect(dburl, (err, connect) => {
        if (err)
            response.send("<h1>Problem in server. Please try after sometime</h1>")
        else {
            var db = connect.db(dbName);
            if (user_email === '') 
                response.send("Log-In to proceed !!"); 
            else {
                for(var i of toppings.top){
                    db.collection('cart').insertOne({email: user_email, name:i.name, image: i.img, price: i.price, quantity: 1, total_price: i.price})
                }
                response.send("Toppings Added !!")
            }
        }
    })
})

// server.post("/insert_cart", (request, response) => {
//     var pizza = request.body;
//     var pizza_info = [];
//     dbClient.connect(dburl, (err, connect) => {
//         if(err)
//             response.send("<h1>Problem in server. Please try after sometime</h1>")
//         else {
//             var db = connect.db(dbName);
//             if(user_email == null)
//                 response.send("Please login to proceed")
//             else{
//                 db.collection('cart').find({email: user_email}).toArray((err, data) => {
//                     if(data.length === 0) {
//                         pizza_info.push({name: pizza.name, image: pizza.image, quantity: 1, price: pizza.price});
//                         db.collection('cart').insertOne({email: user_email, items: pizza_info})
//                         response.send(pizza.name+' added to cart !!')
//                     }
//                     else {
//                         db.collection('cart').find({items: {$elemMatch: {name: pizza.name}}}).toArray((err, data1) => {
//                             if(data1.length == 0) {
//                                 data[0].items[data[0].items.length]= {name: pizza.name, image: pizza.image, quantity: 1, price: pizza.price};
//                                 db.collection('cart').updateOne({email: user_email}, {$set:{items: data[0].items}})
//                                 response.send(pizza.name+' added to cart !!')
//                             }
//                             else
//                                 response.send('Already there')
//                         })    
//                     }
//                 })
//             }
//         }
//     })
// })

server.post("/delete_cart", (request, response) => {
    var del_pizza = request.body;
    dbClient.connect(dburl, (err, connect) => {
        if(err)
            response.send("<h1>Problem in server. Please try after sometime</h1>")
        else {
            var db = connect.db(dbName);
            db.collection('cart').find({email: user_email}).toArray((err, data) => {
                if(data.length != 0) 
                    db.collection('cart').deleteOne({email: user_email, name: del_pizza.name})
            })
        }
    })
})

server.get("/total", (request, response) => {
    dbClient.connect(dburl, (error, connect) => {
        if (error) 
            response.send("<h1>Problem in server. Please try after sometime</h1>")
        else {
            var db = connect.db(dbName);
            var total = 0, count = 0;
            db.collection("cart").find({email: user_email}).toArray((err, data) => {
                for (let i = 0; i < data.length; i++) {
                    total = total + data[i].total_price;
                    count = count + 1;
                }
                var totalCost = [total, count];
                response.send(totalCost);
            })
        }
    })
})

server.get("/shoppingCart", (request, response) => {
    dbClient.connect(dburl, (err, connect) => {
        if(err)
            response.send("<h1>Problem in server. Please try after sometime</h1>")
        else {
            var db = connect.db(dbName)
            db.collection('cart').find({email: user_email}).toArray((err, data) => {
                response.send(data)
            })
        }
    })
})

server.listen(4000, () => {
    console.log("Express Server Started at port: 4000 ...")
});