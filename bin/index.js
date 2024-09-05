#! /usr/bin/env node

import { Command } from "commander";
import {
  writeToJson,
  changeStatusInTodo,
  deleteTodo,
  readFromJson,
  updateTodo,
} from "./utils.js"
const program = new Command();

program
  .name('string-util')
  .description('CLI for to-do list')
  .version('0.8.0');


program.command("add")
  .description('Write to json')
  .argument('<string>', 'add a todo')
  .option('add', "write json")
  .action((str) => {
    const res = writeToJson(str)
    console.log(res)
  })

program.command("list")
  .description("Read from json")
  .argument('[filter]', 'filter by status')
  .option("list", "listing a json")
  .action((str) => {
    const result = readFromJson(str)
    console.log(result)
  })


program.command("update")
  .description("Update a todo")
  .arguments('<id> <string>')
  .option("update", "update a todo")
  .action((id, string) => {
    const result = updateTodo(id, string)
    console.log(result)
  })

program.command("delete")
  .description("Delete a todo")
  .argument("<id>", "todo id")
  .option("delete", "delete a todo")
  .action((id) => {
    const result = deleteTodo(id)
    console.log(result)
  })


program.command("mark-in-progress")
  .description("change a status to progress")
  .argument("<id>", "todo id")
  .option("mark-in-progress")
  .action((id) => {
    const result = changeStatusInTodo(id, "in-progress")
    console.log(result)
  })

program.command("mark-done")
  .description("change a status to progress")
  .argument("<id>", "todo id")
  .option("mark-done")
  .action((id) => {
    const result = changeStatusInTodo(id, "done")
    console.log(result)
  })


program.parse();
