/* eslint-disable no-underscore-dangle, new-cap, no-class-assign, react/no-multi-comp */
import Collapse from 'react-collapse';
import Radium from 'radium';
import React, { Component, PropTypes } from 'react';
import color from 'color';

// import Perf from 'react-addons-perf';
// global.Perf = Perf;

const collapseLogsStyle = {
  padding: '15px 0',
  backgroundColor: '#222',
};

class CollapseLogLine extends Component {
  static propTypes = {
    line: PropTypes.string,
    showCollapse: PropTypes.bool,
    number: PropTypes.number,
  };

  shouldComponentUpdate(props, state) {
    const currentHover = this.state._radiumStyleState &&
      this.state._radiumStyleState.main &&
      this.state._radiumStyleState.main[':hover'];
    const newHover = state._radiumStyleState &&
      state._radiumStyleState.main &&
      state._radiumStyleState.main[':hover'];
    return this.props.line !== props.line || currentHover !== newHover;
  }

  render() {
    const { showCollapse, line, number } = this.props;

    return (
      <span
        style={{
          cursor: showCollapse ? 'pointer' : 'initial',
          position: 'relative',
          backgroundColor: '#222',
          display: 'block',
          ':hover': {
            backgroundColor: color('#222')
              .lighten(0.8).hexString(),
          },
        }}
      >

        {showCollapse && (
          <span
            style={{
              color: color('#fff').darken(0.2).hexString(),
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
              lineHeight: '19px',
            }}
          >
            {'▶'}
          </span>
        )}

        <span
          style={{
            color: color('#fff').darken(0.6).hexString(),
            textAlign: 'right',
            display: 'inline-block',
            position: 'absolute',
            top: 0,
            zIndex: 1,
            left: 10,
            width: '40px',
            fontFamily: 'monospace',
            lineHeight: '19px',
          }}
        >
          {number}
        </span>
        <p
          style={{
            margin: 0,
            fontFamily: 'monospace',
            minHeight: '19px',
            lineHeight: '19px',
            color: '#f1f1f1',
            paddingLeft: '60px',

          }}
          dangerouslySetInnerHTML={{
            __html: line,
          }}
        />
      </span>
    );
  }
}

CollapseLogLine = Radium(CollapseLogLine);

class CollapseLogGroup extends Component {
  static propTypes = {
    group: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = {
      open: false,
    };
  }

  onClick() {
    this.setState({
      open: !this.state.open,
    });
  }

  renderChild({ line, number }) {
    return <CollapseLogLine line={line} number={number} key={number} />;
  }

  render() {
    const group = this.props.group;
    const { line, number } = group[0];

    return (
      <span>
        <span onClick={this.onClick}>
          <CollapseLogLine showCollapse line={line} number={number} />
        </span>

        <Collapse keepCollapsedContent isOpened={this.state.open}>
          {group.slice(1).map(this.renderChild)}
        </Collapse>
      </span>
    );
  }
}

class CollapseLogs extends Component {
  static propTypes = {
    logGroups: PropTypes.shape({
      map: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.renderLogGroup = this.renderLogGroup.bind(this);
    this.state = {};
  }

  renderLogGroup(g, i) {
    return <CollapseLogGroup key={i} group={g} />;
  }

  render() {
    const { logGroups } = this.props;
    const logLineEls = logGroups.map(this.renderLogGroup);

    return (
      <div style={collapseLogsStyle}>
        {logLineEls}
      </div>
    );
  }
}

CollapseLogs = Radium(CollapseLogs);

export default CollapseLogs;
