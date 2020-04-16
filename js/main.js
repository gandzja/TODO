const form = document.querySelector('#newTaskForm');
const input = document.querySelector('#addNewTask');
const tasksList = document.querySelector('#list-group');

// !добавление задачи в список
form.addEventListener('submit', function (event) {
  event.preventDefault();

  const taskText = input.value.trim();

  const taskHTML = `<li class="list-group-item d-flex justify-content-between"><span contenteditable="true" class="task-title">${taskText}</span><div><button type="button" data-action="ready" class="btn btn-light align-self-end">Выполнено!</button><button type="button" data-action="delete-task" class="btn btn-light align-self-end">Удалить</button></div></li>`;

  tasksList.insertAdjacentHTML('beforeEnd', taskHTML);

  // очищаем поле ввода
  input.value = '';
  // focus
  input.focus();
  // скрываем или показываем запись список дел пуст
  toggleEmptyListItem();

  showNotification('new');
});

// ! прослушиваем клик внутри всего списка с задачами
tasksList.addEventListener('click', function (event) {
  if (event.target.getAttribute('data-action') == 'delete-task') {
    event.target.closest('.list-group-item').remove();
    // скрываем или показываем запись список дел пуст
    toggleEmptyListItem();

    showNotification('delete');
  } else if (event.target.getAttribute('data-action') == 'ready') {
    const parentElement = event.target.closest('.list-group-item');

    parentElement.querySelector('.task-title').classList.add('task-title--done');

    parentElement.querySelector('.task-title').setAttribute('contenteditable', 'false');

    tasksList.insertAdjacentElement('beforeEnd', parentElement);

    event.target.remove();

    showNotification('ready');
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

// ! Задача добавлена! |Задача удалена!
function showNotification(type) {
  const notifyNew = document.createElement('div');
  notifyNew.className = 'alert alert-warning';
  notifyNew.textContent = 'Задача добавлена!';

  const notifyDelete = document.createElement('div');
  notifyDelete.className = 'alert alert-danger';
  notifyDelete.textContent = 'Задача удалена!';

  const notifyReady = document.createElement('div');
  notifyReady.className = 'alert alert-success';
  notifyReady.textContent = 'Задача выполнена!';

  let newElement;

  switch (type) {
    case 'new':
      newElement = notifyNew;
      break;
    case 'delete':
      newElement = notifyDelete;
      break;
    case 'ready':
      newElement = notifyReady;
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
