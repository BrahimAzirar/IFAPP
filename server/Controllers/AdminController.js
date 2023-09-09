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

const login = async (req, res) => {
    try {
        const { mysql } = req.app.locals;
        const { Username, _Password } = req.body;
        const key = ";mclmjs0932jflmvslosv;ovno;vh;HFCN;VNVNLIVUH9P8320FONS;JD";
        const sql = `SELECT ? IN (SELECT Username FROM Admins) AND AES_ENCRYPT(?, ?) IN (SELECT _Password FROM Admins) AS isExist`;
        const result = await Model.IsIxist(mysql, [Username, _Password, key], sql);
        if (result) {
            req.session.data = { isAuth: true, user: Username };
            res.status(200).json({ response: true, nextPage: `/admin/dashboard/${Username}` });
        }
        else res.status(200).json({ response: false });
    } catch (error) {
        console.log(`The error from AdminController.js DeleteData: ${error.message}`);
        res.json({ err: 'خطأ في الخادم حاول لاحقا' });
    };
}

module.exports = { GetAllStudentsRequests, DeleteData, login };