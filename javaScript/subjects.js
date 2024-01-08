//Passo 1: Selecionar os elementos HTML necessários
const subjectModal = document.querySelector('#subject-modal');
const subjectTable = document.querySelector('#subject-table');
const subjectForm = document.querySelector('#subject-form');
const subjectModalTitle = document.querySelector('#subject-modal-title');
const saveSubjectButton = document.querySelector('#save-subject');

//Passo 2: Definir função para abrir modal da disciplina
const openSubjectModal = () => subjectModal.showModal();
const createSubject = () => {
    subjectModalTitle.innerHTML = `Nova disciplina`;
    saveSubjectButton.innerHTML = `Criar`;
    openSubjectModal();
    saveSubjectData(`${baseUrl}/disciplinas`, "POST");
}

//Passo 3: Definir função para fechar modal da disciplina
const closeSubjectModal = () => subjectModal.close();

//Passo 4: Criar colunas na tabela da disciplina
const createSubjectCardColumn = (id, disciplina, cargaHoraria, professor, status, observacoes) => {
    const tableColumn = document.createElement("div");
    if(status === 'Opcional') {
        tableColumn.innerHTML = 
    `<div class="subject-card">
            <h3 class="subject-card__title">${disciplina}</h3>
            <hr />
            <ul class="subject-card__list">
                <li>Carga horária: ${cargaHoraria} horas</li>
                <li>Professor: ${professor}</li>
                <li>Status <span class="tag tag--success">${status}</span></li>
            </ul>
            <p class="max-lines">${observacoes}</p>
            <div class="subject-button">
                <button class="button button--danger" onclick="deleteSubjectCard(${id})">Apagar</button>
                <button class="button button--success" onclick="editSubjectModal(${id})">Editar</button>
            </div>        
    </div>`
    } else {
        tableColumn.innerHTML = 
    `<div class="subject-card">
            <h3 class="subject-card__title">${disciplina}</h3>
            <hr />
            <ul class="subject-card__list">
                <li>Carga horária: ${cargaHoraria} horas</li>
                <li>Professor: ${professor}</li>
                <li>Status <span class="tag tag--danger">${status}</span></li>
            </ul>
            <p class="max-lines">${observacoes}</p>
            <div class="subject-button">
                <button class="button button--danger" onclick="deleteSubjectCard(${id})">Apagar</button>
                <button class="button button--success" onclick="editSubjectModal(${id})">Editar</button>
            </div>        
    </div>`
    }
    subjectTable.appendChild(tableColumn);

    // Verificar o número de elementos já adicionados 
    const elementsCount = document.querySelectorAll('.subject-list').length;
    
    // Adicionar quebra de linha após cada terceiro elemento
    if (elementsCount % 3 === 0) {
        const lineBreak = document.createElement('br');
        subjectTable.appendChild(lineBreak);
    }
}

//Passo 5: salvar os dados do formulário de disciplina

const saveSubjectData = (url, method) => {
    subjectForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(subjectForm);
        const payload = new URLSearchParams(formData);
        fetch(url, {
            method: method,
            body: payload,
        }).catch((error) => {
            closeSubjectModal();
            alert("Ocorreu um erro. Tente mais tarde.");
            console.error(error);
        });
    });
}

//Excluir disciplina
const deleteSubjectCard = (id) => {
    fetch(`${baseUrl}/disciplinas/${id}`, {
        method: "DELETE",
    }).catch((error) => {
        alert("Ocorreu um erro. Tente mais tarde.");
        console.error(error);
    });
};

//Abrir o modal de edição da disciplina
const editSubjectModal = (id) => {
    fetch(`${baseUrl}/disciplinas/${id}`)
    .then((resp) => resp.json())
    .then((data) => {
        const {disciplina, cargaHoraria, professor, status, observacoes} = data;
        subjectModalTitle.innerHTML = `Editar disciplina ${disciplina}`;
        document.querySelector('#disciplina').value = disciplina;
        document.querySelector('#cargaHoraria').value = cargaHoraria;
        document.querySelector('#professor').value = professor;
        document.querySelector('#status').value = status;
        document.querySelector('#observacoes').value = observacoes;
        saveSubjectButton.innerHTML = 'Salvar';
        openSubjectModal();
        saveSubjectData(`${baseUrl}/disciplinas/${id}`, "PUT");
    })
    .catch((error) => {
        alert("Ocorreu um erro. Tente mais tarde.");
        console.error(error);
    });
};

//Chamar função para carregar os dados iniciais dos cards ao carregar a página
const loadSubjectCard = () => {
    fetch(`${baseUrl}/disciplinas`)
    .then((resp) => resp.json())
    .then((data) => {
        data.forEach((subject) => {
            createSubjectCardColumn(
                subject.id,
                subject.disciplina,
                subject.cargaHoraria,
                subject.professor,
                subject.status,
                subject.observacoes
            );
        });
    })
    .catch((error) => {
        alert("Ocorreu um erro. Tente mais tarde.");
        console.error(error);
    });
};

loadSubjectCard();
