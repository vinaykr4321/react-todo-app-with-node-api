import React from 'react';

const TodoItem = (props) => (
    <li>
        <span
            style={{textDecoration : props.completed ? 'line-through':'none'}}
            onClick={props.toggleTodo}
        >
            {props.name}
        </span>
        <span
            onClick={props.deleteTodo}
            style={{
                color:"red",
                fontWeight:"bold",
                fontSize:"20px",
                marginLeft:"50px"
            }}
        >
            X
        </span>
    </li>
)

export default TodoItem;