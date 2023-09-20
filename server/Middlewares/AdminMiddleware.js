require('dotenv').config();

const AdminIsAuthenticated = (req, res, next) => {
    try {
        if (req.session.data.isAuth) next();
    } catch (error) {
        console.log(`The error from AdminMiddleware.js in AdminIsAuthenticated: ${error.message}`);
        res.redirect(`${process.env.CLIENT_DOMAIN}`);
    };
};

module.exports = { AdminIsAuthenticated };