var mongoose = require('../lib/mongoose'),
  Schema = mongoose.Schema;
var ObjectID = require('mongodb').ObjectID;

var schema = new Schema({
  text: {
    type: String,
    required: true
  },
  html: {
    type: String,
    required: true
  }
});

schema.statics.saveHtml = function(text, html, callback){
  var htmlDb = this;
  //console.log(text, html);
  var newText = new htmlDb({ text: text, html: html });

  newText.save(function (err, newText) {
    if (err) return callback("Error during saving");
    var id = newText._id;
    var result = {"status":1,"id":id};
    return callback(null,result);
  });
}

schema.statics.getHtml = function(id, callback){

  try {
    var _id = new ObjectID(id);
  } catch (e) {
    console.error(e);
    callback("Bad id");
  }

  var htmlDb = this;
  htmlDb.findById(_id, function (err, obj){
    if (err){
      console.error(err);
      callback("Error during find html by id");
    }

    if (obj){
      var result = {"status":1,"text":obj.text,"html":obj.html};
      callback(null,result);
    }else{
      callback("Cannot find html by id");
    }

  });
}

exports.htmldb = mongoose.model('htmldb', schema);