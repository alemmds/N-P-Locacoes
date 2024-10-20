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

// Função para adicionar dados à tabela de máquinas
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
        
        // Limpa os campos após o cadastro
        document.getElementById('machineName').value = '';
        document.getElementById('machineSerie').value = '';
        document.getElementById('machineAnosUso').value = '';
        document.getElementById('machineHorasTrabalhadas').value = '';
        
        // Mantém a seção atual visível
        showSection('maquinasSection');
    }
}

// Função para adicionar dados à tabela de recebimentos
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
        
        // Limpa os campos após o cadastro
        document.getElementById('recebimentoEmpresa').value = '';
        document.getElementById('recebimentoValor').value = '';
        document.getElementById('recebimentoPagamento').value = '';
        document.getElementById('recebimentoTermino').value = '';
        document.getElementById('recebimentoStatus').value = '';
        
        // Mantém a seção atual visível
        showSection('recebimentosSection');
    }
}

// Função para adicionar dados à tabela de contratos
function addContrato() {
    const empresa = document.getElementById('contratoEmpresa').value;
    const valor = document.getElementById('contratoValor').value;
    const inicio = document.getElementById('contratoInicio').value;
    const fim = document.getElementById('contratoFim').value;

    if (empresa && valor && inicio && fim) {
        const table = document.getElementById('contratosTableBody');
        const row = table.insertRow();

        row.insertCell(0).textContent = empresa;
        row.insertCell(1).textContent = valor;
        row.insertCell(2).textContent = inicio;
        row.insertCell(3).textContent = fim;

        const actionsCell = row.insertCell(4);
        actionsCell.innerHTML = '<button onclick="editRow(this)">ALTERAR</button> <button onclick="deleteRow(this)">EXCLUIR</button>';
        
        // Limpa os campos após o cadastro
        document.getElementById('contratoEmpresa').value = '';
        document.getElementById('contratoValor').value = '';
        document.getElementById('contratoInicio').value = '';
        document.getElementById('contratoFim').value = '';
        
        // Mantém a seção atual visível
        showSection('contratosSection');
    }
}

// Função para adicionar dados à tabela de contas
function addConta() {
    const descricao = document.getElementById('contaDescricao').value;
    const valor = document.getElementById('contaValor').value;
    const vencimento = document.getElementById('contaVencimento').value;
    const status = document.getElementById('contaStatus').value;

    if (descricao && valor && vencimento && status) {
        const table = document.getElementById('contasTableBody');
        const row = table.insertRow();

        row.insertCell(0).textContent = descricao;
        row.insertCell(1).textContent = valor;
        row.insertCell(2).textContent = vencimento;
        row.insertCell(3).textContent = status;

        const actionsCell = row.insertCell(4);
        actionsCell.innerHTML = '<button onclick="editRow(this)">ALTERAR</button> <button onclick="deleteRow(this)">EXCLUIR</button>';
        
        // Limpa os campos após o cadastro
        document.getElementById('contaDescricao').value = '';
        document.getElementById('contaValor').value = '';
        document.getElementById('contaVencimento').value = '';
        document.getElementById('contaStatus').value = '';
        
        // Mantém a seção atual visível
        showSection('contasSection');
    }
}

// Função para adicionar dados à tabela de empresas
function addEmpresa() {
    const nome = document.getElementById('empresaNome').value;
    const cnpj = document.getElementById('empresaCnpj').value;
    const contato = document.getElementById('empresaContato').value;

    if (nome && cnpj && contato) {
        const table = document.getElementById('empresasTableBody');
        const row = table.insertRow();

        row.insertCell(0).textContent = nome;
        row.insertCell(1).textContent = cnpj;
        row.insertCell(2).textContent = contato;

        const actionsCell = row.insertCell(3);
        actionsCell.innerHTML = '<button onclick="editRow(this)">ALTERAR</button> <button onclick="deleteRow(this)">EXCLUIR</button>';
        
        // Limpa os campos após o cadastro
        document.getElementById('empresaNome').value = '';
        document.getElementById('empresaCnpj').value = '';
        document.getElementById('empresaContato').value = '';
        
        // Mantém a seção atual visível
        showSection('empresasSection');
    }
}