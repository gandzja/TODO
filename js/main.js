const form = document.querySelector('#newTaskForm');
const input = document.querySelector('#addNewTask');
const tasksList = document.querySelector('#list-group');

// !добавление задачи в список
form.addEventListener('submit', function (event) {
  event.preventDefault();

  const taskText = input.value.trim();

  const taskHTML = `<li class="list-group-item d-flex justify-content-between"><span class="task-title">${taskText}</span><button type="button" data-action="delete-task" class="btn btn-light align-self-end">Удалить</button></li>`;

  tasksList.insertAdjacentHTML('beforeEnd', taskHTML);

  // очищаем поле ввода
  input.value = '';
  // focus
  input.focus();
  // скрываем или показываем запись список дел пуст
  toggleEmptyListItem();

  showNotification('new');
});

// !удаление задачи из списка
tasksList.addEventListener('click', function (event) {
  if (event.target.getAttribute('data-action') == 'delete-task') {
    event.target.parentElement.remove();
    // скрываем или показываем запись список дел пуст
    toggleEmptyListItem();

    showNotification('delete');
  }
});

// !удавление / добавление блока "список дел пуст"
function toggleEmptyListItem() {
  if (tasksList.children.length > 1) {
    document.querySelector('#empty-list-item').style.display = 'none';
  } else {
    document.querySelector('#empty-list-item').style.display = 'block';
  }
}

// ! Задача добавлена!
function showNotification(type) {
  const notifyNew = document.createElement('div');
  notifyNew.className = 'alert alert-warning';
  notifyNew.textContent = 'Задача добавлена!';

  const notifyDelete = document.createElement('div');
  notifyDelete.className = 'alert alert-danger';
  notifyDelete.textContent = 'Задача удалена!';

  let newElement;

  switch (type) {
    case 'new':
      newElement = notifyNew;
      break;
    case 'delete':
      newElement = notifyDelete;
      break;
  }

  document.querySelector('#notify-holder').insertAdjacentElement('afterBegin', newElement);

  setTimeout(function () {
    newElement.style.opacity = '1';
  }, 300);

  setTimeout(function () {
    newElement.style.opacity = '0';
    newElement.remove();
  }, 2300);

  setTimeout(function () {
    newElement.remove();
  }, 2600);
}
