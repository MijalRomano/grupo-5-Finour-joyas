const fs = require('fs');
const path = require('path');
//const multer = require("multer");
const bcryptjs = require('bcryptjs');
const usersJSON = fs.readFileSync(path.join(__dirname, "../data/usersDB.json"), "utf-8");
const usuarios = JSON.parse(usersJSON);
const { validationResult } = require('express-validator')


const controller = {

    users: (req, res) => {

        return res.render('user/users', { users: usuarios })

    },


    putEdit: (req, res) => {
        const usuarioId = Number(req.params.id);

        const nuevoUsuario = {
            id: usuarioId,
            email: req.body.email,
            nombre: req.body.nombre,
            profilePhoto: "./profilePhotos/" + req.file.filename,
            contrasenia: req.body.contrasenia,
            confirmacionDeContrasenia: req.body.confirmacionDeContrasenia,
            terminosaceptados: req.body.terminosaceptados
        };

        const nuevosUsuarios = usuarios.map(usuarioActual => {
            if (usuarioActual.id === usuarioId) {
                return nuevoUsuario;
            }

            return usuarioActual;

        });


        const nuevosUsuariosJson = JSON.stringify(nuevosUsuarios);

        fs.writeFileSync(path.join(__dirname, "../data/usersDB.json"), nuevosUsuariosJson, "utf-8");

        return res.redirect('/user/users')

    },
    getEdit: (req, res) => {
        const usuarioId = Number(req.params.id);
        const theUser = usuarios.find(u => u.id === usuarioId);

        return res.render('user/edit', {
            user: theUser,
        });



    },
    delete: (req, res) => {
        const usuarioId = Number(req.params.id);

        const newArrayUsuario = usuarios.filter(u => u.id !== usuarioId);

        console.log(newArrayUsuario)

        const usuariosJSON = JSON.stringify(newArrayUsuario);

        fs.writeFileSync(path.join(__dirname, '../data/usersDB.json'), usuariosJSON, 'utf-8');

        return res.redirect(`/user/users`);




    },

    postCreate: (req, res) => {
        let errores = validationResult(req);
        if (errores.isEmpty()) {
            const usuarioRegistrado = usuarios.find(thisUser => thisUser.email === req.body.email);
            if (usuarioRegistrado) {
                res.render('user/create', {
                    error: [
                        { msg: 'Este mail ya esta registrado' }]
                })
            } else {

                const nuevoUsuario = {
                    id: Date.now(),
                    email: req.body.email,
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    profilePhoto: "./profilePhotos/" + req.file.filename,
                    contrasenia: req.body.contrasenia,
                    confirmacionDeContrasenia: req.body.confirmacionDeContrasenia,
                    terminosaceptados: req.body.terminosaceptados,
                    //encriptar contraseña
                    contrasenia: bcryptjs.hashSync(req.body.contrasenia, 10),
                    confirmacionDeContrasenia: bcryptjs.hashSync(req.body.confirmacionDeContrasenia, 10),
                };

                if (req.body.contrasenia !== req.body.confirmacionDeContrasenia) {
                    res.render('user/create', {
                        error: [
                            { msg: 'Las contraseñas no coinciden' }]
                    });
                } else {

                    usuarios.push(nuevoUsuario);
                    //esto 2 reglones para conectarlo con el json y q aparezcan ahi los usuarios nuevos.
                    const usuariosActualizadosJSON = JSON.stringify(usuarios);

                    fs.writeFileSync(path.join(__dirname, "../data/usersDB.json"), usuariosActualizadosJSON, "utf-8");
                    console.log(usuarios);
                    res.redirect('/login');
                }
             }
            } else {
            res.render('user/create', {
                error: errores.array(),
                datosIngresados: req.body
            });
         }
    },

    userDetail: (req, res) => {


        const id = req.params.id

        // importamos el array de productos ya existente y lo taducimos a Json 
        const usuariosJSON = fs.readFileSync(path.join(__dirname, "../data/usersDB.json"), "utf-8");
        const usuarios = JSON.parse(usuariosJSON);

        const usuarioPedido = usuarios.find(usuarioActual => usuarioActual.id == id);
        res.render("user/userDetail", {
            email: usuarioPedido.email,
            nombre: usuarioPedido.nombre,
            apellido: usuarioPedido.apellido,
            contrasenia: usuarioPedido.contrasenia,
            confirmacionDeContrasenia: usuarioPedido.confirmacionDeContrasenia,
            terminosaceptados: usuarioPedido.terminosaceptados,
            profilePhoto: usuarioPedido.profilePhoto

        });



        return res.render('user/userDetail');


    },


    getCreate:
        (req, res) => {
            return res.render('user/create');

        },



   profile:
        (req, res) => {
            
        const id = req.body.id

        // importamos el array de productos ya existente y lo taducimos a Json 
        const usuariosJSON = fs.readFileSync(path.join(__dirname, "../data/usersDB.json"), "utf-8");
        const usuarios = JSON.parse(usuariosJSON);

        const usuarioPedido = usuarios.find(usuarioActual => usuarioActual.id == id);
        res.render("user/profile"/* , { user: usuarioPedido 
       

        }*/);

            return res.render('user/profile')
             }, 
    logout:
        (req, res) => {
            return res.render('user/logout');

        },


}
module.exports = controller;



/*
 <u style="color:peru"> <h1 style="color:peru" > Hola <%= user.nombre %></h1> </u>
    <h3> Email:<%= user.email%> </h3>
    <h3> Nombre:<%= user.nombre %> </h3>
    <h3> Apellido:<%= user.apellido %> </h3>
    <h3> Contraseña: <%=  user.contrasenia %> </h3>
    <h3> Confirmacion de contraseña<%= user.confirmacionDeContrasenia %> </h3>
    <h3> Trerminos Aceptados <%= user.terminosaceptados %> </h3>
    <h3> Foto De Perfil: <br><img width="200" src="../../<%= user.profilePhoto %>" alt=""> </h3>


<a href="./edit"> > <button> Edita tus Datos</button></a> --></br>*/