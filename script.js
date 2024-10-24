// Função para renderizar os itens armazenados no localStorage
function renderItems(listId, items, nameField, otherFields, key) {
    const listContainer = document.getElementById(listId);
    listContainer.innerHTML = '';
    items.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');
        
        const button = document.createElement('button');
        button.textContent = item[nameField];  // Nome do primeiro campo
        
        const infoDiv = document.createElement('div');
        otherFields.forEach(field => {
            const p = document.createElement('p');
            p.innerHTML = `<span>${field.replace(/([A-Z])/g, ' $1').trim()}</span>: ${item[field]}`;
            infoDiv.appendChild(p);
        });

        const alterarBtn = document.createElement('button');
        alterarBtn.textContent = 'Alterar';
        alterarBtn.addEventListener('click', () => alterarItem(key, index));

        const excluirBtn = document.createElement('button');
        excluirBtn.textContent = 'Excluir';
        excluirBtn.addEventListener('click', () => excluirItem(key, index));

        itemDiv.appendChild(button);
        itemDiv.appendChild(infoDiv);
        itemDiv.appendChild(alterarBtn);
        itemDiv.appendChild(excluirBtn);

        listContainer.appendChild(itemDiv);
    });
}

// Funções de adicionar, alterar e excluir (similares para cada sessão)
document.getElementById('confirmarMaquina').addEventListener('click', () => {
    const nomeMaquina = document.getElementById('nomeMaquina').value;
    const serieMaquina = document.getElementById('serieMaquina').value;
    const anosUsoMaquina = document.getElementById('anosUsoMaquina').value;
    
    const maquinas = JSON.parse(localStorage.getItem('maquinas')) || [];
    maquinas.push({ nomeMaquina, serieMaquina, anosUsoMaquina });
    localStorage.setItem('maquinas', JSON.stringify(maquinas));

    renderItems('maquinasList', maquinas, 'nomeMaquina', ['serieMaquina', 'anosUsoMaquina'], 'maquinas');
});

function excluirItem(key, index) {
    const items = JSON.parse(localStorage.getItem(key));
    items.splice(index, 1);
    localStorage.setItem(key, JSON.stringify(items));
    renderItems(`${key}List`, items, key === 'maquinas' ? 'nomeMaquina' : 'nomeConta', ['serieMaquina', 'anosUsoMaquina'], key);
}

function alterarItem(key, index) {
    // Função para alterar item, abre campos editáveis
}

// Carregar itens do localStorage ao iniciar
document.addEventListener('DOMContentLoaded', () => {
    ['maquinas', 'contas', 'recebimentos', 'contratos', 'empresas'].forEach(key => {
        const listId = key + 'List';
        const nameField = key === 'maquinas' ? 'nomeMaquina' :
                         key === 'contas' ? 'nomeConta' :
                         key === 'recebimentos' ? 'descricaoRecebimento' :
                         key === 'contratos' ? 'nomeContrato' : 'nomeEmpresa';
        const otherFields = key === 'maquinas' ? ['serieMaquina', 'anosUsoMaquina'] :
                             key === 'contas' ? ['saldoConta'] :
                             key === 'recebimentos' ? ['valorRecebimento'] :
                             key === 'contratos' ? ['valorContrato'] : ['cnpjEmpresa'];
        const items = JSON.parse(localStorage.getItem(key)) || [];
        renderItems(listId, items, nameField, otherFields, key);
    });
});