const nome = document.querySelector("#nome")
const numero = document.querySelector("#numero")
const email = document.querySelector("#email")
const formulario = document.querySelector("#formulario")

const todos_os_contatos = document.querySelector("#todos_os_contatos")
const lista_de_contatos = JSON.parse(localStorage.getItem("agenda")) || []


formulario.addEventListener("submit", (evento)=>{
  evento.preventDefault()

  const objeto_contato_criado = {
    nome: nome.value,
    numero: numero.value,
    email: email.value,
  }

  if (formulario.dataset.editIndex !== undefined) {
    lista_de_contatos[formulario.dataset.editIndex] = objeto_contato_criado;
    delete formulario.dataset.editIndex;
  } else {
    lista_de_contatos.push(objeto_contato_criado)
  }

  localStorage.setItem("agenda", JSON.stringify(lista_de_contatos))
  formulario.reset()
  nome.focus()

  montar_contatos()
})

function montar_contatos(){
  todos_os_contatos.innerHTML = "" // isso aqui é como se fosse apagar o histórico

  lista_de_contatos.forEach((contato_da_vez,contato)=>{
    const novo_card = document.createElement("div")
    novo_card.className = "card"
  
    const novo_nome = document.createElement("h2")
    novo_nome.textContent = contato_da_vez.nome
  
    const novo_numero = document.createElement("p")
    novo_numero.textContent = contato_da_vez.numero
  
    const novo_email = document.createElement("p")
    novo_email.textContent = contato_da_vez.email
    
    const editar = document.createElement("button")
    editar.textContent = "Editar"
    editar.addEventListener("click", () => editar_contato(contato))
    
    const excluir = document.createElement("button")
    excluir.textContent = "Excluir"
    excluir.addEventListener("click", () => excluir_contato(contato));
  
    novo_card.append(novo_nome, novo_numero, novo_email, editar, excluir)
  
    todos_os_contatos.appendChild(novo_card)
  })
}

function editar_contato(contato) {
    const lista = lista_de_contatos[contato];
    
    nome.value = lista.nome;
    numero.value = lista.numero;
    email.value = lista.email;
    
    formulario.dataset.editIndex = contato;
}

function excluir_contato(contato) {
    if (confirm("Deseja excluir este contato?")) {
      lista_de_contatos.splice(contato, 1);
      localStorage.setItem("agenda", JSON.stringify(lista_de_contatos));
      montar_contatos();
    }
}

montar_contatos()
