
const router = require('express').Router();

const UserService = require("../services/ConfigurationUser");
const UserController = require("../controllers/UserController");

const UserServiceInstance = new UserService();

const UserControllerInstance = new UserController(
    UserServiceInstance
);

router.post('/login', (req, res) =>
    UserControllerInstance.login(req, res)
);

router.post('/register', (req, res) =>
    UserControllerInstance.register(req, res)
);


module.exports = router;