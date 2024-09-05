import fs from "fs"
import path from "path";
const filePath = "tasks_data.json"


function changeStatusInTodo(id, status) {
    const json = JSON.parse(fs.readFileSync(path.join(filePath)))
    const changedJson = json.map((item) => {
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
}


function deleteTodo(id) {
    const json = JSON.parse(fs.readFileSync(path.join(filePath)))
    const changedJson = json.filter((value) => value.id != id)
    fs.writeFileSync(path.join(filePath), JSON.stringify(changedJson))
    return changedJson
}



function updateTodo(id, text) {
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
}






function readFromJson(status) {
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
    fs.writeFileSync(filePath, jsonData)
    return list
}



export {
    writeToJson,
    changeStatusInTodo,
    deleteTodo,
    readFromJson,
    updateTodo,
}