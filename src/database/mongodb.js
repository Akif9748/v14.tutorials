const userSchema = require('../database/schema/user.js');

module.exports.fetchUser = async id => await userSchema.findOne({ id }) || await userSchema.create({ id });