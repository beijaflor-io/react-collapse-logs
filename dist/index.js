'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _reactCollapse = require('react-collapse');

var _reactCollapse2 = _interopRequireDefault(_reactCollapse);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _color = require('color');

var _color2 = _interopRequireDefault(_color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Perf from 'react-addons-perf';
// global.Perf = Perf;

/* eslint-disable no-underscore-dangle, new-cap, no-class-assign, react/no-multi-comp */
var collapseLogsStyle = {
  padding: '15px 0',
  backgroundColor: '#222'
};

var CollapseLogLine = function (_Component) {
  (0, _inherits3.default)(CollapseLogLine, _Component);

  function CollapseLogLine() {
    (0, _classCallCheck3.default)(this, CollapseLogLine);
    return (0, _possibleConstructorReturn3.default)(this, (CollapseLogLine.__proto__ || (0, _getPrototypeOf2.default)(CollapseLogLine)).apply(this, arguments));
  }

  (0, _createClass3.default)(CollapseLogLine, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(props, state) {
      var currentHover = this.state._radiumStyleState && this.state._radiumStyleState.main && this.state._radiumStyleState.main[':hover'];
      var newHover = state._radiumStyleState && state._radiumStyleState.main && state._radiumStyleState.main[':hover'];
      return this.props.line !== props.line || currentHover !== newHover;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var showCollapse = _props.showCollapse;
      var line = _props.line;
      var number = _props.number;


      return _react2.default.createElement(
        'span',
        {
          style: {
            cursor: showCollapse ? 'pointer' : 'initial',
            position: 'relative',
            backgroundColor: '#222',
            display: 'block',
            ':hover': {
              backgroundColor: (0, _color2.default)('#222').lighten(0.8).hexString()
            }
          }
        },
        showCollapse && _react2.default.createElement(
          'span',
          {
            style: {
              color: (0, _color2.default)('#fff').darken(0.2).hexString(),
              textAlign: 'left',
              display: 'inline-block',
              position: 'absolute',
              top: 0,
              zIndex: 1,
              left: 0,
              paddingLeft: '2px',
              width: '10px',
              fontSize: '8px',
              fontFamily: 'monospace',
              lineHeight: '19px'
            }
          },
          '▶'
        ),
        _react2.default.createElement(
          'span',
          {
            style: {
              color: (0, _color2.default)('#fff').darken(0.6).hexString(),
              textAlign: 'right',
              display: 'inline-block',
              position: 'absolute',
              top: 0,
              zIndex: 1,
              left: 10,
              width: '40px',
              fontFamily: 'monospace',
              lineHeight: '19px'
            }
          },
          number
        ),
        _react2.default.createElement('p', {
          style: {
            margin: 0,
            fontFamily: 'monospace',
            minHeight: '19px',
            lineHeight: '19px',
            color: '#f1f1f1',
            paddingLeft: '60px'

          },
          dangerouslySetInnerHTML: {
            __html: line
          }
        })
      );
    }
  }]);
  return CollapseLogLine;
}(_react.Component);

CollapseLogLine.propTypes = {
  line: _react.PropTypes.string,
  showCollapse: _react.PropTypes.bool,
  number: _react.PropTypes.number
};


CollapseLogLine = (0, _radium2.default)(CollapseLogLine);

var CollapseLogGroup = function (_Component2) {
  (0, _inherits3.default)(CollapseLogGroup, _Component2);

  function CollapseLogGroup(props) {
    (0, _classCallCheck3.default)(this, CollapseLogGroup);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (CollapseLogGroup.__proto__ || (0, _getPrototypeOf2.default)(CollapseLogGroup)).call(this, props));

    _this2.onClick = _this2.onClick.bind(_this2);
    _this2.state = {
      open: false
    };
    return _this2;
  }

  (0, _createClass3.default)(CollapseLogGroup, [{
    key: 'onClick',
    value: function onClick() {
      this.setState({
        open: !this.state.open
      });
    }
  }, {
    key: 'renderChild',
    value: function renderChild(_ref) {
      var line = _ref.line;
      var number = _ref.number;

      return _react2.default.createElement(CollapseLogLine, { line: line, number: number, key: number });
    }
  }, {
    key: 'render',
    value: function render() {
      var group = this.props.group;
      var _group$ = group[0];
      var line = _group$.line;
      var number = _group$.number;


      return _react2.default.createElement(
        'span',
        null,
        _react2.default.createElement(
          'span',
          { onClick: this.onClick },
          _react2.default.createElement(CollapseLogLine, { showCollapse: true, line: line, number: number })
        ),
        _react2.default.createElement(
          _reactCollapse2.default,
          { keepCollapsedContent: true, isOpened: this.state.open },
          group.slice(1).map(this.renderChild)
        )
      );
    }
  }]);
  return CollapseLogGroup;
}(_react.Component);

CollapseLogGroup.propTypes = {
  group: _react.PropTypes.object
};

var CollapseLogs = function (_Component3) {
  (0, _inherits3.default)(CollapseLogs, _Component3);

  function CollapseLogs(props) {
    (0, _classCallCheck3.default)(this, CollapseLogs);

    var _this3 = (0, _possibleConstructorReturn3.default)(this, (CollapseLogs.__proto__ || (0, _getPrototypeOf2.default)(CollapseLogs)).call(this, props));

    _this3.renderLogGroup = _this3.renderLogGroup.bind(_this3);
    _this3.state = {};
    return _this3;
  }

  (0, _createClass3.default)(CollapseLogs, [{
    key: 'renderLogGroup',
    value: function renderLogGroup(g, i) {
      return _react2.default.createElement(CollapseLogGroup, { key: i, group: g });
    }
  }, {
    key: 'render',
    value: function render() {
      var logGroups = this.props.logGroups;

      var logLineEls = logGroups.map(this.renderLogGroup);

      return _react2.default.createElement(
        'div',
        { style: collapseLogsStyle },
        logLineEls
      );
    }
  }]);
  return CollapseLogs;
}(_react.Component);

CollapseLogs.propTypes = {
  logGroups: _react.PropTypes.shape({
    map: _react.PropTypes.func.isRequired
  }).isRequired
};


CollapseLogs = (0, _radium2.default)(CollapseLogs);

exports.default = CollapseLogs;