const express = require('express')
const app = express()
const path = require('path')
const Product = require('./models/product')
const methodOverride = require('method-override')
const authenticateUser = require("./middleware/authenticateUser");
const cookieSession = require("cookie-session");
const bcrypt = require("bcrypt");
// const Cart = require("./models/Cart");
const User = require("./models/User");

const categories = ['MEN', 'WOMEN', 'KIDS'];
const ratings = [5, 4, 3, 2, 1];

require("./config/dbConnection");
//middleware
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extened: true }));
app.use(express.static("public"));
app.use(methodOverride('_method'))


// cookie session
app.use(
    cookieSession({
        keys: ["randomStringASyoulikehjudfsajk"],
    })
);

// route for serving frontend files
app
    .get("/", (req, res) => {
        res.render("login");
    })
    .get("/login", (req, res) => {
        res.render("login");
    })
    .get("/register", (req, res) => {
        res.render("register");
    })
    .get("/new", authenticateUser, (req, res) => {
        res.render("new", { user: req.session.user });
    })
    .get("/home", authenticateUser, (req, res) => {
        res.render("home", { user: req.session.user });
    });

app
    .post("/login", async(req, res) => {
        const { username, password } = req.body;

        const loggedInUser = await User.findOne({ username });

        if (!loggedInUser) {
            res.send("invalid username or password");
            return;
        }

        const doesPasswordMatch = await bcrypt.compare(
            password,
            loggedInUser.password
        );

        if (!doesPasswordMatch) {
            res.send("invalid useranme or password");
            return;
        }
        // else he\s logged in
        req.session.user = {
            "name": loggedInUser.username,
            "role": loggedInUser.role
        };

        res.redirect("/products");
    })
    .post("/register", authenticateUser, async(req, res) => {
        const { username, password, repassword } = req.body;
        if (password != repassword) {
            res.send("Password Mismatch")
            return;
        } else {

            const doesUserExitsAlreay = await User.findOne({ username });

            if (doesUserExitsAlreay) {
                res.send("A user with that username already exits please try another one!");
                return;
            }

            // lets hash the password
            const hashedPassword = await bcrypt.hash(password, 12);
            const latestUser = new User({ username, password: hashedPassword, role: "user" });

            latestUser
                .save()
                .then(() => {
                    res.send("registered account!");
                    res.redirect('/home')
                    return;
                })
                .catch((err) => console.log(err));
        }
    });

//logout
app.get("/logout", authenticateUser, (req, res) => {
    req.session.user = null;
    res.redirect("/login");
});


app
    .get('/products/cart', authenticateUser, async(req, res) => {
        const loggedInUser = req.session.user
        res.render("products/cart", { loggedInUser })
    })

//     .get('/products/cart', authenticateUser, async(req, res) => {
//     res.render("products/cart")
// })

.get('/products', authenticateUser, async(req, res) => {
    const loggedInUser = req.session.user
    const products = await Product.find({})
    res.render("products/index", { products, loggedInUser })
})

.get('/products/new', authenticateUser, async(req, res) => {
    const loggedInUser = req.session.user
    res.render("products/new", { categories, ratings, loggedInUser })
})

.get('/products/:id', authenticateUser, async(req, res) => {
        const loggedInUser = req.session.user
        const { id } = req.params;
        const product = await Product.findById(id);
        res.render("products/show", { product, loggedInUser })
    })
    .get('/products/:id/edit', authenticateUser, async(req, res) => {
        const loggedInUser = req.session.user
        const { id } = req.params;
        const product = await Product.findById(id);
        res.render("products/edit", { product, categories, ratings, loggedInUser })
    });

app.post('/products', authenticateUser, async(req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save()
    res.redirect(`/products/${newProduct._id}`)
})
app.post('/products/cart/:id', authenticateUser, async(req, res) => {

    // const products = await Product.findByIdAndUpdate(id, req.session.name.isCart="true")
})


app.put('/products/:id', authenticateUser, async(req, res) => {
    const { id } = req.params;
    const products = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    res.redirect(`/products/${products._id}`)
})

app.delete('/products/:id', authenticateUser, async(req, res) => {
        const { id } = req.params;
        await Product.findByIdAndDelete(id)
        res.redirect("/products")
    })
    // app.delete('/products/cart/:id', async (req, res) => {
    //     const { id } = req.params;
    //     await Product.findByIdAndUpdate({id}, {$set:{iscart="false"}})
    //     res.redirect("/products/cart")
    // })

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started listening on port: ${PORT}`);
});