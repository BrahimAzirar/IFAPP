class Model {
    static async InsertData (db, obj, sql) {
        try {
            await db.promise().query(sql, obj);
            return true;
        } catch (error) {
            console.log(`the error from Model.js in InsertData: ${error.message}`);
            return false;
        }
    }

    static async IsIxist (db, obj, sql) {
        try {
            const result = await db.promise().query(sql, obj);
            return result[0][0].isExist;
        } catch (error) {
            console.log(`the error from Model.js in IsIxist: ${error.message}`);
        };
    }

    static async GetAllData (db, sql) {
        try {
            const result = await db.promise().query(sql);
            return result;
        } catch (error) {
            console.log(`the error from Model.js in GetAllData: ${error.message}`);
        }
    }

    static async DeleteData (db, targets) {
        try {
            const sql1 = `DELETE FROM Students`;
            const sql2 = `DELETE FROM Students WHERE StudentId = ?`;

            if (targets.length) {
                for (let ele of targets) {
                    await db.promise().query(sql2, ele);
                };
            } else {
                await db.promise().query(sql1);
            };
        } catch (error) {
            console.log(`the error from Model.js in DeleteData: ${error.message}`);
            return false;
        }
    }
}

module.exports = { Model };