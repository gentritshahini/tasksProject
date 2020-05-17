<template>
    <div class="content">
        <div class="parent-box">
            <div class="box-tasks-parent">
                <div class="top-content">
                    <div>
                        <h1>Tasks</h1>
                    </div>
                    <div class="ml-auto">
                        <button class="btn btn-success btn-sm" type="button">
                            <font-awesome-icon icon="plus" class="icon alt" />
                        </button>
                    </div>
                </div>
                <div class="main-content">
                    <div class="list-of-tasks">
                        <div @click="showActiveEditingTask(1)"  id="task-1" :class="'task-box'
                        + (activeTask === 1 ? ' active' : '')
                        + (editingTask === 1 ? ' editing' : '')
                         + (checkifDone(1) ? ' done' : '') ">
                            <div class="view">
                                <div class="checkbox">
                                    <input @change="finishedTask(1, $event)" class="toggle" type="checkbox">
                                    <span class="task-name">New task</span>
                                    <input @focusout="editingTask = null" class="edit form-control" type="text" value="New task">
                                </div>
                                <button class="close destroy">×</button>
                            </div>
                        </div>
                        <div @click="showActiveEditingTask(2)"  id="task-2" :class="'task-box'
                        + (activeTask === 2 ? ' active' : '')
                        + (editingTask === 2 ? ' editing' : '')
                         + (checkifDone(2) ? ' done' : '') ">
                            <div class="view">
                                <div class="checkbox">
                                    <input @change="finishedTask(2, $event)" class="toggle" type="checkbox">
                                    <span class="task-name">New task</span>
                                    <input @focusout="editingTask = null" class="edit form-control" type="text" value="New task">
                                </div>
                                <button class="close destroy">×</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="footer-content">
                    <div class="checkbox">
                        <label><input id="toggle-all" type="checkbox"> Mark all as complete</label>
                    </div>
                </div>
            </div>
            <div ref="parentTaskComments" class="box-tasks-comments-parent">
                <div class="top-content">
                    <h2>Created: <span>May 17th, 12:55 pm</span></h2>
                </div>
                <div ref="taskDescription" class="task-description-content">
                    <textarea placeholder="Task description"></textarea>
                </div>
                <div class="comments-content" :style="'height:'+ commentsHeight + 'px;'">
                    <div class="comments-list">
                        <div class="comment-box view">
                            <div>
                                <span>nvbcfhgc</span>
                                <small class="text-muted block text-xs"><font-awesome-icon icon="clock" class="icon alt"/> a few seconds ago</small>
                            </div>
                            <button class="destroy close">×</button>
                        </div>
                        <div class="comment-box view">
                            <div>
                                <span>nvbcfhgc</span>
                                <small class="text-muted block text-xs"><font-awesome-icon icon="clock" class="icon alt"/> a few seconds ago</small>
                            </div>
                            <button class="destroy close">×</button>
                        </div>
                    </div>
                </div>
                <div class="footer-content">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Type a comment">
                        <span class="input-group-btn">
                            <button class="btn btn-success btn-sm" type="button"><font-awesome-icon icon="pen" class="icon alt" /></button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "home",
        data: function () {
            return {
                commentsHeight: 0,
                activeTask: null,
                editingTask: null,
                tasksDone: []
            }
        },
        mounted() {
            this.checkCommentsHeight();
        },
        methods: {
            checkCommentsHeight() {
                this.commentsHeight = this.$refs.parentTaskComments.clientHeight - this.$refs.taskDescription.clientHeight - 104;
            },
            checkifDone(id) {
                if(this.tasksDone.includes(id)) {
                    return true
                }

                return false
            },
            finishedTask(id, event) {
                const checked = event.target.checked;
                this.activeTask = id;
                if (checked) {
                    this.tasksDone.push(id)
                }
            },
            showActiveEditingTask(id) {
                this.activeTask = id;
                this.editingTask = id;
            }
        }
    }
</script>

<style scoped>
    .content {
        background: #ffffff;
        width: 100%;
        height: 100%;
        display: table-cell;
        vertical-align: top;
    }
    .content .parent-box {
        display: table;
        width: 100%;
    }
    .parent-box .box-tasks-parent {
        width:65%;
        display: table-cell;
        vertical-align: top;
    }
    .parent-box .box-tasks-comments-parent {
        width: 35%;
        display: table-cell;
        vertical-align: top;
        height: 100%;
    }
    .box-tasks-parent .top-content, .box-tasks-comments-parent .top-content {
        display: flex;
        width: 100%;
        background-color: #f9fafc;
        height: 51px;
        padding: 0 15px;
        border: 1px solid #e0e4e8;
        border-left: none;
    }
    .top-content h1 {
        font-size: 14px;
        margin: 18px 0;
    }
    .top-content h2 {
        font-size: 14px;
        margin: 15px 0;
        color: #979797;
    }
    .top-content h2 span {
        color: #717171;
    }
    .top-content button {
        margin: 11px 0;
    }
    .box-tasks-parent .main-content {
        width: 100%;
        height: calc(100vh - 102px);
        border-right: 1px solid #e0e4e8;
        background-color: #f9fafc;
        position: relative;
        overflow: hidden;
    }
    .box-tasks-parent .main-content .list-of-tasks {
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        padding: 15px 0;
        padding-right: 17px;
        box-sizing: content-box;
    }
    .box-tasks-parent .footer-content, .box-tasks-comments-parent .footer-content {
        width: 100%;
        background-color: #f9fafc;
        height: 51px;
        padding: 0 15px;
        border: 1px solid #e0e4e8;
        border-left: none;
    }
    .footer-content .checkbox {
        margin: 15px 0;
    }
    .checkbox label {
        margin: 0;
        color: #717171;
        font-size: 16px;
        cursor: pointer;
    }
    .task-description-content {
        min-height: 200px;
        width: 100%;
        height: 100%;
        border-bottom: 1px solid #e0e4e8;
        background-color: #f9fafc;
    }
    .task-description-content textarea {
        height: 200px;
        width: 100%;
        border: none;
        background-color: transparent;
        resize: none;
        padding: 10px;
    }
    .task-description-content textarea:focus {
        outline: none;
    }
    .box-tasks-comments-parent .footer-content input {
        height: 30px;
        margin: 10px 0;
    }
    .footer-content button {
        height: 30px;
        margin: 10px 0;
    }
    .box-tasks-comments-parent .footer-content input:focus {
        box-shadow: none;
        outline: none;
    }
    .task-box {
        display: block;
        padding: 10px 15px;
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 2px;
        margin-left:15px;
        margin-bottom: 5px;
    }
    .task-box:last-of-type {
        margin-bottom: 0;
    }
    .task-box .view {
        display: flex;
        width: 100%;
        height: 28px;
    }
    .task-box.active {
        border-color: #5dcff3;
        background-color: #5dcff3;
    }
    .task-box .view button.close {
        margin-left: auto;
        display: none;
    }
    .task-box:hover .view button.close {
        display: block;
    }
    .task-box .view .checkbox {
        width: 100%;
        height: 30px;
    }
    .task-box.active.editing .view .checkbox {
        display: flex;
    }
    .task-box .view .checkbox span {
        font-size: 18px;
    }
    .task-box .view .checkbox input.edit {
        border: none;
        display: none;
        font-size: 18px;
        background: transparent;
        width: 100%;
        padding: 0;
        color: #212529;
        margin: 0;
        margin-left: 2px;
        height: 30px;
    }
    .task-box.active.editing .checkbox input.edit  {
        display: inline;
    }
    .task-box .view .checkbox input.edit:focus {
        outline: none!important;
        box-shadow: none!important;
    }
    .task-box.editing .checkbox span {
        display: none;
    }
    .task-box.active.editing .checkbox input.toggle {
        margin-top: 8px;
    }
    .task-box.done .checkbox span,
    .task-box.active.done .checkbox span{
        text-decoration-line: line-through;
    }
    .comment-box.view {
        padding: 10px 15px;
        display: flex;
        border-bottom: 1px solid #e0e4e8;
    }
    .comment-box.view button.close {
        margin-left: auto;
        display: none;
    }
    .comment-box.view:hover button.close {
        display: block;
    }
    .comment-box.view span {
        display: block;
    }
    .comments-content {
        position: relative;
        overflow: hidden;
    }
    .comments-content .comments-list {
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        padding-right: 17px;
        box-sizing: content-box;
    }
</style>
