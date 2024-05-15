var request = require('superagent');
var config = require('../config');
var IncludeHandler = require('../src/IncludeHandler');

exports.showAllPosts = function (req, res, next) {
  var pageNum = parseInt(req.params.pageNum || 1);
  pageNum -= 1;

  request.get(config.baseUrl + '/static/posts.json', function (err, response) {
    if (err) {
      return next(err);
    }

    var itemsPerPage = config.itemsPerPage;
    res.locals.data = {
      AllPostStore: {
        postsByPage: {},
        numberOfPosts: response.body.posts.length,
        postListContent: response.body.postListContent,
      },
    };

    res.locals.data.AllPostStore.postsByPage[pageNum + 1] = response.body.posts.slice(
      itemsPerPage * pageNum,
      itemsPerPage * pageNum + itemsPerPage
    );
    res.locals.metaDescription = response.body.postListContent.metaDescription || '';

    next();
  });
};

exports.loadPostsViaAjax = function (req, res) {
  request.get(config.baseUrl + '/static/posts.json', function (err, response) {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(response.body.posts);
  });
};

exports.showSinglePost = function (req, res, next) {
  var id = req.params.id;

  request.get(config.baseUrl + '/static/posts.json', function (err, response) {
    if (err) {
      return next(err);
    }

    var posts = response.body.posts;
    var post = posts.find(function (post) {
      return post.id === parseInt(id, 10);
    });

    if (!post) {
      return next();
    }

    res.locals.data = {
      SinglePostStore: {
        currentPost: post,
        id: post.id,
        stateById: {},
      },
    };

    res.locals.metaDescription = post.metaDescription || post.title;
    res.locals.data.SinglePostStore.stateById[post.id] = {};
    res.locals.data.SinglePostStore.stateById[post.id].post = post;

    var includes = post.includes || [];
    var includeNum = includes.length;

    if (includeNum > 0) {
      res.locals.data.SinglePostStore.includes = [];
      var includeCallback = function (type, data, path) {
        res.locals.data.SinglePostStore.includes.push({
          type: type,
          value: data,
          path: path,
        });

        includeNum--;
        if (includeNum === 0) {
          res.locals.data.SinglePostStore.stateById[post.id].includes =
            res.locals.data.SinglePostStore.includes;
          next();
        }
      };

      includes.forEach(function (include) {
        var type = include.type;
        var path = include.path;
        IncludeHandler.handleInclude(type, path, includeCallback);
      });
    } else {
      next();
    }
  });
};

exports.loadSinglePostViaAjax = function (req, res) {
  var id = req.params.id;
  request.get(config.baseUrl + '/static/posts.json', function (err, response) {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    var post = response.body.posts.find(function (post) {
      return post.id === parseInt(id, 10);
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
  });
};

exports.loadPostListContent = function (req, res) {
  request.get(config.baseUrl + '/static/posts.json', function (err, response) {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(response.body.postListContent);
  });
};

exports.loadPostsByPage = function (req, res) {
  var start = parseInt(req.params.start, 10);
  var end = parseInt(req.params.end, 10);

  request.get(config.baseUrl + '/static/posts.json', function (err, response) {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    var posts = response.body.posts.slice(start, end);
    res.json(posts);
  });
};

exports.getNumberOfPosts = function (req, res) {
  request.get(config.baseUrl + '/static/posts.json', function (err, response) {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.json({
      numberOfPosts: response.body.posts.length,
    });
  });
};
