document.addEventListener('DOMContentLoaded', () => {
    const sections = ['maquinas', 'contas'];

    sections.forEach(section => {
        loadFromLocalStorage(section);
    });

    document.getElementById('confirmarMaquina').onclick = () => {
        const newItem = {
            nomeMaquina: document.getElementById('nomeMaquina').value,
            serieMaquina: document.getElementById('serieMaquina').value,
            anosUsoMaquina: document.getElementById('anosUsoMaquina').value,
            horimetroMaquina: document.getElementById('horimetroMaquina').value,
            ultimaManutencaoMaquina: document.getElementById('ultimaManutencaoMaquina').value,
            dataEntradaMaquina: document.getElementById('dataEntradaMaquina').value
        };
        saveToLocalStorage('maquinas', newItem);
        loadFromLocalStorage('maquinas');
        document.getElementById('form-maquinas').reset();
    };

    document.getElementById('confirmarConta').onclick = () => {
        const newItem = {
            tipoConta: document.getElementById('tipoConta').value,
            dataEmissaoConta: document.getElementById('dataEmissaoConta').value,
            dataVencimentoConta: document.getElementById('dataVencimentoConta').value,
            valorConta: document.getElementById('valorConta').value
        };
        saveToLocalStorage('contas', newItem);
        loadFromLocalStorage('contas');
        document.getElementById('form-contas').reset();
    };

    function saveToLocalStorage(key, newItem) {
        const items = JSON.parse(localStorage.getItem(key)) || [];
        items.push(newItem);
        localStorage.setItem(key, JSON.stringify(items));
    }

    function loadFromLocalStorage(key) {
        const items = JSON.parse(localStorage.getItem(key)) || [];
        const listId = key + 'List';
        renderItems(listId, items, key);
    }

    function renderItems(listId, items, section) {
        const list = document.getElementById(listId);
        list.innerHTML = '';

        items.forEach((item, index) => {
            const button = document.createElement('button');
            button.innerText = item[Object.keys(item)[0]];
            button.onclick = () => toggleDetails(index, section);

            const detailsDiv = document.createElement('div');
            detailsDiv.style.display = 'none';

            Object.keys(item).forEach(field => {
                const fieldInfo = document.createElement('p');
                fieldInfo.innerText = `${field.replace(/([A-Z])/g, ' $1')}: ${item[field]}`;
                detailsDiv.appendChild(fieldInfo);
            });

            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Excluir';
            deleteButton.onclick = () => removeItem(section, index);

            const editButton = document.createElement('button');
            editButton.innerText = 'Alterar';
            editButton.onclick = () => editItem(section, index);

            list.appendChild(button);
            list.appendChild(detailsDiv);
            list.appendChild(deleteButton);
            list.appendChild(editButton);
        });
    }

    function toggleDetails(index, section) {
        const details = document.querySelectorAll(`#${section}List div`)[index];
        details.style.display = details.style.display === 'none' ? 'block' : 'none';
    }

    function removeItem(section, index) {
        const items = JSON.parse(localStorage.getItem(section)) || [];
        items.splice(index, 1);
        localStorage.setItem(section, JSON.stringify(items));
        loadFromLocalStorage(section);
    }

    function editItem(section, index) {
        const items = JSON.parse(localStorage.getItem(section)) || [];
        const item = items[index];
        Object.keys(item).forEach(field => {
            document.getElementById(field).value = item[field];
        });

        document.getElementById(`confirmar${capitalizeFirstLetter(section)}`).onclick = () => {
            items[index] = {};
            Object.keys(item).forEach(field => {
                items[index][field] = document.getElementById(field).value;
            });
            localStorage.setItem(section, JSON.stringify(items));
            loadFromLocalStorage(section);
            document.getElementById(`form-${section}`).reset();
        };
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
});