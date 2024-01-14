const fs = require('fs');

class Tasks {
    constructor(task_id, task, complete, create_date, tags) {
        this.task_id = task_id
        this.task = task
        this.complete = complete
        this.create_date = create_date
        this.tags = tags
    }
}

class Crud {
    static readTasks() {
        let rawData = fs.readFileSync('./data.json', 'utf-8')
        let data = JSON.parse(rawData)
        let resultData = data.map(i => {
            let { task_id, task, complete, create_date, tags } = i
            return new Tasks(task_id, task, complete, create_date, tags)
        })
        return resultData
    }

    static addTask(newTask) {
        if (!newTask) {
            return `Your input is invalid`
        } else {
            let readTasks = Crud.readTasks()
            let id = 1  // id default
            let complete = false
            let create_date = new Date().toLocaleString()
            let tags = []
            if (readTasks.length >= 1) {
                id = readTasks[readTasks.length - 1].task_id + 1
            }
            let newData = new Tasks(id, newTask, complete, create_date, tags)
            readTasks.push(newData)
            Crud.saveFile('./data.json', readTasks)
            return {
                totalTasks: readTasks.length,
                newTask: newData
            }
        }
    }

    static saveFile(locationFile, newFile) {
        let processData = newFile.map(i => {
            let { task_id, task, complete, create_date, tags } = i
            return { task_id, task, complete, create_date, tags }
        })
        let convertJSON = JSON.stringify(processData, null, 2)
        fs.writeFileSync(locationFile, convertJSON)
    }

    static findTask(id) {
        let readTasks = Crud.readTasks()
        let search = readTasks.find(i => id === i.task_id)
        return search
    }

    static deleteTask(id) {
        let readTasks = Crud.readTasks()
        let selectDelete = readTasks.find(i => i.task_id === id)
        let updateTasks = readTasks.filter(i => i.task_id !== id)
        Crud.saveFile('./data.json', updateTasks)
        return selectDelete
    }

    static completeTask(id) {
        if (!id) {
            return `Your input is invalid`
        } else {
            let readTasks = Crud.readTasks()
            let changeToComplete = readTasks.find(i => id === i.task_id)
            if (!changeToComplete) {
                return
            } else {
                changeToComplete.complete = true
                Crud.saveFile('./data.json', readTasks)
                return changeToComplete
            }
        }
    }

    static uncompleteTask(id) {
        if (!id) {
            return `Your input is invalid`
        } else {
            let readTasks = Crud.readTasks()
            let changeToUncomplete = readTasks.find(i => id === i.task_id)
            if (!changeToUncomplete) {
                return
            } else {
                changeToUncomplete.complete = false
                Crud.saveFile('./data.json', readTasks)
                return changeToUncomplete
            }
        }
    }

    static validateInput(id, arr) {
        let readTasks = Crud.readTasks()
        let addNewTags = readTasks.find(i => i.task_id === id)
        let isiTag = addNewTags.tags
        for (const item of arr) {
            if (isiTag.includes(item)) {
                return false
            }
        }
        return true
    }

    static tagsTask(id, tags) {
        if (!id || !tags) {
            return `Your input is invalid`
        } else if (tags.length === 0) {
            return `Input your tag`
        } else {
            if (Crud.validateInput(id, tags)) {
                let readTasks = Crud.readTasks()
                let addNewTags = readTasks.find(i => i.task_id === id)
                if (!addNewTags) {
                    return
                } else {
                    tags.map(i => {
                        addNewTags.tags.push(i);
                    })
                    Crud.saveFile('./data.json', readTasks)
                    return { addNewTags, tags }
                }
            } else {
                return `The process failed because the input contains duplicates.`
            }
        }
    }

    static filterByTasks(filter) {
        if(!filter){
            return `Your input is invalid`
        } else {
            let readTasks = Crud.readTasks()
            let filtering = readTasks.filter(i => {
                return i.tags.includes(filter)
            })
            return filtering
        }
    }
}

module.exports = { Tasks, Crud }