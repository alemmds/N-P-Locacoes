function showSection(sectionId) {
    // Esconde todas as seções de cadastro e listas
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.style.display = 'none');
    
    // Exibe a seção correspondente ao menu clicado
    document.getElementById(sectionId).style.display = 'block';
}

// Funções para adicionar dados e atualizar as tabelas de cada aba

// Função para adicionar os dados para Máquinas
function addMaquina() {
    const nome = document.getElementById('nomeMaquina').value;
    const serie = document.getElementById('serieMaquina').value;
    const anosUso = document.getElementById('anosUso').value;
    const horasTrabalhadas = document.getElementById('horasTrabalhadas').value;

    if (nome && serie && anosUso && horasTrabalhadas) {
        const table = document.getElementById('maquinasList');
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${nome}</td>
            <td>${serie}</td>
            <td>${anosUso}</td>
            <td>${horasTrabalhadas}</td>
            <td>
                <button onclick="editRow(this)">ALTERAR</button>
                <button onclick="deleteRow(this)">EXCLUIR</button>
            </td>
        `;
        
        table.appendChild(row);

        // Limpar os campos após o cadastro
        document.getElementById('formMaquina').reset();

        showSection('maquinas');
    }
}

// Função para adicionar os dados para Recebimentos
function addRecebimento() {
    const empresa = document.getElementById('empresaRecebimento').value;
    const valor = document.getElementById('valorRecebimento').value;
    const pagamento = document.getElementById('dataPagamento').value;
    const termino = document.getElementById('dataTermino').value;
    const status = document.getElementById('statusRecebimento').value;

    if (empresa && valor && pagamento && termino && status) {
        const table = document.getElementById('recebimentosList');
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${empresa}</td>
            <td>${valor}</td>
            <td>${pagamento}</td>
            <td>${termino}</td>
            <td>${status}</td>
            <td>
                <button onclick="editRow(this)">ALTERAR</button>
                <button onclick="deleteRow(this)">EXCLUIR</button>
            </td>
        `;
        
        table.appendChild(row);

        // Limpar os campos após o cadastro
        document.getElementById('formRecebimento').reset();

        showSection('recebimentos');
    }
}

// Função para adicionar os dados para Contratos
function addContrato() {
    const empresa = document.getElementById('empresaContrato').value;
    const locatario = document.getElementById('locatarioContrato').value;
    const cnpj = document.getElementById('cnpjContrato').value;
    const representante = document.getElementById('representanteContrato').value;
    const periodo = document.getElementById('periodoContrato').value;
    const equipamento = document.getElementById('equipamentoContrato').value;
    const dataTermino = document.getElementById('dataTerminoContrato').value;
    const operador = document.getElementById('operadorContrato').value;

    if (empresa && locatario && cnpj && representante && periodo && equipamento && dataTermino && operador) {
        const table = document.getElementById('contratosList');
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${empresa}</td>
            <td>${locatario}</td>
            <td>${cnpj}</td>
            <td>${representante}</td>
            <td>${periodo}</td>
            <td>${equipamento}</td>
            <td>${dataTermino}</td>
            <td>${operador}</td>
            <td>
                <button onclick="editRow(this)">ALTERAR</button>
                <button onclick="deleteRow(this)">EXCLUIR</button>
            </td>
        `;
        
        table.appendChild(row);

        // Limpar os campos após o cadastro
        document.getElementById('formContrato').reset();

        showSection('contratos');
    }
}

// Função para adicionar os dados para Contas
function addConta() {
    const tipo = document.getElementById('tipoConta').value;
    const vencimento = document.getElementById('dataVencimentoConta').value;
    const valor = document.getElementById('valorConta').value;

    if (tipo && vencimento && valor) {
        const table = document.getElementById('contasList');
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${tipo}</td>
            <td>${vencimento}</td>
            <td>${valor}</td>
            <td>
                <button onclick="editRow(this)">ALTERAR</button>
                <button onclick="deleteRow(this)">EXCLUIR</button>
            </td>
        `;
        
        table.appendChild(row);

        // Limpar os campos após o cadastro
        document.getElementById('formConta').reset();

        showSection('contas');
    }
}

// Função para adicionar os dados para Empresas
function addEmpresa() {
    const nome = document.getElementById('nomeEmpresa').value;
    const cnpj = document.getElementById('areaCnpj').value;
    const area = document.getElementById('areaAtuacao').value;
    const representante = document.getElementById('representanteEmpresa').value;
    const telefone = document.getElementById('telefoneEmpresa').value;
    const email = document.getElementById('emailEmpresa').value;

    if (nome && cnpj && area && representante && telefone && email) {
        const table = document.getElementById('empresasList');
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${nome}</td>
            <td>${cnpj}</td>
            <td>${area}</td>
            <td>${representante}</td>
            <td>${telefone}</td>
            <td>${email}</td>
            <td>
                <button onclick="editRow(this)">ALTERAR</button>
                <button onclick="deleteRow(this)">EXCLUIR</button>
            </td>
        `;
        
        table.appendChild(row);

        // Limpar os campos após o cadastro
        document.getElementById('formEmpresa').reset();

        showSection('empresas');
    }
}

// Função para editar uma linha
function editRow(button) {
    const row = button.parentNode.parentNode;
    const cells = row.querySelectorAll('td');

    // Exemplo: Para edição de dados, você poderia implementar inputs dinâmicos aqui.
    // Este exemplo simplifica removendo e adicionando o conteúdo direto.
    for (let i = 0; i < cells.length - 1; i++) {
        const newValue = prompt("Editar valor:", cells[i].textContent);
        if (newValue) {
            cells[i].textContent = newValue;
        }
    }
}

// Função para excluir uma linha
function deleteRow(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

// Função para mostrar a lista de cada categoria
function showList(section) {
    const listId = `${section}List`;
    const listSection = document.getElementById(listId);
    
    // Exibe a lista correspondente
    if (listSection) {
        listSection.style.display = 'block';
    }
}

// Função para voltar à seção de cadastro
function goBack(section) {
    const listId = `${section}List`;
    const listSection = document.getElementById(listId);

    // Esconde a lista correspondente
    if (listSection) {
        listSection.style.display = 'none';
    }

    // Retorna à seção de cadastro
    showSection(section);
}