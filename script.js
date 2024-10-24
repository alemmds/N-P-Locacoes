// Função para adicionar itens ao localStorage
function addToLocalStorage(key, item) {
    const items = JSON.parse(localStorage.getItem(key)) || [];
    items.push(item);
    localStorage.setItem(key, JSON.stringify(items));
}

// Função para renderizar itens
function renderItems(listId, items, nameField, otherFields) {
    const listElement = document.getElementById(listId);
    listElement.innerHTML = '';

    items.forEach((item, index) => {
        const button = document.createElement('div');
        button.className = 'item-button';
        button.innerText = item[nameField];

        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'item-buttons';

        const alterButton = document.createElement('button');
        alterButton.innerText = 'Alterar';
        alterButton.onclick = () => {
            // Lógica para alterar o item
            alert(`Alterar: ${item[nameField]}`);
        };

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Excluir';
        deleteButton.onclick = () => {
            // Lógica para excluir o item
            alert(`Excluir: ${item[nameField]}`);
            items.splice(index, 1);
            localStorage.setItem(listId.replace('List', ''), JSON.stringify(items));
            renderItems(listId, items, nameField, otherFields);
        };

        buttonsDiv.appendChild(alterButton);
        buttonsDiv.appendChild(deleteButton);
        button.appendChild(buttonsDiv);
        listElement.appendChild(button);
    });
}

// Carregar itens do localStorage ao iniciar
document.addEventListener('DOMContentLoaded', () => {
    ['maquinas', 'contas', 'recebimentos', 'contratos', 'empresas'].forEach(key => {
        const listId = key + 'List';
        const nameField = key === 'maquinas' ? 'nomeMaquina' :
                          key === 'contas' ? 'tipoConta' :
                          key === 'recebimentos' ? 'empresaRecebimento' :
                          key === 'contratos' ? 'nomeContrato' : 'nomeEmpresa';
        const otherFields = key === 'maquinas' ? ['serieMaquina', 'anosUsoMaquina'] :
                            key === 'contas' ? ['saldoConta'] :
                            key === 'recebimentos' ? ['valorRecebimento', 'dataRecebimento'] :
                            key === 'contratos' ? ['locatarioContrato', 'valorContrato'] :
                            ['cnpjEmpresa', 'enderecoEmpresa'];

        const storedItems = JSON.parse(localStorage.getItem(key)) || [];
        renderItems(listId, storedItems, nameField, otherFields);
    });

    // Eventos de cadastro
    document.getElementById('confirmarMaquina').onclick = () => {
        const newItem = {
            nomeMaquina: document.getElementById('nomeMaquina').value,
            serieMaquina: document.getElementById('serieMaquina').value,
            anosUsoMaquina: document.getElementById('anosUsoMaquina').value
        };
        addToLocalStorage('maquinas', newItem);
        renderItems('maquinasList', JSON.parse(localStorage.getItem('maquinas')), 'nomeMaquina');
        document.getElementById('form-maquinas').reset();
    };

    document.getElementById('confirmarConta').onclick = () => {
        const newItem = {
            tipoConta: document.getElementById('tipoConta').value,
            saldoConta: document.getElementById('saldoConta').value
        };
        addToLocalStorage('contas', newItem);
        renderItems('contasList', JSON.parse(localStorage.getItem('contas')), 'tipoConta');
        document.getElementById('form-contas').reset();
    };

    document.getElementById('confirmarRecebimento').onclick = () => {
        const newItem = {
            empresaRecebimento: document.getElementById('empresaRecebimento').value,
            valorRecebimento: document.getElementById('valorRecebimento').value,
            dataRecebimento: document.getElementById('dataRecebimento').value
        };
        addToLocalStorage('recebimentos', newItem);
        renderItems('recebimentosList', JSON.parse(localStorage.getItem('recebimentos')), 'empresaRecebimento');
        document.getElementById('form-recebimentos').reset();
    };

    document.getElementById('confirmarContrato').onclick = () => {
        const newItem = {
            nomeContrato: document.getElementById('nomeContrato').value,
            locatarioContrato: document.getElementById('locatarioContrato').value,
            valorContrato: document.getElementById('valorContrato').value
        };
        addToLocalStorage('contratos', newItem);
        renderItems('contratosList', JSON.parse(localStorage.getItem('contratos')), 'nomeContrato');
        document.getElementById('form-contratos').reset();
    };

    document.getElementById('confirmarEmpresa').onclick = () => {
        const newItem = {
            nomeEmpresa: document.getElementById('nomeEmpresa').value,
            cnpjEmpresa: document.getElementById('cnpjEmpresa').value,
            enderecoEmpresa: document.getElementById('enderecoEmpresa').value
        };
        addToLocalStorage('empresas', newItem);
        renderItems('empresasList', JSON.parse(localStorage.getItem('empresas')), 'nomeEmpresa');
        document.getElementById('form-empresas').reset();
    };
});