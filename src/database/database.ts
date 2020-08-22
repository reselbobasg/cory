import mongoose from 'mongoose';
export class Database {
  constructor() {
    this._connect()
  }
_connect() {
    let connectStr: string  = 'mongodb://localhost:27017/cory';
    if(process.env.MONGO_USER &&process.env.PWD){
        connectStr = `mongodb://${process.env.MONGO_USER}:${process.env.PWD}@${process.env.MONGO_CLOUD_HOST}/${process.env.DB}`;
    }
    console.log({connectStr});
     mongoose.connect(connectStr, { useNewUrlParser: true })
       .then(() => {
           mongoose.connection.once('open', () => {
               console.log('connected to database');
           });
       })
       .catch(err => {
         console.error({message: 'Database connection error', err})
       })
  }

  close() {
      mongoose.disconnect();
  }
}
//module.exports = new Database();