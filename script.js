document.addEventListener("DOMContentLoaded", function() {
    const sections = ["maquinas", "contas", "recebimentos", "contratos", "empresas"];
    
    sections.forEach(section => {
        const form = document.querySelector(`#form-${section}`);
        const lista = document.querySelector(`#lista-${section}`);
        const storageKey = `dados-${section}`;

        carregarDados(storageKey, lista);

        form.addEventListener("submit", function(event) {
            event.preventDefault();
            salvarDados(storageKey, form, lista);
        });
    });
});

function salvarDados(storageKey, form, lista) {
    const dados = JSON.parse(localStorage.getItem(storageKey)) || [];

    const novoDado = {};
    [...form.elements].forEach(input => {
        if (input.name) novoDado[input.name] = input.value;
    });

    dados.push(novoDado);
    localStorage.setItem(storageKey, JSON.stringify(dados));

    adicionarNaLista(novoDado, lista);
    form.reset();
}

function carregarDados(storageKey, lista) {
    const dados = JSON.parse(localStorage.getItem(storageKey)) || [];
    dados.forEach(dado => adicionarNaLista(dado, lista));
}

function adicionarNaLista(dado, lista) {
    const item = document.createElement("div");
    item.classList.add("item-lista");

    const nomePrincipal = dado[Object.keys(dado)[0]];

    item.innerHTML = `
        <p>${nomePrincipal}</p>
        <div class="info-completa">
            ${Object.entries(dado).map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`).join('')}
        </div>
        <button class="alterar">Alterar</button>
        <button class="excluir">Excluir</button>
    `;

    item.querySelector(".alterar").addEventListener("click", function() {
        editarItem(dado, lista);
    });

    item.querySelector(".excluir").addEventListener("click", function() {
        excluirItem(dado, lista, storageKey);
    });

    lista.appendChild(item);
}

function excluirItem(dado, lista, storageKey) {
    let dados = JSON.parse(localStorage.getItem(storageKey));
    dados = dados.filter(d => d !== dado);
    localStorage.setItem(storageKey, JSON.stringify(dados));
    lista.innerHTML = '';
    carregarDados(storageKey, lista);
}

function editarItem(dado, lista) {
    // Função para carregar os dados no formulário e permitir a edição
    alert("Função de edição em desenvolvimento!");
}