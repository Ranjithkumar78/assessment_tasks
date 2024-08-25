const { body, validationResult } = require('express-validator');

const validateProduct = [
    body('name')
        .isString()
        .isLength({ min: 3, max: 50 })
        .withMessage('Name must be between 3 and 50 characters'),
    body('price')
        .isFloat({ min: 0 })
        .withMessage('Price must be a positive number'),
    body('description')
        .optional()
        .isLength({ max: 500 })
        .withMessage('Description cannot exceed 500 characters'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateProduct;
