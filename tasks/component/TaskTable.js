"use client";
import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  fetchTasksByMonth,
  createTask,
  updateTask,
  deleteTask,
  getDefaultDateForMonth,
  formatDisplayDate,
  getMonthName,
} from "@/services/taskservice";
import ShimmerUI from "./ShimmerUI";
import EditTaskPopup from "@/component/popups/EditTaskPopup";
import DeleteTaskPopup from "@/component/popups/DeleteTaskPopup";

const OPERATION_PASSWORD = "Akki@123";

export default function TaskTable({ selectedMonth }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newDate, setNewDate] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [password, setPassword] = useState("");
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [passwordError, setPasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const loadTasks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchTasksByMonth(selectedMonth);
      setTasks(data);
    } catch (err) {
      setError("Failed to load tasks. Please try again.");
      console.error("Error loading tasks:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handleAddTask = async () => {
    if (newTask.trim() && newDate.trim()) {
      setIsLoading(true);
      setError(null);
      try {
        const taskData = { task: newTask, date: newDate };

        if (editingTask) {
          await updateTask(editingTask._id, taskData);
          showSuccessMessage("Task updated successfully!");
        } else {
          await createTask(taskData);
          showSuccessMessage("Task added successfully!");
        }

        await loadTasks();

        setNewTask("");
        setNewDate("");
        setEditingTask(null);
        setIsFormVisible(false);
      } catch (err) {
        setError("Failed to save task. Please try again.");
        console.error("Error saving task:", err);
      } finally {
        setIsLoading(false);
      }
    }
  };
  const handleEditClick = (task) => {
    setEditingTask(task);
    setNewTask(task.task);
    setNewDate(new Date(task.date).toISOString().split("T")[0]);
    setShowEditModal(true);
  };

  const handleDeleteClick = (task) => {
    setTaskToDelete(task);
    setShowDeleteModal(true);
  };

  const verifyPassword = () => {
    if (password === OPERATION_PASSWORD) {
      setPasswordError("");
      return true;
    } else {
      setPasswordError("Incorrect password");
      return false;
    }
  };

  const handleEditConfirm = () => {
    if (verifyPassword()) {
      setShowEditModal(false);
      setPassword("");
      setIsFormVisible(true);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!verifyPassword()) return;

    try {
      setIsLoading(true);
      setError(null);
      await deleteTask(taskToDelete._id);
      showSuccessMessage("Task deleted successfully!");
      await loadTasks();
      setShowDeleteModal(false);
      setPassword("");
    } catch (err) {
      setError("Failed to delete task. Please try again.");
      console.error("Error deleting task:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
    setNewDate(getDefaultDateForMonth(selectedMonth));
  }, [selectedMonth]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <EditTaskPopup
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setPassword("");
          setPasswordError("");
        }}
        onConfirm={handleEditConfirm}
        password={password}
        setPassword={setPassword}
        passwordError={passwordError}
      />

      <DeleteTaskPopup
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setPassword("");
          setPasswordError("");
        }}
        onConfirm={handleDeleteConfirm}
        task={taskToDelete}
        password={password}
        setPassword={setPassword}
        passwordError={passwordError}
      />

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          <span className="text-blue-600">{getMonthName(selectedMonth)}</span>{" "}
          Tasks
        </h2>
        <button
          onClick={() => {
            if (isFormVisible && editingTask) {
              setEditingTask(null);
              setNewTask("");
              setNewDate(getDefaultDateForMonth(selectedMonth));
            }
            setIsFormVisible(!isFormVisible);
          }}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-500 hover:to-blue-500 hover:scale-105 hover:shadow-lg text-white py-2 px-4 rounded-full transition-transform duration-300 shadow-md"
          disabled={isLoading}
        >
          <span>{isFormVisible ? "Cancel" : "Add New Task"}</span>
          <span>{isFormVisible ? "×" : "+"}</span>
        </button>
      </div>

      {successMessage && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center animate-fade-in-up">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            {successMessage}
          </div>
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {isFormVisible && (
        <div className="mb-6 bg-blue-50 p-4 rounded-lg shadow-inner">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-3/12">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
            </div>
            <div className="md:w-9/12">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Task
              </label>
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Describe your task..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleAddTask}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-500 hover:to-blue-500 hover:scale-105 hover:shadow-lg text-white py-2 px-4 rounded-full transition-transform duration-300 shadow-md"
              disabled={isLoading}
            >
              {isLoading
                ? "Saving..."
                : editingTask
                ? "Update Task"
                : "Save Task"}
            </button>
          </div>
        </div>
      )}

      {isLoading && !isFormVisible && <ShimmerUI />}

      {!isLoading && tasks.length > 0 ? (
        <div className="overflow-hidden rounded-xl shadow-sm border border-gray-200">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="p-3 border-b border-gray-200 w-3/12 text-gray-600 font-semibold">
                  Date
                </th>
                <th className="p-3 border-b border-gray-200 w-7/12 text-gray-600 font-semibold">
                  Task
                </th>
                <th className="p-3 border-b border-gray-200 w-2/12 text-gray-600 font-semibold text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr
                  key={task._id}
                  className="border-b border-gray-100 hover:bg-blue-50 transition-colors duration-150"
                >
                  <td className="p-3 text-gray-800">
                    {formatDisplayDate(task.date)}
                  </td>
                  <td className="p-3 text-gray-800">{task.task}</td>
                  <td className="p-3 text-center">
                    <div className="flex justify-center space-x-3">
                      <button
                        onClick={() => handleEditClick(task)}
                        className="text-blue-600 hover:text-blue-800 transition-colors duration-150"
                        title="Edit Task"
                        disabled={isLoading}
                      >
                        <FaEdit size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(task)}
                        className="text-red-600 hover:text-red-800 transition-colors duration-150"
                        title="Delete Task"
                        disabled={isLoading}
                      >
                        <FaTrash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : !isLoading ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">
            No tasks for {getMonthName(selectedMonth)}.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Click "Add New Task" to get started.
          </p>
        </div>
      ) : null}
    </div>
  );
}
