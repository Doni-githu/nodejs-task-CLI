#! /usr/bin/env node

import { Command } from "commander";
const program = new Command();

program
  .name('string-util')
  .description('CLI to some JavaScript string utilities')
  .version('0.8.0');

program.command('split')
  .description('Split a string into substrings and display as an array')
  .argument('<string>', 'string to split')
  .option('--first', 'display just the first substring')
  .option('-s, --separator <char>', 'separator character', ',')
  .action((str, options) => {
    const limit = options.first ? 1 : undefined;
    console.log(str.split(options.separator, limit));
  });

program.command("write")
  .description('Write to json')
  .argument('<string>', 'string to split')
  .option('-w', "write json")
  .action((str, options) => {
    
  })
  

program.parse();










// const filePath = "tasks_data.json"
// const task_traker = [{
//     id: 1,
//     description: "try learning programming in node.js",
//     status: "in-progress",
//     createdAt: new Date(),
//     updatedAt: new Date()
// }];
// const jsonData = JSON.stringify(task_traker)
// try {
//     fs.writeFileSync(filePath, jsonData)
// } catch(err){
//     console.log("Error", err)
// }