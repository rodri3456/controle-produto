console.log("Script clientes.js carregado!")

let clientes = []
let proximoId = 1
let editandoId = null

const nomeInput = document.getElementById("nomeCliente")
const emailInput = document.getElementById("emailCliente")
const telefoneInput = document.getElementById("telefoneCliente")
const nascimentoInput = document.getElementById("nascimentoCliente")
const btnSalvar = document.getElementById("btnSalvar")
const btnCancelar = document.getElementById("btnCancelar")
const tabelaCorpo = document.getElementById("clientesTabela")

nascimentoInput.max = new Date().toISOString().split("T")[0]

window.onload = () => {
  const dadosSalvos = localStorage.getItem('clientesStorage')
  if (dadosSalvos) {
    clientes = JSON.parse(dadosSalvos)
    proximoId = clientes.length ? Math.max(...clientes.map(c => c.id)) + 1 : 1
    renderizarClientes()
  }
}

function salvarLocalStorage() {
  localStorage.setItem('clientesStorage', JSON.stringify(clientes))
}

function limparFormulario() {
  nomeInput.value = ""
  emailInput.value = ""
  telefoneInput.value = ""
  nascimentoInput.value = ""
  editandoId = null
  btnSalvar.textContent = "Cadastrar Cliente"
  btnCancelar.style.display = "none"
}

function validarFormulario() {
  if (!nomeInput.value.trim()) {
    alert("Por favor, informe o nome completo.")
    return false
  }
  if (!emailInput.value.trim()) {
    alert("Por favor, informe o email.")
    return false
  }
  if (!telefoneInput.value.trim()) {
    alert("Por favor, informe o telefone.")
    return false
  }
  if (!nascimentoInput.value) {
    alert("Por favor, informe a data de nascimento.")
    return false
  }
  return true
}

function renderizarClientes() {
  tabelaCorpo.innerHTML = ""
  clientes.forEach((cliente) => {
    const tr = document.createElement("tr")
    tr.innerHTML = `
      <td>${cliente.id}</td>
      <td>${cliente.nome}</td>
      <td>${cliente.email}</td>
      <td>${cliente.telefone}</td>
      <td>${cliente.nascimento}</td>
      <td>
        <button class="btn btn-sm btn-warning me-2" onclick="editarCliente(${cliente.id})">Editar</button>
        <button class="btn btn-sm btn-danger" onclick="removerCliente(${cliente.id})">Remover</button>
      </td>
    `
    tabelaCorpo.appendChild(tr)
  })
}

function adicionarOuEditarCliente() {
  if (!validarFormulario()) return

  const clienteObj = {
    id: editandoId ?? proximoId,
    nome: nomeInput.value.trim(),
    email: emailInput.value.trim(),
    telefone: telefoneInput.value.trim(),
    nascimento: nascimentoInput.value,
  }

  if (editandoId === null) {
    clientes.push(clienteObj)
    proximoId++
  } else {
    const index = clientes.findIndex((c) => c.id === editandoId)
    if (index !== -1) {
      clientes[index] = clienteObj
    }
  }

  salvarLocalStorage()
  limparFormulario()
  renderizarClientes()
}

function editarCliente(id) {
  const cliente = clientes.find((c) => c.id === id)
  if (!cliente) return

  nomeInput.value = cliente.nome
  emailInput.value = cliente.email
  telefoneInput.value = cliente.telefone
  nascimentoInput.value = cliente.nascimento
  editandoId = id
  btnSalvar.textContent = "Salvar Edição"
  btnCancelar.style.display = "block"
}

function removerCliente(id) {
  if (confirm("Tem certeza que deseja remover este cliente?")) {
    clientes = clientes.filter((c) => c.id !== id)
    if (editandoId === id) {
      limparFormulario()
    }
    salvarLocalStorage()
    renderizarClientes()
  }
}

btnSalvar.addEventListener("click", adicionarOuEditarCliente)
btnCancelar.addEventListener("click", limparFormulario)
