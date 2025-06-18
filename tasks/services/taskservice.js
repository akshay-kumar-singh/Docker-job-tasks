import { API_BASE_URL, API_ENDPOINTS } from "../config/apiConfig";

const API_URL = `${API_BASE_URL}${API_ENDPOINTS.TASKS}`;

/**
 * Fetch all tasks for a specific month
 * @param {number} month - Month index (0-11)
 * @returns {Promise<Array>} Array of task objects
 */
export const fetchTasksByMonth = async (month) => {
  const response = await fetch(`${API_URL}?month=${month}`);
  if (!response.ok) {
    throw new Error(`Error fetching tasks: ${response.status}`);
  }
  return await response.json();
};

/**
 * Create a new task
 * @param {Object} taskData - Task data (task, date)
 * @returns {Promise<Object>} Created task object
 */
export const createTask = async (taskData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });
  
  if (!response.ok) {
    throw new Error(`Error creating task: ${response.status}`);
  }
  
  return await response.json();
};

/**
 * Update an existing task
 * @param {string} taskId - Task ID
 * @param {Object} taskData - Updated task data (task, date)
 * @returns {Promise<Object>} Updated task object
 */
export const updateTask = async (taskId, taskData) => {
  const response = await fetch(`${API_URL}/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });
  
  if (!response.ok) {
    throw new Error(`Error updating task: ${response.status}`);
  }
  
  return await response.json();
};

/**
 * Delete a task
 * @param {string} taskId - Task ID
 * @returns {Promise<Object>} Deletion confirmation
 */
export const deleteTask = async (taskId) => {
  const response = await fetch(`${API_URL}/${taskId}`, {
    method: "DELETE",
  });
  
  if (!response.ok) {
    throw new Error(`Error deleting task: ${response.status}`);
  }
  
  return await response.json();
};

/**
 * Get formatted date string for selected month with current day
 * @param {number} month - Month index (0-11)
 * @returns {string} Date string in YYYY-MM-DD format
 */
export const getDefaultDateForMonth = (month) => {
  const today = new Date();
  today.setMonth(month);

  const year = today.getFullYear();
  const monthStr = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${monthStr}-${day}`;
};

/**
 * Format date for display
 * @param {string} dateString - Date string
 * @returns {string} Formatted date string
 */
export const formatDisplayDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    weekday: "short",
  }).format(date);
};

/**
 * Get month name from index
 * @param {number} monthIndex - Month index (0-11)
 * @returns {string} Month name
 */
export const getMonthName = (monthIndex) => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return months[monthIndex];
};