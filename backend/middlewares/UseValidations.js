const {body} = require("express-validator");

const userCreateValidation = () =>{ 
     return [
        body("name")
            .isString()
            .withMessage("O Nome é obrigatorio")
            .isLength({min:3})
            .withMessage("O nome precisa ter no minimo 3 caracteres"),
        body("email")
            .isString()
            .withMessage("o e-mail é obrigatorio.")
            .isEmail()
            .withMessage("Insira um e-mail valido."),
        body("password")
            .isString()
            .withMessage("A senha é obrigatorio.")
            .isLength({min:5})
            .withMessage(" A senha precisa ter no minimo 5 caracteres."),
        body("confirmpassword")
            .isString()
            .withMessage("A confirmação de senha é obrigatorio")
            .custom((value,{ req})=> {
                if(value != req.body.password){
                    throw new Error("As senhas não sao iguais.")
                }
                return true;
            }),

    ];
    
};


const loginValidation = () =>{
    return[
        body("email")
            .isString()
            .withMessage("O email é obrigatorio")
            .isEmail()
            .withMessage("Insira um e-mail valido."),
        body("password")
            .isString()
            .withMessage("A senha é obrigatorio"),
    ];
};

module.exports = {
    userCreateValidation,
    loginValidation,
};