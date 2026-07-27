const db =require('../models');
async function connectDatabase(){
    try {
        await db.sequelize.authenticate();
        console.log('database connected suscesfully');
        await db.sequelize.sync({alter: true});
        console.log('database syncronized')

    }
    catch (err) {
        console.error('database connection failed', err.message);

    }
}
module.exports = connectDatabase;