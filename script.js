document.addEventListener('DOMContentLoaded', () => {
    loadFromStorage();

    document.getElementById('maquinaForm').addEventListener('submit', function(event) {
        event.preventDefault();
        addRow('maquinaList', this);
        saveToStorage();
    });

    // Função para adicionar uma linha na tabela
    function addRow(listId, form) {
        const tableBody = document.getElementById(listId).querySelector('tbody');
        const newRow = document.createElement('tr');
        for (let i = 0; i < form.elements.length; i++) {
            const newCell = document.createElement('td');
            newCell.textContent = form.elements[i].value;
            newRow.appendChild(newCell);
        }
        const actionCell = document.createElement('td');
        actionCell.innerHTML = `<button onclick="editRow(this)">Alterar</button> <button onclick="deleteRow(this)">Excluir</button>`;
        newRow.appendChild(actionCell);
        tableBody.appendChild(newRow);
        form.reset();
    }

    // Função para salvar dados no local storage
    function saveToStorage() {
        const maquinas = [];
        const rows = document.getElementById('maquinaList').querySelectorAll('tbody tr');
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            maquinas.push({
                nome: cells[0].textContent,
                serie: cells[1].textContent,
                anos: cells[2].textContent,
                horas: cells[3].textContent
            });
        });
        localStorage.setItem('maquinas', JSON.stringify(maquinas));
    }

    // Função para carregar os dados do local storage
    function loadFromStorage() {
        const maquinas = JSON.parse(localStorage.getItem('maquinas')) || [];
        const tableBody = document.getElementById('maquinaList').querySelector('tbody');
        maquinas.forEach(maquina => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${maquina.nome}</td>
                <td>${maquina.serie}</td>
                <td>${maquina.anos}</td>
                <td>${maquina.horas}</td>
                <td>
                    <button onclick="editRow(this)">Alterar</button>
                    <button onclick="deleteRow(this)">Excluir</button>
                </td>
            `;
            tableBody.appendChild(newRow);
        });
    }

    // Funções de editar, salvar e excluir linha
    window.editRow = function(button) {
        const row = button.parentNode.parentNode;
        const cells = row.querySelectorAll('td');
        for (let i = 0; i < cells.length - 1; i++) {
            const input = document.createElement('input');
            input.value = cells[i].textContent;
            cells[i].innerHTML = '';
            cells[i].appendChild(input);
        }
        button.textContent = 'Salvar';
        button.setAttribute('onclick', 'saveRow(this)');
    }

    window.saveRow = function(button) {
        const row = button.parentNode.parentNode;
        const cells = row.querySelectorAll('td');
        for (let i = 0; i < cells.length - 1; i++) {
            cells[i].textContent = cells[i].querySelector('input').value;
        }
        button.textContent = 'Alterar';
        button.setAttribute('onclick', 'editRow(this)');
        saveToStorage();
    }

    window.deleteRow = function(button) {
        const row = button.parentNode.parentNode;
        row.parentNode.removeChild(row);
        saveToStorage();
    }

    window.showSection = function(sectionId) {
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => section.style.display = 'none');
        document.getElementById(sectionId).style.display = 'block';
    }
});