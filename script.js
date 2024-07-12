document.addEventListener('DOMContentLoaded', function() {
    const todoForm = document.getElementById('todoForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
  
    // Array para armazenar as tarefas
    let tasks = [];
  
    // Função para adicionar uma tarefa
    function addTask(taskText) {
      const task = {
        id: Date.now(),
        text: taskText,
        completed: false
      };
  
      tasks.push(task);
      renderTasks();
    }
  
    // Função para renderizar as tarefas na lista
    function renderTasks() {
      taskList.innerHTML = '';
  
      tasks.forEach(task => {
        const li = document.createElement('li');
        li.setAttribute('data-id', task.id);
        li.className = task.completed ? 'completed' : '';
  
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', toggleTaskCompletion);
  
        const span = document.createElement('span');
        span.textContent = task.text;
  
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.addEventListener('click', deleteTask);
  
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
      });
    }
  
    // Função para marcar/desmarcar uma tarefa como concluída
    function toggleTaskCompletion(event) {
      const taskId = parseInt(event.target.parentElement.getAttribute('data-id'));
      tasks = tasks.map(task => {
        if (task.id === taskId) {
          return {
            ...task,
            completed: !task.completed
          };
        }
        return task;
      });
      renderTasks();
    }
  
    // Função para excluir uma tarefa
    function deleteTask(event) {
      const taskId = parseInt(event.target.parentElement.getAttribute('data-id'));
      tasks = tasks.filter(task => task.id !== taskId);
      renderTasks();
    }
  
    // Event listener para o formulário de adicionar tarefa
    todoForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const taskText = taskInput.value.trim();
      if (taskText !== '') {
        addTask(taskText);
        taskInput.value = '';
      } else {
        alert('Por favor, digite uma tarefa válida.');
      }
    });
  });
  