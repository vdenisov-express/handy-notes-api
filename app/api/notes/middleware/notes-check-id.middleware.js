const handlerFor = require('@shared/handlers');
const { NotesModel } = require('@api/notes/notes.model');


const tableNotes = new NotesModel();


module.exports = (req, res, next) => {

  tableNotes
    .checkId(req.params.id)

    .then(noteObj => {
      noteObj ? next() : handlerFor.ERROR_NOT_FOUND(res, 'note with this `id` not found !')
    })

    .catch(err => handlerFor.ERROR_ON_DATABASE(res, err));

}
