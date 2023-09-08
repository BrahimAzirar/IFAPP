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
}

module.exports = { Model };