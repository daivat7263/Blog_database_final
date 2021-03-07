//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

var Sequelize = require('sequelize');
var mysql = require('mysql');

// const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var sequelize = new Sequelize('blogdb', 'abc', "xyz",{
  host: '127.0.0.1',
  dialect: 'mysql',
  logging: false
});

var User = sequelize.define('users', {
  title: Sequelize.STRING,
  author: Sequelize.STRING,
  content:Sequelize.STRING
});



app.get("/", function(req, res){

  var user = User.findAll().then(function (user) {
    res.render('home', {'user':user});
  });

});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const user = User.create({
    title: req.body.postTitle,
    author:req.body.postAuthor,
    content: req.body.postBody
  });
  res.redirect('/');
});

app.get("/posts-view/:postId", function(req, res){

const requestedPostId = req.params.postId;

  User.findOne({where:{id: requestedPostId}}).then(function(user){
    res.render("post", {
      title: user.title,
      author:user.author,
      content: user.content
    });
  });

});


app.get("/posts-update/:postId", function(req, res){

const requestedPostId = req.params.postId;

  User.findOne({where:{id: requestedPostId}}).then(function(user){
    res.render("updatePost", {'user':user
    });
  });

});


app.post("/posts-update/:postId", function(req, res){
  const requestedPostId = req.params.postId;
  
    User.findOne({where:{id: requestedPostId}}).then(function(user){
      user.update(
        {
          title: req.body.postTitle,
          author:req.body.postAuthor,
          content: req.body.postBody
        }
      )
      res.redirect('/')
      });
    });
  

app.get("/posts-delete/:postId", function(req, res){

  const requestedPostId = req.params.postId;
  
    User.findOne({where:{id: requestedPostId}}).then(function(user){
      user.destroy();
      res.redirect('/');
    });
  
  });

app.get("/get-by-author/:postId", function(req, res){

  const requestedPostId = req.params.postId;
  
    User.findOne({where:{id: requestedPostId}}).then(function(user){
      user_by_author = User.findAll({
        where:{
          author:user.author
        }
      }).then(function(user){
        res.render('author',{'user_by_author':user})
      });
    });
  
  });

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});



// sequelize.sync().then(function() {
//   return User.create({
//     title:req.body.postTitle,
//     author:req.body.postAuthor,
//     content:req.body.postBody
//   });
// }).then(function(Post) {
//   console.log(Post.get({
//     plain: true
//   }));
// });

// mongoose.connect("mongodb://localhost:27017/blogDB",{useNewUrlParser: true});

// const postSchema = {
//   title: String,
//   author:String,
//   content: String
// };

//  const Post = sequelize.models.User;
//  console.log(User === sequelize.models.User);
// const Post = mongoose.model("Post",postSchema);

  // console.log(abc);
  
  // Post.find({}, function(err, posts){
  //   res.render("home", {
  //     startingContent: homeStartingContent,
  //     posts: posts
  //     });
  // });