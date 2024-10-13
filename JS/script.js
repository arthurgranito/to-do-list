const inputTarefa = document.getElementById('tarefa');
const form = document.getElementById('form');
const divTarefas = document.getElementById('tarefas');

const tarefas = [];

class Tarefa{
    constructor(tarefa, concluida){
        this.tarefa = tarefa;
        this.concluida = concluida;
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (inputTarefa.value == '') {
        alert('Preencha com sua tarefa');
    } else {
        const tarefa = new Tarefa(inputTarefa.value, false);
        tarefas.push(tarefa);

        atualizarTarefas();
    }
})

const atualizarTarefas = () => {
    divTarefas.innerHTML = '';
    divTarefas.classList.remove('hidden');
    tarefas.forEach((tarefa, index) => {
        const div = document.createElement('div');
        div.className = 'tarefa';

        const buttonCheck = document.createElement('button');
        buttonCheck.classList.add('check');
        const iCheck = document.createElement('i');
        iCheck.className = 'fa-solid fa-check';
        buttonCheck.appendChild(iCheck);

        buttonCheck.addEventListener('click', () => {
            concluirTarefa(index);
        })

        const p = document.createElement('p');
        p.innerText = `${tarefa.tarefa}`;
 
        if(tarefa.concluida == true){
            div.style.backgroundColor = 'rgb(112, 247, 112)';
            p.style.color = 'white';
            p.style.textDecoration = 'line-through';
        }

        const buttonTrash = document.createElement('button');
        buttonTrash.classList.add('trash');
        const iTrash = document.createElement('i');
        iTrash.className = 'fa-solid fa-trash';
        buttonTrash.appendChild(iTrash);
        buttonTrash.id = index;

        buttonTrash.addEventListener('click', () => {
            deletarTarefa(buttonTrash.id);
        })

        div.appendChild(buttonCheck);
        div.appendChild(p);
        div.appendChild(buttonTrash);

        divTarefas.appendChild(div);

        inputTarefa.value = '';
    })

    localStorage.setItem('lista', JSON.stringify(tarefas));
}

const deletarTarefa = (id) => {
    tarefas.splice(id, 1);
    atualizarTarefas();
    if (tarefas.length == 0) {
        divTarefas.classList.add('hidden');
    }
}

const concluirTarefa = (id) => {
    const tarefa = tarefas[id];
    tarefa.concluida = !tarefa.concluida;

    atualizarTarefas();
}

const recarregarTela = () => {
    const tarefasSalvas = JSON.parse(localStorage.getItem('lista'));
    if(tarefasSalvas.length == 0){
        return;
    } else{
        tarefasSalvas.forEach(tarefa => {
            tarefas.push(tarefa);
        })
        atualizarTarefas();
    }
}

recarregarTela();

