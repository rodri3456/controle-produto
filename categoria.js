let categorias = []
let indexEditado = null

const nmCategoria = document.getElementById('nmCategoria')
const btnSalvar = document.getElementById('btnSalvar')
const tabelaCategorias = document.getElementById('categorias')

window.onload = () => {
  const dadosSalvos = localStorage.getItem('categoriaStorage')
  if (dadosSalvos) {
    categorias = JSON.parse(dadosSalvos)
    renderizarCategorias()
  }
}

function salvarLocalStorage() {
  localStorage.setItem('categoriaStorage', JSON.stringify(categorias))
}

function renderizarCategorias() {
  tabelaCategorias.innerHTML = ''
  categorias.forEach((cat, index) => {
    const tr = document.createElement('tr')
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${cat}</td>
      <td>
        <button class="btn btn-sm btn-warning me-2" onclick="editarCategoria(${index})">Editar</button>
        <button class="btn btn-sm btn-danger" onclick="removerCategoria(${index})">Remover</button>
      </td>
    `
    tabelaCategorias.appendChild(tr)
  })
}

function addCategoria() {
  const valor = nmCategoria.value.trim()
  if (!valor) {
    alert('Por favor, informe um nome de categoria.')
    return
  }

  if (indexEditado === null) {
    categorias.push(valor)
  } else {
    categorias[indexEditado] = valor
    indexEditado = null
    btnSalvar.textContent = 'Cadastrar categoria'
  }

  nmCategoria.value = ''
  nmCategoria.focus()
  salvarLocalStorage()
  renderizarCategorias()
}

function editarCategoria(index) {
  nmCategoria.value = categorias[index]
  indexEditado = index
  btnSalvar.textContent = 'Salvar Edição'
}

function removerCategoria(index) {
  if (confirm('Tem certeza que deseja remover esta categoria?')) {
    categorias.splice(index, 1)
    salvarLocalStorage()
    renderizarCategorias()
    if (indexEditado === index) {
      indexEditado = null
      nmCategoria.value = ''
      btnSalvar.textContent = 'Cadastrar categoria'
    }
  }
}

btnSalvar.onclick = addCategoria