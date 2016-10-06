import React from 'react';
import ansiUp from 'ansi_up';
import { storiesOf } from '@kadira/storybook';

import CollapseLogs from '../index';
import sampleLog from 'raw!./sample-log.txt'; // eslint-disable-line
import justCaretLineLog from 'raw!./just-caret-line-log.txt'; // eslint-disable-line

function getGroups(logs) {
  const logLines = logs.split('\n').map(line => {
    const carets = ansiUp.ansi_to_html(line).split('\r');
    return carets[carets.length - 2] || carets[0];
  });

  return logLines.reduce((memo, l, i) => {
    if (l.indexOf('$') === 0) {
      memo.push([
        {
          line: l,
          number: i + 1,
        },
      ]);
    } else {
      memo[memo.length - 1].push({
        line: l,
        number: i + 1,
      });
    }
    return memo;
  }, [[]]);
}


storiesOf('CollapseLogs', module)
  .add('simple lines', () => (
    <CollapseLogs
      logGroups={getGroups(sampleLog)}
    />
  ))
  .add('caret lines', () => (
    <CollapseLogs
      logGroups={getGroups(justCaretLineLog)}
    />
  ));
