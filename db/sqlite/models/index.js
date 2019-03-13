module.exports = {
  AbstractModel: require('./abstract.model').AbstractModel,

  UsersModel: require('./users.model').UsersModel,
  NotesModel: require('./notes.model').NotesModel,
  TagsModel: require('./tags.model').TagsModel,

  LikesModel: require('./likes.model').LikesModel,
  NotesTagsModel: require('./notes-tags.model').NotesTagsModel,
}
