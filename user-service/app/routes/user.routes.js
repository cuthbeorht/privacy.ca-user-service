module.exports = (app) => {
    const users = require("../controllers/user.controller.js");

    // New User
    app.post("/api/users", users.create);

    // get all users
    app.get("/api/users", users.findAll);

    // get one user
    app.get("/api/users/:userId", users.findOne);

    app.put("/api/users", users.update);

    app.delete("/users/:userId", users.delete);
}