const express = require('express');
const app = express();


app.use(express.static('public'));

app.listen(3000, () => {
    console.log('Servidor levantado. http://localhost:3000')
});

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/views/index.html')
})


app.get('/product-detail', (req,res) => {
    res.sendFile(__dirname + '/views/product-detail.html')
})

app.get('/cart',(req,res) => {
    res.sendFile(__dirname + '/views/cart.html')
})

app.get('/shop',(req,res) => {
    res.sendFile(__dirname + '/views/shop.html')
})

app.get('/wishlist',(req,res) => {
    res.sendFile(__dirname + '/views/wishlist.html')
})

app.get('/register',(req,res) => {
    res.sendFile(__dirname + '/views/register.html')
})



