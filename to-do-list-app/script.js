// DOM Elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const prioritySelect = document.getElementById('priority-select');
const dueDate = document.getElementById('due-date');
const dueTime = document.getElementById('due-time');
const taskList = document.getElementById('task-list');
const sortDateBtn = document.getElementById('sort-date');
const sortPriorityBtn = document.getElementById('sort-priority');

// Load tasks when page loads
document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
});

// Add new task
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const taskText = taskInput.value.trim();
  if (!taskText) return;
  
  const task = {
    text: taskText,
    priority: prioritySelect.value,
    dueDate: dueDate.value,
    dueTime: dueTime.value,
    completed: false,
    createdAt: new Date().toISOString()
  };
  
  addTaskToDOM(task);
  saveTasks();
  taskForm.reset();
  taskInput.focus();
});

// Add task to DOM
function addTaskToDOM(task) {
  const li = document.createElement('li');
  li.className = `task priority-${task.priority} ${task.completed ? 'completed' : ''}`;
  
  // Format time display
  let timeDisplay = '';
  if (task.dueDate) {
    const dateObj = new Date(`${task.dueDate}T${task.dueTime || '00:00'}`);
    timeDisplay = dateObj.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }
  
  li.innerHTML = `
    <div class="task-info">
      <div class="task-text">${task.text}</div>
      ${timeDisplay ? `<div class="task-time">${timeDisplay}</div>` : ''}
    </div>
    <div class="task-actions">
      <button class="complete-btn" title="Mark complete">✓</button>
      <button class="delete-btn" title="Delete task">✕</button>
    </div>
  `;
  
  // Add event listeners
  li.querySelector('.complete-btn').addEventListener('click', () => {
    li.classList.toggle('completed');
    saveTasks();
  });
  
  li.querySelector('.delete-btn').addEventListener('click', () => {
    li.remove();
    saveTasks();
  });
  
  taskList.appendChild(li);
}

// Save tasks to localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll('#task-list li').forEach(li => {
    tasks.push({
      text: li.querySelector('.task-text').textContent,
      priority: li.classList.contains('priority-high') ? 'high' : 
                li.classList.contains('priority-medium') ? 'medium' : 'low',
      dueDate: li.querySelector('.task-time') ? 
               new Date(li.querySelector('.task-time').textContent).toISOString().split('T')[0] : '',
      dueTime: li.querySelector('.task-time') ? 
               new Date(li.querySelector('.task-time').textContent).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '',
      completed: li.classList.contains('completed'),
      createdAt: li.dataset.createdAt || new Date().toISOString()
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach(task => addTaskToDOM(task));
}

// Sort by date/time
sortDateBtn.addEventListener('click', () => {
  const tasks = Array.from(taskList.children);
  
  tasks.sort((a, b) => {
    const aTime = a.querySelector('.task-time')?.textContent;
    const bTime = b.querySelector('.task-time')?.textContent;
    
    if (!aTime && !bTime) return 0;
    if (!aTime) return 1;
    if (!bTime) return -1;
    
    return new Date(aTime) - new Date(bTime);
  });
  
  tasks.forEach(task => taskList.appendChild(task));
  saveTasks();
});

// Sort by priority (High > Medium > Low)
sortPriorityBtn.addEventListener('click', () => {
  const tasks = Array.from(taskList.children);
  
  tasks.sort((a, b) => {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    const aPriority = a.classList.contains('priority-high') ? 'high' : 
                     a.classList.contains('priority-medium') ? 'medium' : 'low';
    const bPriority = b.classList.contains('priority-high') ? 'high' : 
                     b.classList.contains('priority-medium') ? 'medium' : 'low';
    
    return priorityOrder[aPriority] - priorityOrder[bPriority];
  });
  
  tasks.forEach(task => taskList.appendChild(task));
  saveTasks();
});