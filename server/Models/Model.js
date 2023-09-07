class Model {
    static async InsertData (db, obj, sql) {
        try {
            await db.promise().query(sql, obj);
        } catch (error) {
            console.log(`the error from Model.js in InsertData: ${error.message}`);
        }
    }

    static async IsIxist (db, obj, sql) {
        try {
            const result = await db.promise().query(sql, obj);
            return result[0][0].isExist;
        } catch (error) {
            console.log(`the error from Model.js in SelectData: ${error.message}`);
        };
    }
}

module.exports = { Model };