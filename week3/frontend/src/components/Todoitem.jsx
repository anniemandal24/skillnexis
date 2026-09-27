function TodoItem({ task, onToggle, onEdit, onDelete }) {
    return (
        <div className="todo-item">

            <div>
                <h3 className={task.completed ? "completed" : ""}>
                    {task.title}
                </h3>

                <p>{task.description}</p>
            </div>

            <div className="todo-buttons">

                <button onClick={() => onToggle(task)}>
                    {task.completed ? "Undo" : "Complete"}
                </button>

                <button onClick={() => onEdit(task)}>
                    Edit
                </button>

                <button
                    className="delete-btn"
                    onClick={() => onDelete(task._id)}
                >
                    Delete
                </button>

            </div>

        </div>
    );
}

export default TodoItem;