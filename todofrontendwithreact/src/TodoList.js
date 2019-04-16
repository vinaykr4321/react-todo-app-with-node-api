import React, { Component } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';


const APIURL = '/api/todos';

class TodoList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todos: []
        }
        this.addTodo = this.addTodo.bind(this);
    }

    componentWillMount() {
        this.loadTodos();
    }

    loadTodos() {
        fetch(APIURL)
            .then(resp => {
                if (!resp.ok) {
                    if (resp.status >= 400 && resp.status < 500) {
                        return resp.json().then(data => {
                            let err = { errorMessge: data.message };
                            throw err;
                        })
                    } else {
                        let err = { errorMessage: "Please try again later. There is something wrong with the server..." }
                        throw err;
                    }
                }
                return resp.json();
            })
            .then(todos => this.setState({ todos }));
    }

    addTodo(val) {
        fetch(APIURL,{
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({name:val})
        })
            .then(resp => {
                if (!resp.ok) {
                    if (resp.status >= 400 && resp.status < 500) {
                        return resp.json().then(data => {
                            let err = { errorMessge: data.message };
                            throw err;
                        })
                    } else {
                        let err = { errorMessage: "Please try again later. There is something wrong with the server..." }
                        throw err;
                    }
                }
                return resp.json();
            })
            .then(newTodo => {
                this.setState({todos:[...this.state.todos,newTodo]});
            });
    }


    deleteTodo(id){
        const delUrl = APIURL + '/' + id;
        fetch(delUrl,{
            method: 'delete'
        })
            .then(resp => {
                if (!resp.ok) {
                    if (resp.status >= 400 && resp.status < 500) {
                        return resp.json().then(data => {
                            let err = { errorMessge: data.message };
                            throw err;
                        })
                    } else {
                        let err = { errorMessage: "Please try again later. There is something wrong with the server..." }
                        throw err;
                    }
                }
                return resp.json();
            })
            .then(() => {
                const todos = this.state.todos.filter(todo => todo._id !== id);
                this.setState({todos:todos});
            });
    }

    toggleTodo(todo){
        const updateUrl = APIURL + '/' + todo._id;
        fetch(updateUrl,{
            method: 'put',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({completed:!todo.completed})
        })
            .then(resp => {
                if (!resp.ok) {
                    if (resp.status >= 400 && resp.status < 500) {
                        return resp.json().then(data => {
                            let err = { errorMessge: data.message };
                            throw err;
                        })
                    } else {
                        let err = { errorMessage: "Please try again later. There is something wrong with the server..." }
                        throw err;
                    }
                }
                return resp.json();
            })
            .then(updatedTodo => {
                const todos = this.state.todos.map(t => (
                    (t._id === updatedTodo._id)?{...t,completed: !t.completed}:t
                ))
                console.log(todos);
                this.setState({todos:todos});
            });
    }

    render() {
        const todos = this.state.todos.map(todo => {
            return (<TodoItem
                         key={todo._id}
                         {...todo}
                         deleteTodo={this.deleteTodo.bind(this,todo._id)}
                         toggleTodo={this.toggleTodo.bind(this,todo)}
                     />)
        })
        return (
            <div>
                <h1>Todo List!</h1>
                <TodoForm addTodo={this.addTodo} /><br />
                {todos}
            </div>
        )
    }
}

export default TodoList;