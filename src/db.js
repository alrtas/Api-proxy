async function connect() {
    try 
    {
        const mongoose = require('mongoose');
        if(mongoose.connection.readyState == 0){
            mongoose.Promise =  global.Promise;
            await mongoose.connect('mongodb://'+process.env.MONGO_PROXY_URI
            ,{
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false
            })
            .then(
                console.log('[DataBase] --> Connected')
            )
            .catch((err)=>{
                console.dir('[DataBase] --> Not connected: '+err);
                connect()
            })  
        }
        return mongoose;      
    } 
    catch (err) 
    {
        console.dir('[DataBase] --> FATAL ERROR: '+err)
    }
}
module.exports = {  connect  };