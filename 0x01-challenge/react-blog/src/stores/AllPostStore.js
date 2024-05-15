var alt = require('../alt');
var AllPostActions = require('../actions/AllPostActions');

class AllPostStore {
  constructor() {
    this.bindListeners({
      handleUpdatePosts: AllPostActions.UPDATE_POSTS,
      handleNumberOfPosts: AllPostActions.UPDATE_NUMBER_OF_POSTS,
      handleUpdatePostListContent: AllPostActions.UPDATE_POST_LIST_CONTENT,
    });

    this.postsByPage = {};
    this.numberOfPosts = 0;
    this.pageNum = 1;
    this.postListContent = { header: '', content: '' };
  }

  handleNumberOfPosts(num) {
    this.numberOfPosts = num;
  }

  handleUpdatePosts(obj) {
    this.pageNum = obj.pageNum;
    this.postsByPage[obj.pageNum] = obj.post;
  }

  handleUpdatePostListContent(postListContent) {
    this.postListContent = postListContent;
  }
}

module.exports = alt.createStore(AllPostStore, 'AllPostStore');
