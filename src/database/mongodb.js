const Discord = require('discord.js');
const config = require('.././config');
const userSchema = require('../database/schema/user.js');

module.exports.fetchUser = async function(key) {

    let userDB = await userSchema.findOne({ id: key })
    if(!userDB) {
        return userDB;
    }else{
        userDB = new userSchema({
            id: key,
            registeredAt: Date.now()
    })
    await userDB.save().catch(err => console.log(err))
    return userDB;
    }
};