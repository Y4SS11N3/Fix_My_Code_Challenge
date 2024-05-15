var React = require('react');
var config = require('../../config');
var Link = require('react-router').Link;

var Pagination = React.createClass({
  propTypes: {
    numberOfPages: React.PropTypes.number.isRequired,
    maxButtons: React.PropTypes.number.isRequired,
    activePage: React.PropTypes.number.isRequired,
  },

  contextTypes: {
    router: React.PropTypes.object,
  },

  renderPageLinks: function () {
    var numberOfPages = this.props.numberOfPages;
    var activePage = this.props.activePage;
    var maxButtons = this.props.maxButtons;
    var links = [];

    if (numberOfPages <= maxButtons) {
      for (var i = 1; i <= numberOfPages; i++) {
        var active = i === activePage ? 'active' : '';
        links.push(
          <li key={i} className={active}>
            <Link to={'/page/' + i}>{i}</Link>
          </li>
        );
      }
    } else {
      var startPage, endPage;
      if (activePage <= Math.floor(maxButtons / 2)) {
        startPage = 1;
        endPage = maxButtons;
      } else if (activePage + Math.floor(maxButtons / 2) >= numberOfPages) {
        startPage = numberOfPages - maxButtons + 1;
        endPage = numberOfPages;
      } else {
        startPage = activePage - Math.floor(maxButtons / 2);
        endPage = activePage + Math.floor(maxButtons / 2);
      }

      if (startPage > 1) {
        links.push(
          <li key="first">
            <Link to="/page/1">1</Link>
          </li>
        );
        if (startPage > 2) {
          links.push(
            <li key="ellipsis-start" className="disabled">
              <span>...</span>
            </li>
          );
        }
      }

      for (var j = startPage; j <= endPage; j++) {
        var active = j === activePage ? 'active' : '';
        links.push(
          <li key={j} className={active}>
            <Link to={'/page/' + j}>{j}</Link>
          </li>
        );
      }

      if (endPage < numberOfPages) {
        if (endPage < numberOfPages - 1) {
          links.push(
            <li key="ellipsis-end" className="disabled">
              <span>...</span>
            </li>
          );
        }
        links.push(
          <li key="last">
            <Link to={'/page/' + numberOfPages}>{numberOfPages}</Link>
          </li>
        );
      }
    }

    return links;
  },

  render: function () {
    return (
      <ul className="pagination">
        <li className={this.props.activePage === 1 ? 'disabled' : ''}>
          <Link to={'/page/' + (this.props.activePage - 1)}>&laquo;</Link>
        </li>
        {this.renderPageLinks()}
        <li className={this.props.activePage === this.props.numberOfPages ? 'disabled' : ''}>
          <Link to={'/page/' + (this.props.activePage + 1)}>&raquo;</Link>
        </li>
      </ul>
    );
  },
});

module.exports = Pagination;
