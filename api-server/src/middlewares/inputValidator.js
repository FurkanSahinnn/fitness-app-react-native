import Joi from "joi";

const userSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
        .pattern(new RegExp('^[A-Z](?=.*[a-z])(?=.*\\d)[A-Za-z0-9]{7,}$'))
        .required()
        .messages({
            'string.pattern.base': 'Şifre en az 8 karakter olmalı, ilk harf büyük olmalı, en az 1 küçük harf ve 1 rakam içermeli.',
            'string.empty': 'Şifre alanı boş bırakılamaz.',
            'any.required': 'Şifre girmeniz gerekmektedir.'
        })
});

const authSchema = Joi.object({
    name: Joi.string().min(3).max(30),
    email: Joi.string().email().required(),
    password: Joi.string()
        .pattern(new RegExp('^[A-Z](?=.*[a-z])(?=.*\\d)[A-Za-z0-9]{7,}$'))
        .required()
        .messages({
            'string.pattern.base': 'Şifre en az 8 karakter olmalı, ilk harf büyük olmalı, en az 1 küçük harf ve 1 rakam içermeli.',
            'string.empty': 'Şifre alanı boş bırakılamaz.',
            'any.required': 'Şifre girmeniz gerekmektedir.'
        })
});

export const validateAuth = (req, res, next) => {
    const { error } = authSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ 
            message: error.details[0].message 
        });
    }
    next();
};

export const validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ 
            message: error.details[0].message 
        });
    }
    next();
};
