import express from 'express';

const app = express();

// Routes : to access the root route, use whatever port u are using e.g http://localhost:5000
app.get("/products", (reg, res) => {

});

app.listen(5000, () => {
    console.log('Server started at http://localhost:5000'); // When u run this, if u update anything here, it won't change until u restart the server. Install nodemon to change it automatically
});

// nQCN5GHQh66A9Kjw