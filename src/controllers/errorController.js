const errorController = {
    index: (req, res) => {
        return res.render('index');

    },
   register: (req, res) => {
        return res.render('register');
    },
    login: (req, res) => {
        return res.render('login');
    },
    productCart: (req, res) => {
        return res.render('productCart');
},
Userdelete: (req, res) => {
    return res.render('userDelete'); },

    Usercreate:  (req, res) => {
        return res.render('Usercreate'); },

        edit:  (req, res) => {
            return res.render('edit'); },

            error:  (req, res) => {
                return res.render('error'); }

 }

module.exports = errorController;
