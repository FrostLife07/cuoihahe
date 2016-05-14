'use strict';

var Comment = require('./comment.model');
var express = require('express');

exports.addComment = function(req, res) {
  var newComment = new Comment();
  newComment.author.id = req.body.authorId;
  newComment.author.name = req.body.authorName;
  newComment.author.email = req.body.authorEmail;
  newComment.gravatar = req.body.gravatar;
  newComment.comment = req.body.comment;
  newComment.lookId = req.body.lookId;
  newComment.createTime = Date.now();

  newComment.save(function(error, comment) {
    if(error) {
      console.log('Error saving comment');
      return res.send(500);
    } else {
      console.log(comment);
      res.status(200).json(comment);
    }
  });

};

exports.getComments = function(req, res) {
  Comment.find({
    'lookId': req.params.id
  })
  .sort({
    createTime: -1
  })
  .exec(function(error, comments) {
    if(error) {
      return res.send(500);
    }
    if(!comments) {
      return res.send(404);
    }
    console.log(comments);
    return res.status(200).json(comments);

  });
};

exports.update = function(req, res){
  Comment.findOneAndUpdate({_id: req.params.id}, {$set: {comment: req.body.comment}}, {new: true}, function(err, doc){
     if(err) return res.status(500).json({message: 'Error to update comment!'});
     return res.json({message: 'Update successfully!', comment: doc});
  });  
};

exports.delete = function(req, res){
    Comment.findByIdAndRemove(req.params.id, function(err){
       if(err) return res.status(500).json({message: 'Error to delete comment!'});
       return res.json({message: 'Delete successfully!'});
    });
};

exports.getAll = function(req, res){
  Comment.find({}, function(err, comments){
      if(err) return res.status(404).json(err);
      return res.json(comments);
  })  ;
};