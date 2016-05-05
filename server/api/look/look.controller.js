'use strict';

var _= require('lodash');
var Look = require('./look.model');
var path = require('path');
var utils = require('../../utils/utils.js');

//vanlam
var fs = require('fs');

exports.userLooks = function(req, res) {
  var userEmail = req.query.email;
  Look.find({
    email: {
      $in: userEmail
    }
  })
  .sort({
    createTime: -1
  })
  .exec(function(error, looks) {
    if(error) {
      return handleError(res, error);
    }
    console.log(looks);
    return res.status(200).json(looks);

  });

};


exports.allLooks = function(req, res) {
  Look.find({})
  .sort({
    createTime: -1
  })
  .exec(function(error, looks) {
    if (error) {
      return handleError(res, error);
    }
    if (!looks){
      return res.send(404);
    }
    console.log(looks);

    return res.status(200)
    .json(looks);
  });

};


exports.scrapeUpload = function(req, res) {

  var random = utils.randomizer(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

  utils.downloadURI(req.body.image, './client/assets/images/uploads/' + random + '.png', function(filename) {
    console.log('Done!');

    var newLook = new Look();
    newLook.title = req.body.title;
    newLook.email = req.body.email;
    newLook.linkURL = req.body.linkURL;
    newLook.description = req.body.description;
    newLook.userName = req.body.name;
    newLook._creator = req.body._creator;
    newLook._createTime = Date.now();
    newLook.upVotes = 0;
    newLook.image = filename.slice(8);
    //vanlam
    newLook.type = req.body.type;
    newLook.save(function(error, item) {
      if(error) {
        console.log('Error occured saving image');
      } else {
        console.log('Success post saved');
        console.log(item);
        res.status(200)
        .json(item);
      }

    });


  });


};

exports.upload = function(req, res) {
  var newLook = new Look();
  var fileimage = req.middlewareStorage.fileimage;

  newLook.image = '/assets/images/uploads/' + fileimage;
  newLook.email = req.body.email;
  newLook.linkURL = req.body.linkURL;
  newLook.title = req.body.title;
  newLook.description = req.body.description;
  newLook.userName = req.body.name;
  newLook._creator = req.body._creator;
  newLook.createTime = Date.now();
  newLook.upVotes = 0;
  //vanlam
  newLook.type = req.body.type;
  newLook.save(function(error, item) {
    if(error) {
      console.log('Error occured saving image');
    } else {
      console.log('Success post saved');
      console.log(item);
      res.status(200)
        .json(item);
    }

  });

};

exports.singleLook = function(req, res) {
  console.log('Receidved get');
  Look.findById(req.params.lookId, function(error, look) {
    if(error) {
      return handleError(res, error);
    }
    if(!look) {
      return res.send(404);
    }
    return res.json(look);
  });
};


exports.popLooks = function(req, res) {

  Look.find(req.params.id)
    .sort('-upVotes')
    .limit(6)
    .exec(function(error, looks) {
      if(error) {
        return handleError(res, error);
      }
      console.log(looks);
      return res.json(looks);
    });
};

exports.update = function(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  Look.findById(req.params.id, function(error, look) {
    if(error) {
      return handleError(res, error);
    }
    if(!look) {
      return res.send(404);
    }
    var updated = _.merge(look, req.body);
    updated.save(function(error) {
      if(error) {
        return handleError(res, error);
      }
      console.log(look);
      return res.json(look);

    });

  });

};

exports.delete = function(req, res) {
  Look.findById(req.params.id, function(error, look) {
    if(error) {
      return handleError(res, error);
    }
    if(!look) {
      return res.send(404);
    }
    var image = look.image;
    look.remove(function(error) {
      if(error) {
        return handleError(res, error);
      }
     if(fs.existsSync(image)){
      fs.unlinkSync(image);
     }
      return res.send(200);
    });

  });
};

exports.addView = function(req, res) {
  Look.findById(req.params.id, function(error, look) {
    if(error) {
      return handleError(res, error);
    }
    if(!look) {
      return res.send(404);
    }
    look.views++;
    look.save(function(error) {
      if(error) {
        return handleError(res, error);
      }
      return res.json(look);
    });
  });
};

exports.addUpvote = function(req, res) {
  Look.findById(req.params.id, function(error, look) {
    if(error) {
      return handleError(res, error);
    }
    if(!look) {
      return res.send(404);
    }
    look.upVotes++;
    look.save(function(error) {
      if(error) {
        return handleError(res, error);
      }
      return res.json(look);
    });

  });
};


function handleError(res, err) {
  return res.send(500, err);
}
