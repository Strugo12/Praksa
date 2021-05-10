import express from "express";
import * as mysql from "mysql";
import cors from "cors";
import bcrypt from "bcryptjs";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import session from "express-session";

const saltRounds = 10;
var hour = 1000000000;
var userComment = 0;
const app = express();

app.use(fileUpload());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    cookie: { maxAge: 8 * 60 * 60 * 1000 }, // 8 hours
    saveUninitialized: true,
  })
);

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "games",
});

app.post("/DeleteComment", (req, res) => {
  const gameId = req.body.gameId;
  db.query(
    "DELETE FROM comments WHERE username= ?",
    [req.body.username],
    (err, res) => {
      if (err) {
        console.log(err);
      }
      userComment = 0;
    }
  );
  db.query(
    "DELETE FROM rating WHERE userId= ?",
    [req.body.userId],
    (err, res) => {
      if (err) {
        console.log(err);
      }
    }
  );

  db.query(
    "SELECT COUNT (*)  as cnt FROM rating WHERE gameId= ?",
    [gameId],
    (err, res) => {
      if (err) {
        console.log(err);
      } else {
        let reviews = res[0].cnt;
        console.log(res[0].cnt);
        db.query("UPDATE products SET numReviews= ?  WHERE id= ?", [
          reviews,
          gameId,
        ]);
      }
    }
  );

  db.query(
    "SELECT AVG(rate) as rate  FROM rating WHERE gameId = ?",
    [gameId],
    (err, rows) => {
      let rating = rows[0].rate;
      console.log(rows[0].rate);
      db.query(
        "UPDATE products SET rating= ?  WHERE id= ?",
        [rating, gameId],
        (err, res) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }
  );

  res.redirect("product/" + req.body.gameId);
});

app.post("/AddComment", (req, res) => {
  const body = req.body.body;
  const rating = req.body.rating;
  const username = req.body.username;
  const gameId = req.body.gameId;
  const userId = req.body.userId;
  userComment = 1;
  if (!req.body.body) {
    res.redirect("product/" + gameId);
  } else {
    db.query(
      "INSERT INTO comments (body, id_user, gameId, username) VALUES (?, ?, ?, ?)",
      [body, userId, gameId, username],
      (err, result) => {
        if (err) {
          console.log(err);
        }
      }
    );
    db.query(
      "INSERT INTO rating (gameId, rate, userId) VALUES (?, ?, ?)",
      [gameId, rating, userId],
      (err, res) => {
        if (err) {
          console.log(err);
        }
      }
    );
    db.query(
      "SELECT COUNT (*)  as cnt FROM rating WHERE gameId= ?",
      [gameId],
      (err, res) => {
        if (err) {
          console.log(err);
        } else {
          let reviews = res[0].cnt;
          console.log(res[0].cnt);
          db.query("UPDATE products SET numReviews= ?  WHERE id= ?", [
            reviews,
            gameId,
          ]);
        }
      }
    );

    db.query(
      "SELECT AVG(rate) as rate  FROM rating WHERE gameId = ?",
      [gameId],
      (err, rows) => {
        let rating = rows[0].rate;
        console.log(rows[0].rate);
        db.query(
          "UPDATE products SET rating= ?  WHERE id= ?",
          [rating, gameId],
          (err, res) => {
            if (err) {
              console.log(err);
            }
          }
        );
      }
    );

    res.redirect("product/" + gameId);
  }
});

app.post("/AddGame", (req, res) => {
  const name = req.body.name;
  const genre = req.body.genre;
  const description = req.body.description;
  var image = req.body.image;
  const price = req.body.price;

  db.query(
    "INSERT INTO products (name, genre, description, image, price) VALUES (?, ?, ?, ?, ?)",
    [name, genre, description, image, price],
    (err, result) => {
      if (err) res.send(err);
    }
  );
  res.redirect("/");
});

app.post("/EditProfile", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const lastname = req.body.lastname;
  const country = req.body.country;
  const mobile = req.body.mobile;
  const age = req.body.age;
  const image = req.body.image;
  const aboutYou = req.body.aboutYou;
  db.query(
    "UPDATE users SET name= ?, lastname= ?, country= ?, mobile= ?, age= ?, image= ?, aboutyou= ?  WHERE id= ?",
    [name, lastname, country, mobile, age, image, aboutYou, id],
    (err, res) => {
      console.log(res);
    }
  );
  res.redirect("profile/" + id);
});

app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    res.send(result);
  });
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (response) {
          req.session.user = result;
          req.session.cookie.expires = new Date(Date.now() + hour);
          req.session.cookie.maxAge = hour;
          console.log(req.session.user);
          res.redirect("/");
        } else {
          res.send({ message: "Wrong password" });
        }
      });
    } else {
      res.send({ message: "User doesnt exist" });
    }
  });
});

app.post("/register", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const adminpw = req.body.adminpw;
  db.query("SELECT * FROM users WHERE email= ?", [email], (err, result) => {
    if (result.length > 0) {
      res.send({ message: "Email is already used" });
    } else {
      bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
          if (adminpw == 9521) {
            db.query(
              "INSERT INTO users (name, email, password, role) VALUES (?,?,?,?)",
              [name, email, hash, "admin"],
              (err, result) => {
                if (result) {
                  res.send({
                    message:
                      "You have successfully registered as admin! Go to login",
                  });
                }
              }
            );
          } else {
            db.query(
              "INSERT INTO users (name, email, password, role) VALUES (?,?,?,?)",
              [name, email, hash, "guest"],
              (err, result) => {
                if (result) {
                  res.send({
                    message:
                      "You have successfully registered as admin! Go to login",
                  });
                }
              }
            );
          }
        });
      });
    }
  });
});

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

app.get("/Checkcomment/:id", (req, res) => {
  const idGame = req.params.id;
  if (req.session.user) {
    db.query(
      "SELECT * FROM comments WHERE gameId= ? AND username= ?",
      [idGame, req.session.user[0].name],
      (err, result) => {
        if (err) {
          res.status(500);
        } else {
          if (result.length > 0) {
            userComment = 1;
            res.send({ comment: userComment });
          } else {
            userComment = 0;
            res.send({ comment: userComment });
          }
        }
      }
    );
  }
});

app.get("/product/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM products WHERE id= ?", [id], (err, result) => {
    if (err) {
      res.status(500);
    } else {
      res.status(200).json(result);
    }
  });
});

app.get("/product/comments/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM comments WHERE gameId= ?", [id], (err, result) => {
    if (err) {
      res.status(500);
    } else {
      res.status(200).json(result);
    }
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  if (db) {
    console.log(`Serve at http://localhost:${port}`);
  }
});
