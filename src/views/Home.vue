<template>
  <div class="navv">
    <span :class="{'navs' : !view_all, 'navs-active' : view_all}" @click="selectNav(1)">LIST TASKS</span>
    <span :class="{'navsPlus' : !addit, 'navs-activePlus' : addit}" @click="selectNav(4)">+</span>
  </div>

  <div v-if="view_all">
    <div class="content" v-for="todo in todos" :key="todo">
      <Todo :content="todo.content" :id="todo.id" :progress="todo.inProgress" @changedProgress="toggleOngoing" @remmed="removeTodo" @updatedContent="changeContent"/>
    </div>
  </div>
  <div v-if="addit">
    <NewTodo @addtodo="updateTodos"/>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import Todo from "../components/Todo.vue"
import NewTodo from "../components/NewTodo.vue"
import json from "../assets/tasks.json"
import fs from 'fs'
import pathModule from 'path'
import { readFile} from "fs";

export default {
  name: 'Home',
  taskJson: json,
  //tasks: {
  //  tasks: []
  //},
  components: {
    Todo, NewTodo
  },
  setup(){
    //initial navigation
    const view_all = ref(true)
    const completed = ref(false)
    const ongoing = ref(false)
    const addit = ref(false)

    function selectNav(num){
      if(view_all.value && num != 1){
        view_all.value = false;
      }
      if(completed.value && num != 2){
        completed.value = false;
      }
      if(ongoing.value && num != 3){
        ongoing.value = false;
      }
      if(addit.value && num != 4){
        addit.value = false;
      }

      if(num == 1){
        view_all.value = true;
      }
      else if(num == 2){
        completed.value = true;
      }
      else if(num == 3){
        ongoing.value = true;
      }
      else{
        addit.value = true;
      }
    }

    //main todo content




    //let tasks = ref(require("../assets/tasks.json").tasks)
    const path = require('path');
    //try {let tasks = ref(require("tasks.json").tasks) }
    //catch(e) { var obj = {
    //  tasks: []
    //};
    //  var data = JSON.stringify(obj)
    //  var fs = require('fs');
      //try { fs.writeFileSync('tasks.json', data,  'utf8'); }
      //catch(e) { alert('Failed to save the file !'); }
    //}

    //fs.readFile("/Users/Shared/tasks555.json", "utf8",  (err, data)  => {
    //  if (err) throw err;
     // let tasks = JSON.parse(data);
      //var data2 = JSON.stringify(tasks)
      //var fs = require('fs');
      //try { fs.writeFileSync('src/assets/tasks.json', data2,  'utf8'); }
      //catch(e) { alert('Failed to save the file !'); }
    //});


// Calling the readFileSync() method
// to read 'input.txt' file
    try { var data = fs.readFileSync('/Users/Shared/tasks555.json', 'utf8'); }
    catch(e) {
      let obj = {
        tasks: []
      };
      var data2 = JSON.stringify(obj)
      try { fs.writeFileSync('/Users/Shared/tasks555.json', data2,  'utf8'); }
      catch(e) { alert('Failed to save the file !'); }
      var data = fs.readFileSync('/Users/Shared/tasks555.json', 'utf8');}
    //let tasks = JSON.parse(data).tasks;

    let tasks = ref(JSON.parse(data).tasks)
    //var data2 = JSON.stringify(tasks)
    //try { fs.writeFileSync('dasdasdsads.json', data2,  'utf8'); }
    //catch(e) { alert('Failed to save the file !'); }


    //var obj = {
    //  tasks: tasks.value
    //};
    //const data = JSON.stringify(obj)
    //const fs = require('fs');
    //try { fs.writeFileSync('src/assets/lol.json', data,  'utf8'); }
    //catch(e) { alert('Failed to save the file !'); }

    const Completed = computed(() => {
      return tasks.value.filter((todo) => todo.inProgress === false)
    })
    const Ongoing = computed(() => {
      return tasks.value.filter((todo) => todo.inProgress === true)
    })

    function toggleOngoing(theId){
      tasks.value.forEach((todo) => {
        if(todo.id == theId){
          todo.inProgress = !todo.inProgress
        }
      })
      let obj = {
        tasks: tasks.value
      };
      var data2 = JSON.stringify(obj)
      try { fs.writeFileSync('/Users/Shared/tasks555.json', data2,  'utf8'); }
      catch(e) { alert('Failed to save the file !'); }
    }

    function removeTask(theId){
      let idx = 1
      tasks.value = tasks.value.filter((todo) => todo.id != theId)
      tasks.value.forEach((todo) => {
        todo.id = idx;
        idx++
      })
      let obj = {
        tasks: tasks.value
      };
      var data2 = JSON.stringify(obj)
      try { fs.writeFileSync('/Users/Shared/tasks555.json', data2,  'utf8'); }
      catch(e) { alert('Failed to save the file !'); }
    }

    function updateTasks(stuff){
      tasks.value.push({content: stuff, inProgress: true, id: tasks.value.length + 1})
      let obj = {
        tasks: tasks.value
      };
      var data2 = JSON.stringify(obj)
      try { fs.writeFileSync('/Users/Shared/tasks555.json', data2,  'utf8'); }
      catch(e) { alert('Failed to save the file !'); }
    }

    function changeContent(theId, newContent){
      tasks.value.forEach((todo) => {
        if(todo.id == theId){
          todo.content = newContent
        }
      })
    }

    return {view_all, completed, ongoing, addit, selectNav, todos: tasks, Completed, Ongoing, toggleOngoing, removeTodo: removeTask, updateTodos: updateTasks, changeContent}
  }
}
</script>

<style scoped>
.navv{
  margin-top: 10px;
  text-align: center;
}
.navs{
  display: inline-block;
  margin: 25px;
  font-size: 0.85em;
  color: gray;
  transition: all 0.2s ease;
}
.navs-active{
  display: inline-block;
  margin: 25px;
  font-size: 0.9em;
  color: rgb(40, 40, 40);
  transition: all 0.2s ease;
}
.navs:hover, .navs-active:hover, .navsPlus:hover, .navs-activePlus:hover{
  cursor: pointer;
}
.content{
  text-align: center;
  margin: 20px auto;
}
.navsPlus{
  transform: translateY(10%);
  margin: 25px;
  display: inline-block;
  font-size: 1.5em;
  color: gray;
  transition: all 0.2s ease;
}
.navs-activePlus{
  transform: translateY(10%);
  display: inline-block;
  margin-left: 22.5px;
  margin-right: 22.5px;
  margin-top: 17.5px;
  margin-bottom: 17.5px;
  font-size: 2em;
  color: rgb(40, 40, 40);
  transition: all 0.2s ease;
}
</style>
