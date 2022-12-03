// studentModal.open = true
// studentModal.open = false

// studentModal.setAttribute('open', true)
// studentModal.setAttribute('open', false) //nao funcion
// studentModal.removeAttribute('open')

// studentModal.showModal()
// studentModal.close()

const studentModal = document.querySelector('#student-modal')
const openStudentModal = () => studentModal.showModal();
const closeStudentModal = () => studentModal.close();

const studentForm = document.querySelector('#student-form');

// console.log('studentForm', studentForm)

studentForm.addEventListener('submit', (event)=> {
    event.preventDefault();
    const formData = new FormData(studentForm);
    const payload = new URLSearchParams(formData)
    fetch('http://localhost:3000/alunos', {
        method: 'POST',
        body: payload
    })
    .catch(error => {
        closeStudentModal();
        alert('ocorreu um erro tente mais tarde')
        console.error(error);
    })
    // const inputs = document.querySelectorAll('input')
    // console.log(inputs[0].value)
    // console.log(inputs[1].value)
})


const createStudentTableRow = (nome, matricula, curso, id) => {
  const studentTable = document.querySelector('#student-table tbody')
  const tableTr = document.createElement('tr');
  tableTr.innerHTML = ` 
  <td>${nome}</td>
  <td>${matricula}</td>
  <td>${curso}</td>
  <td align="center">
    <button class="button button--danger" onclick=deleteStudentTable(${id})>Apagar</button>
    <button class="button button--success" onclick="editdStudentTable(${id})">Editar</button>
  </td>`
  studentTable.appendChild(tableTr)
}

 const editdStudentTable = async (studentId)  => {
  openStudentModal()
  const [name, matricula] = document.querySelectorAll('input');
  const selectCurso =  document.querySelector("#curso")
  fetch(`http://localhost:3000/alunos/${studentId}`)
  .then(resp => resp.json())
  .then(data => {
    name.value = data.nome
    matricula.value = data.matricula
    selectCurso.value =  data.curso
  })
 }

 const deleteStudentTable = async (studentId)  => {
  fetch(`http://localhost:3000/alunos/${studentId}`, {method : 'DELETE'})
 }
 
 

const loadStudentTable = () => {
  fetch('http://localhost:3000/alunos')
  .then(resp => resp.json())
  .then(data => {
    data.forEach(item => {
      createStudentTableRow(item.nome, item.matricula, item.curso, item.id)
    })
  }).catch((error) => {
    alert('ocorreu um erro tente mais tarde')
    console.error(error);
  })
}

loadStudentTable()





