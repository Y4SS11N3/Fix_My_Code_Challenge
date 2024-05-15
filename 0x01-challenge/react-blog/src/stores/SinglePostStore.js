var alt = require('../alt');
var SinglePostActions = require('../actions/SinglePostActions');

class SinglePostStore {
  constructor() {
    this.bindListeners({
      handleUpdateCurrentPost: SinglePostActions.UPDATE_CURRENT_POST,
      handleUpdateIncludes: SinglePostActions.UPDATE_INCLUDES,
      handleReset: SinglePostActions.RESET,
    });

    this.currentPost = null;
    this.includes = [];
    this.stateById = {};
  }

  handleUpdateCurrentPost(post) {
    this.id = post.id;
    this.currentPost = post;
    this.stateById[this.id] = this.stateById[this.id] || {};
    this.stateById[this.id].post = post;
  }

  handleUpdateIncludes(includes) {
    this.includes = includes;
    this.stateById[this.id] = this.stateById[this.id] || {};
    this.stateById[this.id].includes = includes;
  }

  handleReset() {
    this.currentPost = null;
    this.includes = [];
  }
}

module.exports = alt.createStore(SinglePostStore, 'SinglePostStore');
