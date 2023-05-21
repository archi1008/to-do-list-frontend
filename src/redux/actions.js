import * as types from './actionsType';
import axios from 'axios';

const API = "https://to-do-list-server-ig08.onrender.com/";

const getTasks = (tasks)=>({
  type: types.GET_TASKS,
  payload: tasks
})
const getTask = (task)=>({
    type: types.GET_SINGLE_TASK,
    payload: task
})
const taskAdded = (msg)=>({
    type : types.ADD_TASK,
    payload:msg
})

const taskDeleted = (msg)=>({
    type : types.DELETE_TASK,
    payload: msg
})

const taskUpdate = (msg)=>({
    type :  types.UPDATE_TASK,
    payload: msg
})
const taskStatusUpdate = ()=>({
    type : types.UPDATE_STATUS
})
export const loadTasks = ()=>{
    return function (dispatch){
        axios.get(`${API}/users`).then((res)=>{dispatch(getTasks(res.data)); console.log(res.data);})
        .catch((err)=>{console.log("Error Occured while loading tasks", err)});
    }
}

export const addTask = (task)=>{
    return function (dispatch){
        axios.post(`${API}/users`,task).then((res)=>{dispatch(taskAdded(res.data.msg)); dispatch(loadTasks()); console.log(res.data.msg);})
        .catch((err)=>{console.log("Error Occured while loading tasks", err)});
    }
}

export const deleteTask = (id)=>{
    return function(dispatch){
        axios.delete(`${API}/users/${id}`,id).then((res)=>{dispatch(taskDeleted(res.data.msg)); dispatch(loadTasks()); console.log(res.data.msg);})
        .catch((err)=>{console.log("Error occured while deleting",err);})
    }
}

export const loadSingleTask = (id)=>{
    return function(dispatch){
        axios.get(`${API}/users/${id}`,id).then((res)=>{dispatch(getTask(res.data)); console.log(res.data.msg);})
        .catch((err)=>{console.log("Error occured while loading single user",err);})
    }
}

export const updateTask = (task, id)=>{
    return function(dispatch){
        axios.put(`${API}/users/${id}`,task).then((res)=>{dispatch(taskUpdate(res.data.msg)); dispatch(loadTasks()); console.log(res.data.msg);})
        .catch((err)=>{console.log("Error occured while updating task",err);})
    }
}

export const updateTaskStatus = (id)=>{
    return function(dispatch){
        axios.put(`${API}/users/status/${id}`).then((res)=>{dispatch(updateTask(res.data.msg)); dispatch(loadTasks()); console.log(res.data.msg);})
        .catch((err)=>{console.log("Error occured while updating status of task",err);})
    }
}