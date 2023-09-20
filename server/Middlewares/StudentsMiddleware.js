const { Model } = require('../Models/Model');


const CheckEmailIsNotExist = async (req, res, next) => {
    try {
        const { mysql } = req.app.locals;
        const { Email } = req.body;
        const sql = "SELECT ? IN (SELECT Email FROM Students) AS isExist";
        const result = await Model.IsIxist(mysql, [Email], sql);
        if (!result) next();
        else res.json({ err: 'هذا الإيمايل موجود بالفعل أذخل إيمايل أخر' });
    } catch (error) {
        console.log(`The error from StudentsMiddleware.js in CheckEmailIsNotExist: ${error.message}`);
        res.json({ err: 'خطأ في الخادم حاول لاحقا' });
    };
};

const CheckPhoneNumberIsExist = async (req, res, next) => {
    try {
        const { mysql } = req.app.locals;
        const { Tele } = req.body;
        const sql = "SELECT ? IN (SELECT Tele FROM Students) AS isExist";
        const result = await Model.IsIxist(mysql, [Tele], sql);
        if (!result) next();
        else res.json({ err: 'هذا رقم الهاتف موجود بالفعل أذخل رقم أخر' });
    } catch (error) {
        console.log(`The error from StudentsMiddleware.js in CheckPhoneNumberIsExist: ${error.message}`);
        res.json({ err: 'خطأ في الخادم حاول لاحقا' });
    }
};

module.exports = { CheckEmailIsNotExist, CheckPhoneNumberIsExist };