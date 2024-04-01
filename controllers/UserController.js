class UserController {

    constructor(UserService) {
        this.UserService = UserService;
    }

    async login(req, res) {
        try {

            const { username, password, remember } = req.body;

            const user = await this.UserService.getUser(username, password, (result) => {

                if (result?.success) {
                    res.status(200).json({
                        user: result.user,
                        error: false,
                        message: result.message,
                        remember: remember
                    });
                } else if (result.error) {
                    res.status(200).json({
                        error: true,
                        message: result.message,
                    });
                }
            });

        } catch (error) {
            console.log(error)
            res.status(500).json(
                {
                    error: true,
                    message: 'Internal Server Error'
                });
        }
    }

    async register(req, res) {
        try {
            const user = {
                fullname: req.body?.fullname,
                username: req.body?.username,
                email: req.body?.email,
                password: req.body?.password,
                country: req.body?.country === "other" ? req.body?.custom_country : req.body?.country,
            }

            const isRegistered = await this.UserService.checkIsRegistered(user.username, user.email);

            if (isRegistered) {
                res.status(200).json({
                    error: true,
                    message: 'Username or email are already registered.'
                });
            }
            else {
                const user_created = await this.UserService.createUser(user, res);
                if (user_created) {
                    return res.status(200).json({
                        error: false,
                        message: "User succesfully created",
                        user: user_created
                    });
                } else {
                    return res.status(500).json({ error: true, message: 'Internal Server Error' });
                }
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({
                error: true,
                message: 'Internal Server Error'
            });
        }
    }

}

module.exports = UserController;