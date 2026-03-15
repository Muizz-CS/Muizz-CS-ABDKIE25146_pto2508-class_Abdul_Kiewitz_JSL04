function init() {
  renderTasks();
}

function renderTasks() {
  const columns = {
    todo: document.querySelector('[data-status="todo"] .tasks-container'),
    doing: document.querySelector('[data-status="doing"] .tasks-container'),
    done: document.querySelector('[data-status="done"] .tasks-container')
  };

  Object.values(columns).forEach(col => col.innerHTML = "");

  initialTasks.forEach(task => {
    const taskElement = createTaskElement(task);
    if (columns[task.status]) {
      columns[task.status].appendChild(taskElement);
    }
  });

  updateColumnCounts();
}

function createTaskElement(task) {
  const div = document.createElement("div");
  div.className = "task-div";
  div.textContent = task.title;

  div.addEventListener("click", () => openModal(task));

  return div;
}

function updateColumnCounts() {
  const statuses = ['todo', 'doing', 'done'];
  statuses.forEach(status => {
    const count = initialTasks.filter(t => t.status === status).length;
    const header = document.querySelector(`[data-status="${status}"] .columnHeader`);
    if (header) {
      header.textContent = `${status.toUpperCase()} (${count})`;
    }
  });
}

function openModal(task) {

  const backdrop = document.createElement("div");
  backdrop.id = "modal-backdrop";
  backdrop.style = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); display:flex; justify-content:center; align-items:center; z-index:2000;";

  const modal = document.createElement("div");
  modal.style = "background:white; padding:24px; border-radius:8px; width:90%; max-width:480px; display:flex; flex-direction:column; gap:16px;";

  modal.innerHTML = `
    <h3 style="margin:0;">Edit Task</h3>
    <label style="color:#828fa3; font-size:0.75rem; font-weight:bold;">Title</label>
    <input type="text" id="edit-title" value="${task.title}" style="padding:10px; border:1px solid #e4ebfa; border-radius:4px;">
    
    <label style="color:#828fa3; font-size:0.75rem; font-weight:bold;">Description</label>
    <textarea id="edit-desc" style="padding:10px; border:1px solid #e4ebfa; border-radius:4px; min-height:80px;">${task.description}</textarea>
    
    <label style="color:#828fa3; font-size:0.75rem; font-weight:bold;">Status</label>
    <select id="edit-status" style="padding:10px; border:1px solid #e4ebfa; border-radius:4px;">
      <option value="todo" ${task.status === 'todo' ? 'selected' : ''}>To Do</option>
      <option value="doing" ${task.status === 'doing' ? 'selected' : ''}>Doing</option>
      <option value="done" ${task.status === 'done' ? 'selected' : ''}>Done</option>
    </select>
    
    <div style="display:flex; gap:12px; margin-top:8px;">
      <button id="save-btn" style="flex:1; background:#635fc7; color:white; border:none; padding:12px; border-radius:20px; cursor:pointer; font-weight:bold;">Save Changes</button>
      <button id="cancel-btn" style="flex:1; background:rgba(99, 95, 199, 0.1); color:#635fc7; border:none; padding:12px; border-radius:20px; cursor:pointer; font-weight:bold;">Cancel</button>
    </div>
  `;

  backdrop.appendChild(modal);
  document.body.appendChild(backdrop);

  document.getElementById("cancel-btn").onclick = () => document.body.removeChild(backdrop);

  document.getElementById("save-btn").onclick = () => {
    task.title = document.getElementById("edit-title").value;
    task.description = document.getElementById("edit-desc").value;
    task.status = document.getElementById("edit-status").value;
    
    document.body.removeChild(backdrop);
    renderTasks(); 
  };
}

init();