const View = require('../view/view.js')
const model = require('../model/model.js')

// let classCrud = new Crud()
class Controller {
    static help() {
        View.showHelp()
    }

    static list() {
        let data = model.Crud.readTasks()
        View.showList(data)
    }

    static add(newTask) {
        let addNewTask = model.Crud.addTask(newTask)
        if (!addNewTask || typeof addNewTask === 'string') {
            View.errorFromModelMsg(addNewTask)
        } else {
            View.successSaveFileMsg(addNewTask)
        }
    }

    static findByid(id) {
        let resultSearch = model.Crud.findTask(id)
        if (!id) {
            View.invalidInputMsg()
        } else if (!resultSearch) {
            View.notFoundIdMsg(id)
        } else {
            View.showFindById(resultSearch)
        }
    }

    static delete(id) {
        let resultDelete = model.Crud.deleteTask(id)
        if (!id) {
            View.invalidInputMsg()
        } else if (!resultDelete) {
            View.notFoundIdMsg(id)
        } else {
            View.afterDeleteMsg(resultDelete)
        }
    }

    static complete(id) {
        let resultComplete = model.Crud.completeTask(id)
        if (!resultComplete) {
            View.notFoundIdMsg(id)
        } else if (typeof resultComplete === 'string') {
            View.errorFromModelMsg(resultComplete)
        } else {
            Controller.list()
        }
    }

    static uncomplete(id) {
        let resultUncomplete = model.Crud.uncompleteTask(id)
        if (!resultUncomplete) {
            View.notFoundIdMsg(id)
        } else if (typeof resultUncomplete === 'string') {
            View.errorFromModelMsg(resultUncomplete)
        } else {
            Controller.list()
        }
    }

    static listCreated(sortOrder) {
        let data = model.Crud.readTasks()
        View.showListByCreateDate(data, sortOrder)
    }

    static listComplete(sortOrder) {
        let data = model.Crud.readTasks()
        View.showListByComplete(data, sortOrder)
    }

    static tag(id, tags) {
        let newTags = model.Crud.tagsTask(id, tags)
        if (!newTags) {
            View.notFoundIdMsg(id)
        } else if (typeof newTags === 'string') {
            View.errorFromModelMsg(newTags)
        } else {
            View.successSaveTagsMsg(newTags, tags)
        }
    }

    static filterBy(filter){
        let resultFilter = model.Crud.filterByTasks(filter)
        if(resultFilter.length === 0){
            View.noResultForFiltersMsg(filter)
        } else if (typeof resultFilter === 'string') {
            View.errorFromModelMsg(resultFilter)
        } else {
            View.successFiltering(resultFilter)
        }
    }
}


module.exports = Controller