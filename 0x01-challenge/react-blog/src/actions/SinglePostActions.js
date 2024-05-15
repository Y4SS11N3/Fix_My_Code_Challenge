var alt = require('../alt');
var request = require('superagent');
var config = require('../../config');
var IncludeHandler = require('../IncludeHandler');

class SinglePostActions {
  loadSinglePost(id, cb) {
    var SinglePostStore = require('../stores/SinglePostStore');
    var state = SinglePostStore.getState();

    if (state.stateById[id]) {
      this.updateCurrentPost(state.stateById[id].post);
      this.updateIncludes(state.stateById[id].includes);
      if (cb) {
        cb();
      }
    } else {
      if (typeof window !== 'undefined' && typeof window.NProgress !== 'undefined') {
        NProgress.start();
      }

      request.get(config.baseUrl + '/ajax/post/' + id, (err, response) => {
        if (err) {
          console.error(err);
          return;
        }

        var post = response.body;
        var includes = post.includes || [];
        var loadedIncludes = [];
        var includeNum = includes.length;

        var finish = () => {
          this.updateCurrentPost(post);
          this.updateIncludes(loadedIncludes);

          setTimeout(() => {
            if (typeof NProgress !== 'undefined') {
              NProgress.done();
            }
          }, 500);

          if (cb) {
            cb();
          }
        };

        if (includeNum > 0) {
          includes.forEach((include) => {
            var type = include.type;
            var path = include.path;

            IncludeHandler.handleInclude(type, path, (type, data, path) => {
              loadedIncludes.push({ type: type, value: data, path: path });
              includeNum--;

              if (includeNum === 0) {
                finish();
              }
            });
          });
        } else {
          finish();
        }
      });
    }
  }

  updateCurrentPost(post) {
    this.dispatch(post);
  }

  updateIncludes(includes) {
    this.dispatch(includes);
  }

  reset() {
    this.dispatch();
  }
}

module.exports = alt.createActions(SinglePostActions);
