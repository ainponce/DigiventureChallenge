const connection = require('../db/mongodbConnection.js');
const User = require('../models/UserSchema');
const bcrypt = require("bcryptjs")

class UserService {

    async checkIsRegistered(username, email) {
        try {
            await connection();
            const findUser = await User.findOne({ $or: [{ username: username }, { email: email }] });

            if (findUser) {
                return true;
            } else {
                return false
            }

        } catch (error) {
            return false;
        }
    }

    async createUser(user) {
        try {
            await connection();
            const newUser = await User.create(user);
            return newUser;
        } catch (error) {
            throw error;
        }
    }

    async getUser(username, password, callback) {

        try {
            await connection();

            const findUser = await User.findOne({ username: username }).exec(function (error, user) {
                if (error) {
                    callback({
                        error: true,
                        message: "Incorrect username or password"
                    })
                } else if (!user) {
                    callback({
                        error: true,
                        message: "Incorrect username or password"
                    })
                } else {
                    user.comparePassword(password, function (matchError, isMatch) {
                        if (matchError) {
                            callback({
                                error: true,
                                message: 'Incorrect password'
                            })
                        } else if (!isMatch) {
                            callback({
                                error: true,
                                message: 'Incorrect password'
                            })
                        } else {
                            user.password = undefined
                            callback({
                                success: true,
                                error: false,
                                user: user,
                                message: "Successful login",
                            })
                        }
                    })
                }
            })

        } catch (error) {
            throw error;
        }
    }

}

module.exports = UserService;