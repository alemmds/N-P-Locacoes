function showList(type) {
    let list = [];
    let listElementId = '';

    switch (type) {
        case 'maquinas':
            list = maquinas;
            listElementId = 'maquinasList';
            break;
        case 'recebimentos':
            list = recebimentos;
            listElementId = 'recebimentosList';
            break;
        case 'contratos':
            list = contratos;
            listElementId = 'contratosList';
            break;
        case 'contas':
            list = contas;
            listElementId = 'contasList';
            break;
        case 'empresas':
            list = empresas;
            listElementId = 'empresasList';
            break;
    }

    const listElement = document.getElementById(listElementId);
    listElement.innerHTML = '';

    if (list.length === 0) {
        listElement.innerHTML = 'Nenhum item cadastrado.';
        return;
    }

    // Criar tabela
    const table = document.createElement('table');
    const header = document.createElement('thead');
    const headerRow = document.createElement('tr');

    // Definir os cabeçalhos conforme o tipo de lista
    let headers = [];

    switch (type) {
        case 'maquinas':
            headers = ['Nome', 'Série', 'Anos de Uso', 'Horas Trabalhadas', 'Ações'];
            break;
        case 'recebimentos':
            headers = ['Empresa', 'Valor', 'Pagamento', 'Término', 'Status', 'Ações'];
            break;
        case 'contratos':
            headers = ['Empresa', 'Locatário', 'CNPJ', 'Representante', 'Período', 'Equipamento', 'Data Término', 'Operador', 'Ações'];
            break;
        case 'contas':
            headers = ['Tipo', 'Vencimento', 'Valor', 'Ações'];
            break;
        case 'empresas':
            headers = ['Nome', 'Área CNPJ', 'Área de Atuação', 'Representante', 'Telefone', 'Email', 'Ações'];
            break;
    }

    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    header.appendChild(headerRow);
    table.appendChild(header);

    const tbody = document.createElement('tbody');

    // Preencher as linhas da tabela com os dados
    list.forEach((item, index) => {
        const row = document.createElement('tr');

        // Adicionar células com os dados de cada item
        Object.values(item).forEach(value => {
            const cell = document.createElement('td');
            cell.textContent = value;
            row.appendChild(cell);
        });

        // Células de ações (alterar/excluir)
        const actionsCell = document.createElement('td');
        actionsCell.appendChild(createButton('Alterar', () => editItem(type, index)));
        actionsCell.appendChild(createButton('Excluir', () => deleteItem(type, index)));
        row.appendChild(actionsCell);

        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    listElement.appendChild(table);
}

function createButton(text, onClick) {
    const button = document.createElement('button');
    button.innerText = text;
    button.onclick = onClick;
    return button;
}