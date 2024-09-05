import { assert, expect } from "chai";
import { changeStatusInTodo, deleteTodo, readFromJson, updateTodo, writeToJson } from "../bin/utils.js"
import fs from "fs"
const filePath = "test_tasks_data.json"

describe("Array", () => {
    beforeEach(() => {
        fs.writeFileSync(filePath, "[]")
    })
    afterEach(() => {
        fs.unlinkSync(filePath)
    })


    it("should add task to list", () => {
        const json = writeToJson("hello")
        expect(json).to.be.an("array")
        expect(json).to.have.lengthOf(1)
        expect(json[0]).to.have.property("description", "hello")
    })

    it("should read a list", () => {
        const json = readFromJson()
        expect(json).to.be.an("array")
        expect(json).to.have.lengthOf(0)
    })


    it("should update task in list", () => {
        writeToJson("Text")
        const updatedData = updateTodo(1, "Text updated")
        expect(updatedData[0]).to.have.property("description", "Text updated")
    })

    it("should change status task", () => {
        writeToJson("buy a coffee")
        const changed = changeStatusInTodo(1, "in-progress")
        expect(changed[0]).to.have.property("status", "in-progress")
    })

    it("should delete task", () => {
        const json = writeToJson("Test text")
        const result = deleteTodo(1)
        expect(result).to.be.an("array").that.is.empty;
    })


})