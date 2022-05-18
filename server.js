const express = require('express');
const { check, validationResult } = require('express-validator');

const productos = []
const app = express()

app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('inicio', { productos });
});

app.get('/productos', (req, res) => {
    res.render('productos', { productos });
});

app.post('/productos',[
    check("title", "El nombre del producto debe tener al menos 3 caracteres y no puede incluir numeros")
        .exists()
        .isAlpha()
        .isLength({ min: 3 }),
    check("price", "El precio no puede ser menor a 3 digitos")
        .exists()
        .isNumeric()
        .isLength({ min: 3 }),
    check("thumbnail", "El campo de thumbnail debe contener una direccion valida")
        .exists()
], (req, res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const alert = errors.array()
        res.render("inicio", {alert})
    }else{
        productos.push(req.body)
        res.redirect('/productos')
    }
});

//app.use(webRouter)

app.listen(8080, () => {
    console.log("server running on port", 8080)
});