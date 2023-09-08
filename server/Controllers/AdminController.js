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

const DeleteData = async (req, res) => {
    try {
        const { mysql } = req.app.locals;
        const targets = req.body;

        const result = await Model.DeleteData(mysql, targets);
        if (!result) throw new Error(''); 
    } catch (error) {
        console.log(`The error from AdminController.js DeleteData: ${error.message}`);
        res.json({ err: 'خطأ في الخادم حاول لاحقا' });
    };
};

module.exports = { GetAllStudentsRequests, DeleteData };