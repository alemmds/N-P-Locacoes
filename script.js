function showSection(sectionId) {
    // Esconde todas as seções de cadastro e listas
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.style.display = 'none');
    
    // Exibe a seção correspondente ao menu clicado
    document.getElementById(sectionId).style.display = 'block';
}

// Adiciona evento de clique para cada item do menu lateral
document.getElementById('menuMaquinas').addEventListener('click', function() {
    showSection('maquinasSection');
});

document.getElementById('menuRecebimentos').addEventListener('click', function() {
    showSection('recebimentosSection');
});

document.getElementById('menuContratos').addEventListener('click', function() {
    showSection('contratosSection');
});

document.getElementById('menuContas').addEventListener('click', function() {
    showSection('contasSection');
});

document.getElementById('menuEmpresas').addEventListener('click', function() {
    showSection('empresasSection');
});

// Função para adicionar dados a tabela de máquinas
function addMaquina() {
    const nome = document.getElementById('machineName').value;
    const serie = document.getElementById('machineSerie').value;
    const anosUso = document.getElementById('machineAnosUso').value;
    const horasTrabalhadas = document.getElementById('machineHorasTrabalhadas').value;

    if (nome && serie && anosUso && horasTrabalhadas) {
        const table = document.getElementById('maquinasTableBody');
        const row = table.insertRow();

        row.insertCell(0).textContent = nome;
        row.insertCell(1).textContent = serie;
        row.insertCell(2).textContent = anosUso;
        row.insertCell(3).textContent = horasTrabalhadas;

        const actionsCell = row.insertCell(4);
        actionsCell.innerHTML = '<button onclick="editRow(this)">ALTERAR</button> <button onclick="deleteRow(this)">EXCLUIR</button>';
        
        // Mantém a seção atual visível
        showSection('maquinasSection');
    }
}

// Função para adicionar dados a tabela de recebimentos
function addRecebimento() {
    const empresa = document.getElementById('recebimentoEmpresa').value;
    const valor = document.getElementById('recebimentoValor').value;
    const pagamento = document.getElementById('recebimentoPagamento').value;
    const termino = document.getElementById('recebimentoTermino').value;
    const status = document.getElementById('recebimentoStatus').value;

    if (empresa && valor && pagamento && termino && status) {
        const table = document.getElementById('recebimentosTableBody');
        const row = table.insertRow();

        row.insertCell(0).textContent = empresa;
        row.insertCell(1).textContent = valor;
        row.insertCell(2).textContent = pagamento;
        row.insertCell(3).textContent = termino;
        row.insertCell(4).textContent = status;

        const actionsCell = row.insertCell(5);
        actionsCell.innerHTML = '<button onclick="editRow(this)">ALTERAR</button> <button onclick="deleteRow(this)">EXCLUIR</button>';
        
        // Mantém a seção atual visível
        showSection('recebimentosSection');
    }
}

// Função para adicionar dados a tabela de contratos
function addContrato() {
    const empresa = document.getElementById('contratoEmpresa').value;
    const locatario = document.getElementById('contratoLocatario').value;
    const cnpj = document.getElementById('contratoCnpj').value;
    const representante = document.getElementById('contratoRepresentante').value;
    const periodo = document.getElementById('contratoPeriodo').value;
    const equipamento = document.getElementById('contratoEquipamento').value;
    const termino = document.getElementById('contratoTermino').value;
    const operador = document.querySelector('input[name="operador"]:checked').value;

    if (empresa && locatario && cnpj && representante && periodo && equipamento && termino && operador) {
        const table = document.getElementById('contratosTableBody');
        const row = table.insertRow();

        row.insertCell(0).textContent = empresa;
        row.insertCell(1).textContent = locatario;
        row.insertCell(2).textContent = cnpj;
        row.insertCell(3).textContent = representante;
        row.insertCell(4).textContent = periodo;
        row.insertCell(5).textContent = equipamento;
        row.insertCell(6).textContent = termino;
        row.insertCell(7).textContent = operador;

        const actionsCell = row.insertCell(8);
        actionsCell.innerHTML = '<button onclick="editRow(this)">ALTERAR</button> <button onclick="deleteRow(this)">EXCLUIR</button>';
        
        // Mantém a seção atual visível
        showSection('contratosSection');
    }
}

// Função para adicionar dados a tabela de contas
function addConta() {
    const tipo = document.getElementById('contaTipo').value;
    const vencimento = document.getElementById('contaVencimento').value;
    const valor = document.getElementById('contaValor').value;

    if (tipo && vencimento && valor) {
        const table = document.getElementById('contasTableBody');
        const row = table.insertRow();

        row.insertCell(0).textContent = tipo;
        row.insertCell(1).textContent = vencimento;
        row.insertCell(2).textContent = valor;

        const actionsCell = row.insertCell(3);
        actionsCell.innerHTML = '<button onclick="editRow(this)">ALTERAR</button> <button onclick="deleteRow(this)">EXCLUIR</button>';
        
        // Mantém a seção atual visível
        showSection('contasSection');
    }
}

// Função para adicionar dados a tabela de empresas
function addEmpresa() {
    const nome = document.getElementById('empresaNome').value;
    const cnpj = document.getElementById('empresaCnpj').value;
    const areaAtuacao = document.getElementById('empresaAreaAtuacao').value;
    const representante = document.getElementById('empresaRepresentante').value;
    const telefone = document.getElementById('empresaTelefone').value;
    const email = document.getElementById('empresaEmail').value;

    if (nome && cnpj && areaAtuacao && representante && telefone && email) {
        const table = document.getElementById('empresasTableBody');
        const row = table.insertRow();

        row.insertCell(0).textContent = nome;
        row.insertCell(1).textContent = cnpj;
        row.insertCell(2).textContent = areaAtuacao;
        row.insertCell(3).textContent = representante;
        row.insertCell(4).textContent = telefone;
        row.insertCell(5).textContent = email;

        const actionsCell = row.insertCell(6);
        actionsCell.innerHTML = '<button onclick="editRow(this)">ALTERAR</button> <button onclick="deleteRow(this)">EXCLUIR</button>';
        
        // Mantém a seção atual visível
        showSection('empresasSection');
    }
}

// Função para editar dados de uma linha da tabela
function editRow(button) {
    const row = button.closest('tr');
    // Lógica para editar os dados da linha
    alert('Função de edição ainda não implementada.');
}

// Função para excluir dados de uma linha da tabela
function deleteRow(button) {
    const row = button.closest('tr');
    row.remove();
}