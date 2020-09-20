let xhr = new XMLHttpRequest();
let message = document.querySelector('.messages');

document.querySelector('.btn').addEventListener('click', searchRepository);

function searchRepository(e) {
    e.preventDefault()

    let user = document.querySelector('#user').value;
    xhr.open('GET', `https://api.github.com/users/${user}/repos`);

    xhr.onload = () => {
        let data = JSON.parse(xhr.responseText)
        clearResults()

        if (xhr.status === 200) {
            sucessMessage(data);

            data.map((item, i) => {
                createLi(data[i].clone_url, item.name)
            })
        }

        if (xhr.status === 404) failMessage();
    }

    xhr.send()
}

function createLi(data, item) {
    let li = document.createElement('li');
    let a = document.createElement('a');

    a.setAttribute('href', data);    
    a.innerHTML = item;

    li.appendChild(a);
    document.querySelector('.results').appendChild(li)
}

function clearResults() {
    document.querySelector('.results').innerHTML = ''
}

function sucessMessage(data) {
    message.classList.remove('fail')
    message.classList.add('sucess')
    message.innerHTML = `${data.length} repositórios carregados com sucesso`
}

function failMessage() {
    message.classList.add('fail')
    message.classList.remove('sucess')
    message.innerHTML = 'Repositórios não encontrado'
}