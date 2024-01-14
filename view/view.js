class View {
    static showHelp() {
        console.log(`
        1. node todo.js help
        2. node todo.js list
        3. node todo.js add <task_content>
        4. node todo.js findById <task_id>
        5. node todo.js delete <task_id>
        6. node todo.js complete <task_id>
        7. node todo.js uncomplete <task_id>
        8. node todo.js list:created <asc> / <desc>
        9. node todo.js list:complete <asc> / <desc>
        10. node todo.js tag <id> <yourTag1> <yourTag2> ...<yourTagN>
        11. node todo.js filter : <findTag>
        `)
    }

    static showList(data) {
        data.map(i => {
            let { task_id, task, complete, create_date, tags } = i
            let mark = " "
            if (complete) {
                mark = "X"
            }
            if (tags.length !== 0) {
                console.log(`${task_id}. [${mark}] ${task} ====== tags = ${tags} ====== Create date = ${create_date}`)
            } else {
                console.log(`${task_id}. [${mark}] ${task} ====== Create date = ${create_date}`)
            }
        })
    }

    static showListByCreateDate(data, sortOrder) {
        const sortedData = [...data]
        sortedData.sort((a, b) => {
            if (sortOrder === 'asc') {
                return new Date(a.create_date) - new Date(b.create_date)
            } else if (sortOrder === 'desc') {
                return new Date(b.create_date) - new Date(a.create_date)
            }
            return 0
        })
        sortedData.map(i => {
            let { task_id, task, complete, create_date, tags } = i
            let mark = " "
            if (complete) {
                mark = "X"
            }
            if (tags.length !== 0) {
                console.log(`${task_id}. [${mark}] ${task} ====== tags = ${tags} ====== Create date = ${create_date}`)
            } else {
                console.log(`${task_id}. [${mark}] ${task} ====== Create date = ${create_date}`)
            }
        })
    }

    static showListByComplete(data, sortOrder) {
        const sortedData = [...data]
        sortedData.sort((a, b) => {
            if (sortOrder === 'asc') {
                return new Date(a.create_date) - new Date(b.create_date)
            } else if (sortOrder === 'desc') {
                return new Date(b.create_date) - new Date(a.create_date)
            }
            return 0
        })
        sortedData.map(i => {
            let { task_id, task, complete, create_date, tags } = i
            let mark = " "
            if (complete) {
                mark = "X"
                if (tags.length !== 0) {
                    console.log(`${task_id}. [${mark}] ${task} ====== tags = ${tags} ====== Create date = ${create_date}`)
                } else {
                    console.log(`${task_id}. [${mark}] ${task} ====== Create date = ${create_date}`)
                }
            }
        })
    }

    static showFindById(resultSearch) {
        let { task_id, task, complete, create_date, tags } = resultSearch
        let mark = " "
        if (complete) {
            mark = "X"
        }
        if (tags.length !== 0) {
            console.log(`${task_id}. [${mark}] ${task} ====== tags = ${tags} ====== Create date = ${create_date}`)
        } else {
            console.log(`${task_id}. [${mark}] ${task} ====== Create date = ${create_date}`)
        }
    }

    static successFiltering(filtering){
        filtering.map(i => {
            let {task_id, task, tags} = i
            console.log(`${task_id}. ${task} ['${tags.join("', '")}']`)
        })
    }

    //=========================================================== Message

    static successSaveFileMsg(data) {
        let { totalTasks, newTask } = data
        let { task } = newTask
        console.log(`Added "${task}" to your TODO list`)
    }

    static errorFromModelMsg(err) {
        console.log(err)
    }

    static invalidInputMsg() {
        console.log(`Your input is invalid`)
    }

    static notFoundIdMsg(id) {
        console.log(`Sorry, cannot find a task from that Id (${id})`)
    }

    static afterDeleteMsg(resultDelete) {
        let { task_id, task } = resultDelete
        console.log(`Deleted "${task}" from your TODO list`)
    }

    static successSaveTagsMsg(newTags, tags) {
        let nameTask = newTags.addNewTags.task
        console.log(`Tagged task "${nameTask}" with tags: ${tags.join(' ')}`)
    }

    static noResultForFiltersMsg(filter){
        console.log(`cannot find "${filter}"`)
    }
}

module.exports = View