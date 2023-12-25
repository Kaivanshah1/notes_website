const Notes = require('../models/notes');

exports.getIndex = (req, res, next) => {
    Notes.find().then(
        (notes) => {
            res.render('notes/index', {
                pageTitle: 'Notes',
                path: '/',
                notes: notes,
                isAuthenticated: req.session.isLoggedIn,
            });
        }
    ).catch(err => {
        console.log(err);
    });
};

exports.getAddNote = (req, res, next) => {
    res.render('notes/add-note', {
        pageTitle: 'Add a note',
        path: '/add-note',
        isEditMode: false,
        isAuthenticated: req.session.isLoggedIn,
    });
};

exports.postNotes = (req, res, next) => {
    const { title, description, imageUrl, noteId } = req.body;
    const notes = new Notes({
        title: title,
        description: description,
        imageUrl: imageUrl,
        noteId: noteId,
        status : 'unapproved'
    });
    notes.save().then(result => {
        console.log('Note created');
        res.redirect('/');
    }).catch(err => {
        console.log(err);
    });
};

exports.getNoteDetails = (req, res, next) => {
    const noteId = req.params.noteId;
    Notes.findById(noteId).then((_note) => {
        res.render('notes/note', {
            pageTitle: 'View Notes Details',
            path: '',
            note: _note,
            isAuthenticated: req.session.isLoggedIn,
        });
    }).catch(err => {
        console.log(err);
    });
};

exports.getEditNoteDetails = (req, res, next) => {
    const noteId = req.params.noteId;
    const isEdit = req.query.isEditing;
    Notes.findById(noteId).then((_note) => {
        res.render('notes/add-note', {
            pageTitle: 'Edit Notes Details',
            path: '',
            note: _note,
            isEditMode: isEdit,
            isAuthenticated: req.session.isLoggedIn,
        });
    });
};

exports.saveEditNote = (req, res, next) => {
    const reqBody = req.body;
    const { title, description, imageUrl, noteId } = reqBody;

    Notes.findOneAndUpdate(
        { _id: noteId }, 
        { $set: { title, description, imageUrl } },
        { new: true, upsert: true } 
    )
    .then(updatedNote => {
        res.redirect(`/note/${updatedNote._id}`);
    })
    .catch(err => {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    });
};

exports.deleteNote = (req, res, next) => {
    const noteId = req.body.noteId;
    Notes.findByIdAndDelete(noteId)
    .then((result) => {
        if (!result) {
            console.log('Note not found for deletion.');
            return res.redirect('/');
        }
        console.log('Note deleted successfully.');
        res.redirect('/');
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
    });
};