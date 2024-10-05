const tarefaInput = document.getElementById('tarefa');
const form = document.getElementById('form');
const listaFinal = document.getElementById('lista');

const lista = [];

class Tarefa {
    constructor(tarefa, concluida){
        this.tarefa = tarefa;
        this.concluida = concluida;
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(tarefaInput.value == ''){
        alert('Preencha com sua tarefa');
    } else{
        const tarefa = new Tarefa(tarefaInput.value, false);
        lista.push(tarefa);
        listaFinal.innerHTML = '';
        atualizarLista();
        tarefaInput.value = '';
    }
})

const atualizarLista = () => {
    lista.forEach((tarefa, index) => {
        const div = document.createElement('div');
        div.classList.add('tarefa');
        if(tarefa.concluida == true){
            div.classList.add('concluida');
        } else{
            div.classList.remove('concluida');
        }
        const buttonCheck = document.createElement('button');
        buttonCheck.classList.add('check');
        const iCheck = document.createElement('i');
        iCheck.classList.add('fa-solid');
        iCheck.classList.add('fa-check');
        const p = document.createElement('p');
        const buttonTrash = document.createElement('button');
        buttonTrash.classList.add('trash');
        const iTrash = document.createElement('i');
        iTrash.classList.add('fa-solid');
        iTrash.classList.add('fa-trash');

        buttonTrash.addEventListener('click', () => {
            apagarTarefa(index);
        })

        buttonCheck.addEventListener('click', () => {
            concluirTarefa(index);
        })

        buttonCheck.appendChild(iCheck);
        buttonTrash.appendChild(iTrash);
        p.innerText = tarefa.tarefa;
        div.appendChild(buttonCheck);
        div.appendChild(p);
        div.appendChild(buttonTrash);
        listaFinal.appendChild(div);
    })

    localStorage.setItem('lista', JSON.stringify(lista));
}

const recarregarTela = () => {
    const tarefasLocalStorage = JSON.parse(localStorage.getItem('lista'));
    tarefasLocalStorage.forEach(tarefa => {
        lista.push(tarefa);
    })
    
    atualizarLista();
}

const apagarTarefa = (index) => {
    lista.splice(index, 1);
    listaFinal.innerHTML = '';
    atualizarLista();
}

const concluirTarefa = (index) => {
    lista[index].concluida = !lista[index].concluida;
    listaFinal.innerHTML = '';
    atualizarLista();
}

recarregarTela();