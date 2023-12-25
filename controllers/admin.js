const Notes = require('../models/notes');

exports.getManageNotes = (req, res, next) => {
    Notes.find().then((notes) => {
        res.render('admin/index', {
            pageTitle: ' Manage Notes ',
            path: '/manage-notes',
            notes: notes,
        });
    }, true)
}

exports.approveNote = async (req, res, next) => {
    try {
        const noteId = req.body.noteId;

        // Use Mongoose method to update the status to 'approved'
        const updatedNote = await Notes.findByIdAndUpdate(
            noteId,
            { $set: { status: 'approved' } },
            { new: true }
        );

        if (!updatedNote) {
            console.log('Note not found for approval.');
            return res.redirect('/admin/manage-notes');
        }

        console.log('Note approved successfully.');
        res.redirect('/admin/manage-notes');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};