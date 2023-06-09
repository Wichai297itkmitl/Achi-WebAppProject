const Business = require('../../models/business/business');
const Token = require('../../utilities/token');
const CheckOut = require('../../models/business/checkout')


const getAdress = async (req, res, next)=>{
    try{
        const user = req.user_info.customer_id;
        const address = await CheckOut.getCustomer_address(user)
        res.send(address)
    }catch(er){
        console.log(er);
    }
}
module.exports.getAdress = getAdress;

const newAddress = async (req, res, next) =>{
    try{
        const user = req.user_info.customer_id;
        const address = req.body
        const insert = await CheckOut.add_address(user,address);
        if (insert.status == true){
            res.send(insert);
        }else{
            res.status(402).send('Have Error Someting? Find it!')
        }
    }catch(er){
        console.log(er);
        res.status(402).send('Have Error Someting? Find it!')
    }
};
module.exports.newAddress = newAddress;


const new_order = async (req, res, nect) =>{
    try{
        const order = req.body;
        console.log("Controller Order");
        if (!order){
            res.status(402).send({
                message: "Data Not Found!",
                status: false
            });
        }
        const create = await CheckOut.create_order(order);
        if (create.des){
            return res.status(402).send({
                status: create.status,
                create: create.create,
                des: create.des
            })
        };
        if (create.status == false){
            return res.status(400).send({
                status: create.status,
                create: create.create
            })
        }
        res.status(200).send({
            status: create.status,
            create: create.create
        });

    }catch(error){
        console.log(error);
        res.status(401).send({
            status: false,
            error: error
        })
    }
};

module.exports.new_order = new_order;


