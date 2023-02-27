function init() {
    const form = document.getElementById('form');

    function createTodo(todo) {
        const parentElement = document.querySelector('.todoContainer');
        const article = document.createElement('article');
        article.className = 'todo';

        const timeNow = Date.now();
        article.setAttribute('data-id', timeNow);

        parentElement.appendChild(article);

        const container = document.createElement('div');
        article.appendChild(container);

        const dot = document.createElement('div');
        dot.className = 'dot';
        container.appendChild(dot);

        const paragraph = document.createElement('p');
        paragraph.innerText = todo;
        container.appendChild(paragraph);

        const buttonContainer = document.createElement('div');
        article.appendChild(buttonContainer);

        const deleteButton = document.createElement('button');
        deleteButton.onclick = () => deleteTodo(timeNow);
        deleteButton.innerText = 'Delete';
        buttonContainer.appendChild(deleteButton);

        const editButton = document.createElement('button');
        editButton.onclick = () => editTodo(timeNow);
        editButton.innerText = 'Edit';
        buttonContainer.appendChild(editButton);
    }

    function handleSubmit(ev) {
        ev.preventDefault();

        const formData = new FormData(form);
        const todo = formData.get('todo');
        if (todo.trim() !== '') {
            createTodo(todo);
            form.reset();
        } else {
            const form = document.getElementById('form');
            const text = document.createElement('p');
            text.innerText = 'Field cannot be empty';
            text.className = 'errorText';
            form.insertAdjacentElement('afterend', text);
        }
    }

    form.addEventListener('submit', (ev) => handleSubmit(ev));

    const inputElement = document.getElementById('todo');
    function onTextInput() {
        //pronađi paragraf koji je errorText i obrisati ga ako ga ima
        const paragr = document.querySelector('.errorText');
        if (paragr) {
            paragr.remove();
        }
    }
    inputElement.addEventListener('keydown', onTextInput);
}

init();

function enableButtons(id) {
    const articles = document.querySelectorAll('article');
    console.log(articles);

    articles.forEach((article) => {
        const editSaveButton = article.querySelectorAll('button')[1];
        editSaveButton.disabled = false;
    });
}

function disableButtons(id) {
    const articles = document.querySelectorAll('article');
    console.log(articles);

    articles.forEach((article) => {
        const saveEDitButton = article.querySelectorAll('button')[1];
        saveEDitButton.disabled = true;
    });

    const parentElement = document.querySelector(`[data-id='${id}']`);
    const buttonToEnable = parentElement.querySelectorAll('button')[1];
    buttonToEnable.disabled = false;
}

function deleteTodo(id) {
    enableButtons(id);
    const element = document.querySelector(`[data-id='${id}']`);
    element.remove();
}

function saveTodo(id) {
    enableButtons(id);
    console.log('save');
    const parentElement = document.querySelector(`[data-id='${id}']`);
    const saveButton = parentElement.querySelectorAll('button')[1];
    const paragraph = parentElement.querySelector('p');

    saveButton.innerText = 'Edit';
    saveButton.onclick = () => editTodo(id);

    paragraph.contentEditable = false;
}

function editTodo(id) {
    disableButtons(id);
    console.log('edit');
    const parentElement = document.querySelector(`[data-id='${id}']`);
    const editButton = parentElement.querySelectorAll('button')[1];
    const paragraph = parentElement.querySelector('p');

    editButton.innerText = 'Save';
    editButton.onclick = () => saveTodo(id);

    paragraph.contentEditable = true;
    //paragraph.onblur = () => saveTodo(id);
    paragraph.focus();
    document.getSelection().selectAllChildren(paragraph);
    document.getSelection().collapseToEnd();
}
