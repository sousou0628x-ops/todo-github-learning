// ToDoリストアプリケーション

// DOM要素の取得
const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const todoList = document.getElementById('todoList');
const darkModeToggle = document.getElementById('darkModeToggle');

// ローカルストレージからタスクを読み込む
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// ダークモードの状態を読み込む
let isDarkMode = localStorage.getItem('darkMode') === 'true';

// ページ読み込み時にタスクを表示
document.addEventListener('DOMContentLoaded', () => {
    renderTasks();
    
    // ダークモードの状態を適用
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.textContent = '☀️';
    }
});

// ダークモード切り替え
darkModeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode');
    darkModeToggle.textContent = isDarkMode ? '☀️' : '🌙';
    localStorage.setItem('darkMode', isDarkMode);
});

// タスク追加ボタンのイベントリスナー
addButton.addEventListener('click', addTask);

// Enterキーでもタスクを追加
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// タスクを追加する関数
function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('タスクを入力してください');
        return;
    }
    
    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };
    
    tasks.push(task);
    saveTasks();
    renderTasks();
    taskInput.value = '';
}

// タスクを削除する関数
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

// タスクの完了状態を切り替える関数
function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    saveTasks();
    renderTasks();
}

// タスクをローカルストレージに保存
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// タスクを画面に表示
function renderTasks() {
    todoList.innerHTML = '';
    
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `todo-item ${task.completed ? 'completed' : ''}`;
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'todo-checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleTask(task.id));
        
        const span = document.createElement('span');
        span.className = 'todo-text';
        span.textContent = task.text;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-button';
        deleteBtn.textContent = '削除';
        deleteBtn.addEventListener('click', () => {
            // Issue #1: 誤削除を防ぐため確認ダイアログを追加
            if (confirm('本当に削除しますか？')) {
                deleteTask(task.id);
            }
        });
        
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });
}
