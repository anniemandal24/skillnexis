import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import Navbar from "../components/Navbar";
import TodoItem from "../components/Todoitem";

function Dashboard() {

    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [editingId, setEditingId] = useState(null);

    const navigate = useNavigate();

    const getTasks = async () => {
        try {
            const response = await API.get("/tasks");
            setTasks(response.data);
        } catch (error) {
            console.log(error);

            if (error.response?.status === 401) {
                localStorage.removeItem("token");
                navigate("/login");
            }
        }
    };

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        getTasks();

    }, []);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (editingId) {

                const response = await API.put(
                    `/tasks/${editingId}`,
                    {
                        title,
                        description
                    }
                );

                setTasks(
                    tasks.map((task) =>
                        task._id === editingId
                            ? response.data
                            : task
                    )
                );

                setEditingId(null);

            } else {

                const response = await API.post(
                    "/tasks",
                    {
                        title,
                        description
                    }
                );

                setTasks([...tasks, response.data]);
            }

            setTitle("");
            setDescription("");

        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        }
    };

    const handleDelete = async (id) => {

        try {

            await API.delete(`/tasks/${id}`);

            setTasks(
                tasks.filter((task) => task._id !== id)
            );

        } catch (error) {
            console.log(error);
            alert("Could not delete task");
        }
    };

    const handleToggle = async (task) => {

        try {

            const response = await API.put(
                `/tasks/${task._id}`,
                {
                    title: task.title,
                    description: task.description,
                    completed: !task.completed
                }
            );

            setTasks(
                tasks.map((item) =>
                    item._id === task._id
                        ? response.data
                        : item
                )
            );

        } catch (error) {
            console.log(error);
            alert("Could not update task");
        }
    };

    const handleEdit = (task) => {

        setEditingId(task._id);
        setTitle(task.title);
        setDescription(task.description);
    };

    return (
        <div>

            <Navbar />

            <main className="dashboard">

                <h1>My Tasks</h1>

                <form
                    className="task-form"
                    onSubmit={handleSubmit}
                >

                    <input
                        type="text"
                        placeholder="Task title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                    <input
                        type="text"
                        placeholder="Task description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <button type="submit">
                        {editingId ? "Update Task" : "Add Task"}
                    </button>

                    {editingId && (
                        <button
                            type="button"
                            onClick={() => {
                                setEditingId(null);
                                setTitle("");
                                setDescription("");
                            }}
                        >
                            Cancel
                        </button>
                    )}

                </form>

                <div className="task-list">

                    {tasks.length === 0 ? (
                        <p>No tasks yet.</p>
                    ) : (
                        tasks.map((task) => (
                            <TodoItem
                                key={task._id}
                                task={task}
                                onToggle={handleToggle}
                                onDelete={handleDelete}
                                onEdit={handleEdit}
                            />
                        ))
                    )}

                </div>

            </main>

        </div>
    );
}

export default Dashboard;