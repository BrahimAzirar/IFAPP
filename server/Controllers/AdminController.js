const { Model } = require('../Models/Model');

const GetAllStudentsRequests = async (req, res) => {
    try {
        const { mysql } = req.app.locals;
        const result = await Model.GetAllData(mysql, "SELECT * FROM Students");
        res.status(200).json({ response: result[0] });
    } catch (error) {
        console.log(`The error from AdminController.js GetAllStudentsRequests: ${error.message}`);
        res.json({ err: 'خطأ في الخادم حاول لاحقا' });
    }
}

module.exports = { GetAllStudentsRequests };