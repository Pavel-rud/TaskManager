<template>
    <div class="heading">
        Add a new task
    </div>
    <div class="todo">
        <div class="colorline"/>
        <div class="todobg"/>
        <div class="todotext"> 
            Text:
            <input type="text" class="todoinput" @keydown.enter="addNewTodo" v-model="content"/>
        </div>
        <div class="controlButtons">
            <button class="controlButtonAdd" @click="addNewTodo">Add</button>
        </div>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'


export default {
    emits: ['addtodo'],
    setup(props, { emit }){
        const content = ref('')

        function clearNewTodo(){
            content.value = ''
        }

        function addNewTodo(){
            if(content.value.length > 0){
                emit('addtodo', content.value)
                content.value = ''
            }
        }

        return {content, clearNewTodo, addNewTodo}
    }
}
</script>

<style scoped>
.heading{
  text-align: center;
  margin: 20px;
  color: darkslategrey;
  font-size: 1.25em;
}
.todo{
  position: relative;
  height: 150px;
  width: 800px;
  margin: auto;
  text-align: center;
}
.todobg{
  position: absolute;
  top: 0;
  left: 1%;
  z-index: -1;
  margin: auto ;
  background: whitesmoke;
  border-radius: 20px;
  height: 100%;
  width: 99%;
}
.colorline{
  position: absolute;
  top: 8%;
  left: 0;
  margin: auto;
  z-index: -2;
  margin: auto ;
  background: #2277f6;
  border-radius: 20px;
  height: 96%;
  width: 100%;
}
.todotext{
  margin-left: 5%;
  display: flex;
  justify-content: left;
  text-align: left;
  align-items: center;
  height: 100%;
  width: 70%;
}
.controlButtons{
  margin-right: 5%;
  position: absolute;
  top: 0;
  right: 0;
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.controlButtonAdd,  .controlButtonCancel{
  font-size: 1.005em;
  color: black;
  cursor: pointer;
  padding: 0;
  margin: 0;
  border: none;
  text-align: center;
  background: whitesmoke;
  transition: all 0.2s ease;
}
.controlButtonAdd:hover,  .controlButtonCancel:hover{
  transition: all 0.2s ease;
  transform: scale(1.1);
}
.controlButtonAdd{
  color: #2277f6;
}

.controlButtonCancel{
  color: red;
}
.todoinput{
    color: rgb(60, 60, 60);
    width: 75%;
    margin-left: 4%;
    border-radius: 20px;
    border: 1px lightslategray solid;
    padding-top: 10px;
    padding-bottom: 10px;;
    padding-left: 10px;
    padding-right: 10px;
    transition: all 0.2s ease;
    background: whitesmoke;
}
.todoinput:focus{
    transition: all 0.2s ease;
    transform: scale(1.025);
    border: 2px lightslategray solid;
    outline: none;
}
</style>