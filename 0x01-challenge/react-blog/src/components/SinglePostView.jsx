var React = require('react');
var SinglePostStore = require('../stores/SinglePostStore');
var SinglePostActions = require('../actions/SinglePostActions');
var AuthorMixin = require('../mixins/AuthorMixin.jsx');
var JsxIncludes = require('./JsxIncludes');
var marked = require('marked');
var Link = require('react-router').Link;

var SinglePostView = React.createClass({
  contextTypes: {
    router: React.PropTypes.object,
  },

  mixins: [AuthorMixin],

  getInitialState: function () {
    return SinglePostStore.getState();
  },

  componentDidMount: function () {
    SinglePostStore.listen(this.onChange);
    SinglePostActions.loadSinglePost(this.getPostId());
  },

  componentWillUnmount: function () {
    SinglePostStore.unlisten(this.onChange);
    SinglePostActions.reset();
  },

  onChange: function (state) {
    this.setState(state);
  },

  getPostId: function () {
    return parseInt(this.props.params.id, 10);
  },

  render: function () {
    if (!this.state.currentPost) {
      return <div></div>;
    }

    var includes = this.state.includes || [];
    var htmlIncludes = [];
    var mdIncludes = [];
    var jsxIncludes = [];

    includes.forEach((include) => {
      switch (include.type) {
        case 'html':
          htmlIncludes.push(include.value);
          break;
        case 'md':
          mdIncludes.push(include.value);
          break;
        case 'jsx':
          var Template = JsxIncludes[include.path];
          jsxIncludes.push(<Template key={include.path} />);
          break;
      }
    });

    return (
      <div className="full-post">
        <div>
          <Link to="/">
            <span className="glyphicon glyphicon-arrow-left"></span> Back
          </Link>
        </div>
        <h1 className="post-title">{this.state.currentPost.title}</h1>
        <div className="author-details">{this.getAuthorDetails(this.state.currentPost)}</div>
        <div className="post-content">
          <div dangerouslySetInnerHTML={{ __html: this.state.currentPost.description || '' }} />
          <div dangerouslySetInnerHTML={{ __html: htmlIncludes.join('') }} />
          <div dangerouslySetInnerHTML={{ __html: marked(mdIncludes.join('')) }} />
          {jsxIncludes}
        </div>
      </div>
    );
  },
});

module.exports = SinglePostView;
