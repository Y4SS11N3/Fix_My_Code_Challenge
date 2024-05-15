var React = require('react');
var AllPostStore = require('../stores/AllPostStore');
var AllPostActions = require('../actions/AllPostActions');
var PostPreview = require('./PostPreview.jsx');
var Pagination = require('./Pagination.jsx');
var config = require('../../config');
var PostListHeader = require('./PostListHeader.jsx');

var PostListView = React.createClass({
  contextTypes: {
    router: React.PropTypes.object,
  },

  getInitialState: function () {
    return AllPostStore.getState();
  },

  componentDidMount: function () {
    AllPostStore.listen(this.onChange);
    AllPostActions.getNumberOfPosts();
    AllPostActions.loadPage(this.getPageNum());
    AllPostActions.loadPostListContent();
  },

  componentWillUnmount: function () {
    AllPostStore.unlisten(this.onChange);
  },

  componentWillReceiveProps: function (nextProps) {
    var pageNum = parseInt(nextProps.params.pageNum, 10);
    if (!isNaN(pageNum) && pageNum !== this.getPageNum()) {
      AllPostActions.loadPage(pageNum);
    }
  },

  onChange: function (state) {
    this.setState(state);
  },

  getPageNum: function () {
    return parseInt(this.props.params.pageNum || 1, 10);
  },

  getNumberOfPages: function () {
    return Math.ceil(this.state.numberOfPosts / config.itemsPerPage);
  },

  render: function () {
    var pageNum = this.getPageNum();
    var posts = this.state.postsByPage[pageNum] || [];

    var postPreviews = posts.map(function (post) {
      return <PostPreview key={post.id} post={post} />;
    });

    return (
      <div>
        <PostListHeader header={this.state.postListContent.header} content={this.state.postListContent.content} />
        <div className="post-list">{postPreviews}</div>
        <div className="pagination-wrapper">
          <Pagination
            numberOfPages={this.getNumberOfPages()}
            maxButtons={config.maxPageButtons}
            activePage={pageNum}
          />
        </div>
      </div>
    );
  },
});

module.exports = PostListView;
