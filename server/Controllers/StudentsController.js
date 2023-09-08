const { Model } = require('../Models/Model');


const RegisterStudents = async (req, res) => {
    try {
        const { mysql } = req.app.locals;
        const date = new Date();
        const sql = `
            INSERT INTO Students(FirstName, LastName, Adress, Email, Tele, AcademicLevel, RegisteringDate)
                VALUE (?, ?, ?, ?, ?, ?, ?);
        `;
        const data = { 
            ...req.body,
            RegisteringDate: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}` 
        }

        const result = await Model.InsertData(mysql, Object.values(data), sql);
        if (result) res.status(200).json({ response: true });
        else throw new Error('');
    } catch (error) {
        console.log(`The error from StudentsController.js in RegisterStudents: ${error.message}`);
        res.json({ err: 'خطأ في الخادم حاول لاحقا' });
    }
};

module.exports = { RegisterStudents };