//index.js 

import express from 'express';
import cors from 'cors';
import { addresses } from './data/deliveryAddresses.js'

const app = express();

app.use(express.json());
app.use(cors());

app.all("/", (req, res) => {
    res.send("I'm up")
})

let orders = [];

// CREATE
app.post('/addAddress', (req, res) => {
    const newAddress = req.body;
    addresses.push(newAddress);
    res.json({
        message: "Address successfully added"
    })
})

// READ
app.get('/getAllAddress', (req, res) => {
    res.json(addresses)
});

// UPDATE
app.put('/updateAddress/:id', (req, res) => {
    const updatedAddress = req.body;
    // added == instead of === in below conversion because id can be number as well as string
    const addressIndex = addresses.findIndex(item => item.id == req.params.id);
    if (addressIndex !== -1) {
        addresses[addressIndex] = { id: req.params.id, ...updatedAddress };
        res.json({
            message: "Address updated successfully"
        })
    }
    else {
        res.json({
            message: "Error updating address"
        })
    }
})

// DELETE
app.delete('/deleteAddress/:id', (req, res) => {
    const addressIndex = addresses.findIndex(item => item.id == req.params.id);
    if (addressIndex !== -1) {
        addresses.splice(addressIndex, 1);
        res.json({
            message: "Address deleted successfully"
        })
    }
    else {
        res.json({
            message: "Error deleting address"
        })
    }
})

// API TO PLACE ORDER
app.post('/placeOrder', (req, res) => {
    const newOrder = req.body;
    const orderId = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    orders.push({ ...newOrder, orderId: orderId });
    res.json({
        type: "Success",
        message: `Order placed with order Id : ${orderId}`
    })
})

// API TO FETCH ALL ORDERS
app.get('/getAllOrders', (req, res) => {
    res.json(orders)
})

const port = 5111;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
}); 