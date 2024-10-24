document.addEventListener("DOMContentLoaded", function() {
    const forms = {
        maquinas: document.getElementById("form-maquinas"),
        contas: document.getElementById("form-contas"),
        recebimentos: document.getElementById("form-recebimentos"),
        contratos: document.getElementById("form-contratos"),
        empresas: document.getElementById("form-empresas"),
    };

    const listas = {
        maquinas: document.getElementById("lista-maquinas"),
        contas: document.getElementById("lista-contas"),
        recebimentos: document.getElementById("lista-recebimentos"),
        contratos: document.getElementById("lista-contratos"),
        empresas: document.getElementById("lista-empresas"),
    };

    Object.keys(forms).forEach(key => {
        const form = forms[key];
        form.addEventListener("submit", function(event) {
            event.preventDefault();
            const data = new FormData(form);
            const obj = {};
            data.forEach((value, key) => {
                obj[key] = value;
            });

            const json = JSON.stringify(obj);
            localStorage.setItem(key, json);
            renderList(key, json);
            form.reset();
        });

        const storedData = localStorage.getItem(key);
        if (storedData) {
            renderList(key, storedData);
        }
    });

    function renderList(key, data) {
        const obj = JSON.parse(data);
        const div = document.createElement("div");
        div.classList.add("card");
        Object.keys(obj).forEach(k => {
            const p = document.createElement("p");
            p.textContent = `${k}: ${obj[k]}`;
            div.appendChild(p);
        });
        const btnAlterar = document.createElement("button");
        btnAlterar.textContent = "Alterar";
        btnAlterar.addEventListener("click", function() {
            const form = forms[key];
            Object.keys(obj).forEach(k => {
                form.elements[k].value = obj[k];
            });
        });
        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";
        btnExcluir.addEventListener("click", function() {
            localStorage.removeItem(key);
            listas[key].removeChild(div);
        });

        div.appendChild(btnAlterar);
        div.appendChild(btnExcluir);
        listas[key].appendChild(div);
    }
});