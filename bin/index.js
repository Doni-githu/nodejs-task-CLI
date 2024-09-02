#! /usr/bin/env node

import { Command } from "commander";
import fs from "fs"
import path from "path";
const program = new Command();
const filePath = "tasks_data.json"

program
  .name('string-util')
  .description('CLI to some JavaScript string utilities')
  .version('0.8.0');


program.command("add")
  .description('Write to json')
  .argument('<string>', 'string to add json')
  .option('add', "write json")
  .action((str, options) => {
    const res = writeToJson(str)
    console.log(res)
  })

program.command("list")
  .description("Read from json")
  .argument('[filter]', 'filter by status')
  .option("list", "listing a json")
  .action((str, options) => {
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



function changeStatusInTodo(id, status) {
  try {
    const json = JSON.parse(fs.readFileSync(path.join(filePath)))
    const changedJson  =json.map((item) => {
      if (item.id === parseInt(id)) {
        return {
          ...item,
          status: status
        }
      }
      return item
    })
    fs.writeFileSync(path.join(filePath), JSON.stringify(changedJson))
    return changedJson
  } catch (error) {
    console.log(error)
  }
}


function deleteTodo(id) {
  try {
    const json = JSON.parse(fs.readFileSync(path.join(filePath)))
    const changedJson = json.filter((value) => value.id != id)
    fs.writeFileSync(path.join(filePath), JSON.stringify(changedJson))
    return changedJson
  } catch (err) {
    console.log(err)
  }
}



function updateTodo(id, text) {
  try {
    const json = JSON.parse(fs.readFileSync(path.join(filePath)))
    const updatedJson = json.map((item) => {
      if (item.id == parseInt(id)) {
        return {
          ...item,
          description: text
        }
      }
      return item
    })
    fs.writeFileSync(path.join(filePath), JSON.stringify(updatedJson))
    return updatedJson
  } catch (err) {
    console.log("IN update", err)
  }
}









function readFromJson(status) {
  try {
    const res = fs.readFileSync(filePath)
    const json = JSON.parse(res)
    const allowStatus = ["todo", "in-progress", "done"]
    if (allowStatus.includes(status)) {
      return json.filter((item) => item.status === status)
    }
    if (!allowStatus.includes(status) && status != null) {
      return "Not Found your todo"
    }
    return json
  } catch (error) {
    console.log("In Read file", error)
    return []
  }
}


function writeToJson(desc) {
  if (!fs.existsSync(path.join(filePath))) {
    const task_traker = [{
      id: 1,
      description: desc,
      status: "todo",
      createdAt: new Date(),
      updatedAt: new Date()
    }];
    fs.writeFileSync(filePath, JSON.stringify(task_traker))
    let list2 = readFromJson()
    return list2;
  }
  const list = readFromJson()
  const task_traker = {
    id: list.length + 1,
    description: desc,
    status: "todo",
    createdAt: new Date(),
    updatedAt: new Date()
  };
  list.push(task_traker)
  const jsonData = JSON.stringify(list)
  try {
    fs.writeFileSync(filePath, jsonData)
    return list
  } catch (err) {
    console.log("Error", err)
  }
}


