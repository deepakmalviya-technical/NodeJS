const express = require('express');
const router = express.Router();

const {
    getCustomers,
    addCustomer,
    deleteCustomer,
    getCustomer,
    updateCustomer,
    uploadProfilePicture } = require('../controllers/customerController');

const { upload } = require('../middlewares/commonMiddlewares');

// Get All Customers
router.get('/', getCustomers);

// Add Customer
router.post('/', upload.single('profilePicture'), addCustomer);

// Delete Customer
router.delete('/:id', deleteCustomer);

// Get Single Customer By _id
router.get('/getCustomer/:id', getCustomer);

// Update Customer
router.put('/', updateCustomer);

// Update Profile Picture Only
router.post('/uploadProfilePicture', upload.single('profilePicture'), uploadProfilePicture);


module.exports = router;