const path = require('path');
const indianTime = require('utc-to-indiantime');
const Customer = require('../models/customerModel');
const { removeFile } = require('../middlewares/commonMiddlewares');

exports.getCustomers = async (req, res) => {
    console.log('Inside getCustomers');
    const customers = await Customer.find({});
    res.status(200).json({ customers });
}

exports.addCustomer = async (req, res) => {
    console.log('Inside addCustomer');
    const { dob, ...rest } = req.body;
    let newDob;
    if (dob) { newDob = indianTime(new Date(dob)) }
    const newCustomer = { ...rest, dob: newDob }
    if (req.file) {
        newCustomer.profilePicture = req.file.filename;
    }
    const customer = new Customer(newCustomer);
    customer.save().then(customer => {
        res.status(200).json({ msg: "Customer Added Successfully.", customer });
    }).catch(error => {
        res.status(400).json({ msg: "Error To Add Customer", error: error });
    })
}

exports.deleteCustomer = async (req, res) => {
    console.log('Inside deleteCustomer');
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (customer.profilePicture != 'noImage.jpeg') {
        removeFile(path.join(__dirname, '../uploads/', customer.profilePicture));
    }
    res.status(200).json({ msg: 'Customer Delete Successfully', customer });
}

exports.getCustomer = async (req, res) => {
    console.log('Inside getCustomer');
    const customer = await Customer.findOne({ _id: req.params.id });
    if (customer) {
        res.status(200).json(customer);
    } else {
        res.status(400).json({ msg: "No Customer Found !!" });
    }
}

exports.updateCustomer = async (req, res) => {
    console.log('Inside updateCustomer');
    let newDob;
    const { dob, ...rest } = req.body;
    if (dob) { newDob = indianTime(new Date(dob)) }
    const updatedCustomer = { ...rest, dob: newDob };
    Customer.findOneAndUpdate({ _id: req.body.id }, updatedCustomer).then(customer => {
        res.status(200).json({ msg: "Customer Updated Successfully.", customer });
    }).catch(error => {
        res.status(400).json({ msg: "Error To Update Customer", error: error });
    })
}

exports.uploadProfilePicture = async (req, res) => {
    console.log('Inside uploadProfilePicture');
    const profilePicture = req.file.filename;
    const profilePicUpdate = await Customer.findOneAndUpdate({ _id: req.body.id }, { profilePicture })
    res.status(200).json({ msg: "Profile Picture Updated Successfully.", profilePicture, profilePicUpdate });
}