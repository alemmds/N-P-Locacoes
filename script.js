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
    }
}

// Função para adicionar dados a tabela de empresas
function addEmpresa() {
    const nome = document.getElementById('empresaNome').value;
    const cnpj = document.getElementById('empresaCNPJ').value;
    const areaAtuacao = document.getElementById('empresaAtuacao').value;
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
    }
}

// Função para editar uma linha
function editRow(button) {
    const row = button.closest('tr');
    const cells = row.getElementsByTagName('td');

    // Aqui você pode acessar e editar as células da linha, ex:
    cells[0].textContent = prompt('Novo valor para o campo 1', cells[0].textContent);
    cells[1].textContent = prompt('Novo valor para o campo 2', cells[1].textContent);
    // Continue para as outras células conforme necessário
}

// Função para excluir uma linha
function deleteRow(button) {
    const row = button.closest('tr');
    row.remove();
}