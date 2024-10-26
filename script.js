let maquinas = [];
let recebimentos = [];
let contratos = [];
let contas = [];
let empresas = [];

let editIndex = -1;  // Índice do item sendo editado
let currentSection = '';  // Seção atual (máquinas, recebimentos, etc.)

// Função para adicionar/editar item
function addItem(section) {
    const form = document.getElementById(`${section}Form`);
    
    let newItem = {};
    if (section === 'maquinas') {
        newItem = {
            nome: form.nome.value,
            serie: form.serie.value,
            anosDeUso: form.anosDeUso.value,
            horasTrabalhadas: form.horasTrabalhadas.value,
            horimetro: form.horimetro.value
        };
    } else if (section === 'recebimentos') {
        newItem = {
            cliente: form.cliente.value,
            dataRecebimento: form.dataRecebimento.value,
            valorRecebido: form.valorRecebido.value
        };
    } else if (section === 'contratos') {
        newItem = {
            cliente: form.cliente.value,
            dataInicio: form.dataInicio.value,
            dataFim: form.dataFim.value,
            valorContrato: form.valorContrato.value
        };
    } else if (section === 'contas') {
        newItem = {
            tipo: form.tipo.value,
            dataEmissao: form.dataEmissao.value,
            dataVencimento: form.dataVencimento.value,
            valor: form.valor.value
        };
    } else if (section === 'empresas') {
        newItem = {
            nomeEmpresa: form.nomeEmpresa.value,
            cnpj: form.cnpj.value,
            telefone: form.telefone.value,
            endereco: form.endereco.value
        };
    }

    if (editIndex === -1) {
        // Adicionar novo item
        window[section].push(newItem);
    } else {
        // Editar item existente
        window[section][editIndex] = newItem;
        editIndex = -1;  // Resetar após a edição
    }

    form.reset();
    renderItems(section);
}

// Função para renderizar os itens dinamicamente
function renderItems(section) {
    const container = document.getElementById(`${section}Container`);
    container.innerHTML = '';  // Limpar o container

    window[section].forEach((item, index) => {
        const button = document.createElement('button');
        button.textContent = item.nome || item.cliente || item.tipo || item.nomeEmpresa;  // Exibe o primeiro campo do objeto

        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.classList.add('button-edit');
        editButton.onclick = () => editItem(section, index);

        const div = document.createElement('div');
        div.classList.add('item-actions');
        div.appendChild(button);
        div.appendChild(editButton);

        container.appendChild(div);
    });
}

// Função para iniciar a edição de um item
function editItem(section, index) {
    const item = window[section][index];
    const form = document.getElementById(`${section}Form`);

    // Preencher o formulário com os valores do item
    if (section === 'maquinas') {
        form.nome.value = item.nome;
        form.serie.value = item.serie;
        form.anosDeUso.value = item.anosDeUso;
        form.horasTrabalhadas.value = item.horasTrabalhadas;
        form.horimetro.value = item.horimetro;
    } else if (section === 'recebimentos') {
        form.cliente.value = item.cliente;
        form.dataRecebimento.value = item.dataRecebimento;
        form.valorRecebido.value = item.valorRecebido;
    } else if (section === 'contratos') {
        form.cliente.value = item.cliente;
        form.dataInicio.value = item.dataInicio;
        form.dataFim.value = item.dataFim;
        form.valorContrato.value = item.valorContrato;
    } else if (section === 'contas') {
        form.tipo.value = item.tipo;
        form.dataEmissao.value = item.dataEmissao;
        form.dataVencimento.value = item.dataVencimento;
        form.valor.value = item.valor;
    } else if (section === 'empresas') {
        form.nomeEmpresa.value = item.nomeEmpresa;
        form.cnpj.value = item.cnpj;
        form.telefone.value = item.telefone;
        form.endereco.value = item.endereco;
    }

    editIndex = index;  // Armazenar o índice do item em edição
}

// Função para confirmar pesquisa
function confirmSearch(containerId, inputId) {
    const searchQuery = document.getElementById(inputId).value.toLowerCase();
    const container = document.getElementById(containerId);

    const buttons = container.getElementsByTagName('button');
    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        const text = button.textContent.toLowerCase();
        if (text.includes(searchQuery)) {
            button.style.display = '';
        } else {
            button.style.display = 'none';
        }
    }
}

// Função para mostrar todos os itens
function showAllItems(section) {
    const container = document.getElementById(`${section}Container`);
    const buttons = container.getElementsByTagName('button');

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.display = '';
    }
}

// Função para alternar a visualização das seções
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.style.display = 'none');

    const selectedSection = document.getElementById(sectionId);
    selectedSection.style.display = 'block';

    currentSection = sectionId.replace('Section', '').toLowerCase();  // Definir a seção atual
}
