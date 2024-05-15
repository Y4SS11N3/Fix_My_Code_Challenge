var alt = require('../alt');
var request = require('superagent');
var config = require('../../config');

class AllPostActions {
  loadPage(pageNum, cb) {
    var AllPostStore = require('../stores/AllPostStore');
    var state = AllPostStore.getState();

    if (state.postsByPage[pageNum]) {
      this.updatePosts(state.postsByPage[pageNum], pageNum);
      if (cb) {
        cb();
      }
    } else {
      pageNum = pageNum - 1;
      var end = pageNum * config.itemsPerPage + config.itemsPerPage;
      var start = pageNum * config.itemsPerPage;

      if (typeof NProgress !== 'undefined') {
        NProgress.start();
      }

      request.get(config.baseUrl + '/ajax/postsByPage/' + start + '/' + end, (err, response) => {
        if (err) {
          console.error(err);
          return;
        }

        this.updatePosts(response.body, pageNum + 1);

        setTimeout(() => {
          if (typeof NProgress !== 'undefined') {
            NProgress.done();
          }
        }, 500);

        if (cb) {
          cb();
        }
      });
    }
  }

  loadPostListContent() {
    var AllPostStore = require('../stores/AllPostStore');
    var state = AllPostStore.getState();

    if (
      (state.postListContent.content && state.postListContent.content !== '') ||
      (state.postListContent.header && state.postListContent.header !== '')
    ) {
      return;
    }

    request.get(config.baseUrl + '/ajax/postListContent', (err, response) => {
      if (err) {
        console.error(err);
        return;
      }

      this.updatePostListContent(response.body);
    });
  }

  getNumberOfPosts() {
    var AllPostStore = require('../stores/AllPostStore');
    var state = AllPostStore.getState();

    if (state.numberOfPosts === 0) {
      request.get(config.baseUrl + '/ajax/getNumberOfPosts', (err, response) => {
        if (err) {
          console.error(err);
          return;
        }

        this.updateNumberOfPosts(response.body.numberOfPosts);
      });
    } else {
      this.updateNumberOfPosts(state.numberOfPosts);
    }
  }

  updateNumberOfPosts(num) {
    this.dispatch(num);
  }

  updatePostListContent(postListContent) {
    this.dispatch(postListContent);
  }
}

module.exports = alt.createActions(AllPostActions);
