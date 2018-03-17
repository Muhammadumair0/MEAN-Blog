// // have to check seeding the database!!


// require('dotenv').config();
// const MongoClient = require('mongodb').MongoClient;
// const bcrypt = require('bcrypt');

// const users = require('./users');

// function seedCollection(collectionName, initialRecords) {

//     MongoClient.connect(process.env.DB_CONN, (err, client) => {
//         console.log('connected to mongodb...');

//         const db = client.db("mean-blog");
//         const mydb = db.collection('users');

//         mydb.remove();

//         initialRecords.forEach((item) => {
//             if (item.password) {
//                 item.password = bcrypt.hashSync(item.password, 10);
//             }
//         });

//         console.log('inserting records...');
//         console.log(initialRecords);
//         mydb.insertMany(initialRecords, (err, result) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log(`${result.insertedCount} records inserted.`);
//                 console.log('closing connection...');
               
//                 console.log('done.');
//             }
//         });

//     });
// }


// seedCollection('users', users);