const urlApi = 'https://rickandmortyapi.com/api/character/'
const listEl = document.getElementById('list')

let nextUrl = ''
let prevUrl = ''

const getCharacters = async(url, name = '') => {

  if(name !== '') {
    var response = await fetch(`${url}?name=${name}`)
  } else {
    var response = await fetch (url)
  }

  //const response = await fetch(url)
  const data = await response.json()
  
  nextUrl = data.info.next
  prevUrl = data.info.prev

  const characters = data.results
  render(characters)
}

const searchCharacters = (evento) => {
  evento.preventDefault()
  const inputText = document.querySelector('input').value
  getCharacters(urlApi, inputText)
}

const render = (characters) => {
  listEl.innerHTML = ''
  characters.map((character) => {
    
    listEl.insertAdjacentHTML('beforeend', `
      <div class="card">
      <div class="card__header">
        <p class="card__title">${character.name}</p>
      </div>
      <div class="card__img">
        <img src="${character.image}" alt="${character.name}">
      </div>
      <div class="card__body">
        <p><strong>Gender: </strong>${character.gender}</p> 
        <p><strong>Species: </strong>${character.species}</p>
        <p><strong>Origin: </strong>${character.origin.name}</p>
      </div>
      `
    )
  })
}

const nextPage = () => {
  getCharacters(nextUrl)
}

const prevPage = () => {
  getCharacters(prevUrl)
}

getCharacters(urlApi)