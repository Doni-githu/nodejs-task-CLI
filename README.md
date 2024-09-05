# String Util CLI

A Node.js CLI application for managing todo tasks using JSON files.


## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/string-util-cli.git
cd string-util-cli
```

2. Install dependencies:

```bash
npm install
```

# Usage

The CLI provides the following commands:

- add: Write a task to the JSON file.
- list: Read tasks from the JSON file.
- update: Update a task in the JSON file.
- delete: Delete a task from the JSON file.
- mark-in-progress: Change a task's status to "in-progress".
- mark-done: Change a task's status to "done".

## Examples

- To add a task:

```bash
tran add "Task description"
```

- To update a task:

```bash
tran update <id> "New task description"
```
    
- To delete a task:

```bash
tran delete <id>
```

- To mark a task as in progress:
```bash
tran mark-in-progress <id>
```
- To mark a task as done:
```bash
tran mark-done <id>
```

# Testing
To run the tests, use the following command:

```bash
npm run test
```

## License
This project is licensed under the MIT License - see the LICENSE file for details.

