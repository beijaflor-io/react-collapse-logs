# react-collapse-logs
React component to view and collapse shell logs on the browser

## Usage
```javascript
import CollapseLogs from 'react-collapse-logs';

function Test() {
  return (
    <CollapseLogs
      logGroups={[
        [
          { line: '$ some_command', number: 1 },
          { line: 'the', number: 2 },
          { line: 'output', number: 3 },
          { line: 'for', number: 4 },
          { line: 'some_command', number: 5 },
        ],
        [
          { line: '$ some other command', number: 6 },
          { line: 'and its output', number: 7 },
        ],
      ]}
    />
  );
}

// ...
```

[Live Demo](https://beijaflor-io.github.io/react-collapse-logs/)

![](/screenshot.png)

## License
MIT
