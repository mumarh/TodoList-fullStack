import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const TodoListApp = () => {
  const [task, setTask] = useState({ task: "", _id: "" });
  const [todo, setTodo] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (task.task.trim() === "") {
      toast.error("❌ Please enter a task!");
      return;
    }

    if (task._id) {
      axios
        .put(`http://localhost:3000/api/website/todo/update/${task._id}`, {
          task: task.task,
        })
        .then((res) => {
          toast.success("✅ Task Updated Successfully!");
          setTask({ task: "", _id: "" });
          Getdata();
        })
        .catch(() => toast.error("❌ Failed to update task"));
    } else {
      axios
        .post("http://localhost:3000/api/website/todo/insert", {
          task: task.task,
        })
        .then(() => {
          toast.success("✅ Task Added Successfully!");
          setTask({ task: "", _id: "" });
          Getdata();
        })
        .catch(() => toast.error("❌ Failed to add task"));
    }
  };

  const handleInput = (e) => setTask({ ...task, [e.target.name]: e.target.value });

  const Getdata = () => {
    axios
      .get("http://localhost:3000/api/website/todo/read")
      .then((res) => setTodo(res.data.data || []))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    Getdata();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/api/website/todo/delete/${id}`)
      .then(() => {
        toast.success("✅ Task Deleted Successfully!");
        Getdata();
      })
      .catch(() => toast.error("❌ Failed to delete task"));
  };

  const editRow = (id) => {
    axios.get(`http://localhost:3000/api/website/todo/single/${id}`)
      .then((res) => setTask({ _id: res.data.data._id, task: res.data.data.task }))
      .catch(() => toast.error("❌ Failed to fetch task"));
  };

  return (
    <div className="min-h-screen flex justify-center items-start bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200 py-12 px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-xl md:max-w-2xl">
        <h1 className="text-3xl font-extrabold text-center mb-8 text-gray-800">
          📝 Todo List
        </h1>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center gap-4 mb-6"
        >
          <input
            type="text"
            name="task"
            value={task.task}
            onChange={handleInput}
            placeholder="Enter a task..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <button
            type="submit"
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-5 py-3 rounded-2xl shadow-lg transition-all duration-200 w-full sm:w-auto justify-center"
          >
            <Plus size={18} />
            {task._id ? "Update" : "Add"}
          </button>
        </form>

        {/* Task List */}
        <div className="space-y-3">
          {todo && todo.length > 0 ? (
            todo.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-center gap-3 sm:gap-2 p-3 border border-gray-200 rounded-2xl shadow-sm bg-gray-50"
              >
                <input
                  type="text"
                  value={item.task.toUpperCase()}
                  readOnly
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700 font-medium"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => editRow(item._id)}
                    className="flex items-center gap-1 px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-2xl transition"
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="flex items-center gap-1 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-2xl transition"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No tasks found</p>
          )}
        </div>

        <ToastContainer position="top-center" autoClose={2000} />
      </div>
    </div>
  );
};

export default TodoListApp;
