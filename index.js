let xhr = new XMLHttpRequest();

let results = document.querySelector('.results')
let total = document.querySelector('.total')
let user = document.querySelector('#user').value;

document.querySelector('.btn').addEventListener('click', (e) => {
    e.preventDefault()

    xhr.open('GET', `https://api.github.com/users/${user}/repos`);

    xhr.onload = () => {
        let data = JSON.parse(xhr.responseText)
        console.log(data);

        data.map(item => {
            let li = document.createElement('li')
            li.innerHTML = item.name
            results.appendChild(li)
            total.innerHTML = data.length
        })

    }

    xhr.send()
})