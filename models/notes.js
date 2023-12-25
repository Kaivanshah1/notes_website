const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const notesSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
    status: {
        type: String,
    },
})

module.exports = mongoose.model('Notes', notesSchema);

// const fs = require('fs');
// const path = require('path');
// const mongodb = require('mongodb');
// const getDb = require('../connection/db').getDb;

// const pathToFile = path.join(path.dirname(require.main.filename), 'data', 'notes.json');

// const getDataFromFile = (callbackFn) => { //why do we need callback here ==> because readFile is an asynchronous in nature so The function immediately returns, and the return fileContent; statement is not waited for.At some point in the future, when the file reading operation is complete, the callback function (err, fileContent) => { ... } is executed.
//     fs.readFile(pathToFile, (err, fileContent) => {
//         if(err){
//             return callbackFn([]);
//         }
//         callbackFn(JSON.parse(fileContent));
//     })
// }
// module.exports = class Notes{
//     constructor(title, description, imageUrl, noteId ){
//         this._id = noteId;
//         this.title = title;
//         this.description = description;
//         this.imageUrl = imageUrl;
//         this.status = 'unapproved';
//     }

//     save() {
//         const db = getDb();
//         let dbOp;
    
//         // Ensure that this._id is a valid ObjectId
//         const objectId = this._id ? new mongodb.ObjectId(this._id) : null;
    
//         if (objectId) {
//             dbOp = db.collection('notes').updateOne(
//                 { _id: objectId },
//                 {
//                     $set: {
//                         title: this.title,
//                         description: this.description,
//                         imageUrl: this.imageUrl,
//                         status: this.status
//                     }
//                 }
//             );
//         } else {
//             dbOp = db.collection('notes').insertOne(this);
//         }
    
//         return dbOp
//             .then(result => {
//                 console.log(result);
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     }
    
//         // get the existing notes
//         // push the new notes
//         // save the changes

//         getDataFromFile((notes) => {
//             this.noteId = Math.floor(Math.random()*1000).toString();
//             notes.push(this);
//             fs.writeFile(pathToFile, JSON.stringify(notes), (err) => {  //we are writing the data received from the form into a file but we need to add the new data and the old data should remain there so first get the old data in the file and then push the new data to it.
//                 if(err){
//                     console.log(err);
//                 }
//             })
//         })
 
//     static fetchAll() {  //this method is used to fetch the data from file and show it to the notes page or any page 
//         const db = getDb();
//         return db.collection('notes').find().toArray().then(notes => {
//             console.log(notes);
//             return notes;
//         }).catch((err) => {
//             console.log(err);
//         })
//         getDataFromFile((notes) => {
//             if(isAdmin){
//                 return callbackFn(notes);
//             }
//             const approvedNotes = notes.filter((n) => n.status === 'approved');
//             callbackFn(approvedNotes);
//         });    
//     }

//     static findNoteById(noteId){
//         const db = getDb();
//         return db.collection('notes').find({_id: new mongodb.ObjectId(noteId)}).next().then((note) => {
//             console.log(note);
//             return note;
//         }).catch(err => {
//             console.log(err);
//         })
//     }

//     static delete(noteId) {
//         const db = getDb();
//         return db.collection('notes').deleteOne({_id: new mongodb.ObjectId(noteId)})
//     }
    
//     saveChanges(){
//         const db = getDb();
//         return db.collection('notes').updateOne({_id: new mongodb.ObjectId(this._id)}, 
//         {
//             $set: 
//             {
//                 title : this.title,
//                 description : this.description,
//                 imageUrl : this.imageUrl,
//                 status : this.status
//             }
//         })
//         getDataFromFile((notes) => {
//             const noteIndex = notes.findIndex((n) => n.noteId === this.noteId); //finding index of the note which we are going update
//             const notesCopy = [...notes];   //making a copy of the notes so that we do not change the original array of notes
//             notesCopy[noteIndex] = this;    //assigning the updated note to the note array
//             //writing to the file
//             fs.writeFile(pathToFile, JSON.stringify(notes), (err) => { 
//                 if(err){
//                     console.log(err);
//                 }
//             })

//             if (noteIndex !== -1) {  // Check if the note with the given ID exists
//                 const notesCopy = [...notes];
//                 notesCopy[noteIndex] = this;
    
//                 fs.writeFile(pathToFile, JSON.stringify(notesCopy), (err) => {
//                     if (err) {
//                         console.log(err);
//                     }
//                 });
//             } else {
//                 console.log("Note not found for update.");
//             }
//         })
//     }

//     static approve(noteId){
//         const db = getDb();
//         return db.collection('notes').updateOne({_id: new mongodb.ObjectId(this._id)}, 
//         {
//             $set: 
//             {
//                 title : this.title,
//                 description : this.description,
//                 imageUrl : this.imageUrl,
//                 status : this.status
//             }
//         })
//         getDataFromFile((notes) => {
//             const noteIndex = notes.findIndex((n) => n.noteId === noteId);
//             const notesCopy = [...notes];
//             const singleNote = notesCopy[noteIndex];
//             const notesToApprove = {
//               ...singleNote,
//               status: singleNote.status === 'approved' ? 'unapproved' : 'approved',
//             };
//             notesCopy[noteIndex] = notesToApprove;
//             fs.writeFile(pathToFile, JSON.stringify(notesCopy), (err) => {
//               if (err) {
//                 console.log('error in saving file', err);
//               }
//             });
//           });
//     }
// };