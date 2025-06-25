console.log("Script tabela.js carregado!");

let produtos = [];
let proximoId = 1;
let editandoId = null;

const descricaoInput = document.getElementById("descricao");
const precoInput = document.getElementById("preco");
const btnSalvar = document.getElementById("btnSalvar");
const tabelaProdutos = document.getElementById("produtos");

function carregarProdutos() {
  const dados = localStorage.getItem("produtos");
  if (dados) {
    produtos = JSON.parse(dados);
    if (produtos.length > 0) {
      proximoId = Math.max(...produtos.map(p => p.id)) + 1;
    }
  }
}

function salvarProdutos() {
  localStorage.setItem("produtos", JSON.stringify(produtos));
}

function limparFormulario() {
  descricaoInput.value = "";
  precoInput.value = "";
  editandoId = null;
  btnSalvar.textContent = "Cadastrar Produto";
  descricaoInput.focus();
}

function validarFormulario() {
  if (!descricaoInput.value.trim()) {
    alert("Informe a descrição do produto.");
    descricaoInput.focus();
    return false;
  }
  if (!precoInput.value.trim() || isNaN(precoInput.value) || Number(precoInput.value) <= 0) {
    alert("Informe um preço válido.");
    precoInput.focus();
    return false;
  }
  return true;
}

function renderizarProdutos() {
  tabelaProdutos.innerHTML = "" ;
  produtos.forEach(produto => {
    const tr = document.createElement("tr") ;
    tr.innerHTML = `
    <tr>
        <td>${produto.id}</td>
        <td>${produto.descricao}</td>
        <td>R$ ${Number(produto.preco).toFixed(2)}</td>
        <td>
          <button class="btn btn-sm btn-warning me-2" onclick="editarProduto(${produto.id})">Editar</button>
          <button class="btn btn-sm btn-danger" onclick="removerProduto(${produto.id})">Remover</button>
        </td>
    </tr>
    `;
    tabelaProdutos.appendChild(tr);
  });
}

function adicionarOuEditarProduto() {
  if (!validarFormulario()) return;

  const produtoObj = {
    id: editandoId ?? proximoId,
    descricao: descricaoInput.value.trim(),
    preco: Number(precoInput.value).toFixed(2),
  };

  if (editandoId === null) {
    produtos.push(produtoObj);
    proximoId++;
  } else {
    const index = produtos.findIndex(p => p.id === editandoId);
    if (index !== -1) {
      produtos[index] = produtoObj;
    }
  }

  salvarProdutos();
  limparFormulario();
  renderizarProdutos();
}

function editarProduto(id) {
  const produto = produtos.find(p => p.id === id);
  if (!produto) return;

  descricaoInput.value = produto.descricao;
  precoInput.value = produto.preco;
  editandoId = id;
  btnSalvar.textContent = "Salvar Edição";
}

function removerProduto(id) {
  if (confirm("Deseja realmente remover este produto?")) {
    produtos = produtos.filter(p => p.id !== id);
    salvarProdutos();
    if (editandoId === id) {
      limparFormulario();
    }
    renderizarProdutos();
  }
}

btnSalvar.addEventListener("click", adicionarOuEditarProduto);

carregarProdutos();
renderizarProdutos();