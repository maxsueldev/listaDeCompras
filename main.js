const listaDeItens = JSON.parse(localStorage.getItem("listaDeItens")) || [];

const formulario = document.querySelector("[data-formulario]");
const itensInput = document.querySelector("#receber-itens");
const ulItens = document.querySelector('.ul-lista-compras');
const ulComprados = document.querySelector('.ul-comprados');

let itemAEditar;

mostrarItem();

formulario.addEventListener("submit", event => {
    event.preventDefault();
    salvarItem();
    mostrarItem();
    itensInput.focus();
});

function atualizarLocalStorage() {
    localStorage.setItem('listaDeItens', JSON.stringify(listaDeItens));
}

function salvarItem() {
    const comprasItem = itensInput.value;
    const checarDuplicado = listaDeItens.some(element => element.valor.toUpperCase() === comprasItem.toUpperCase());
    
    if(checarDuplicado) {
        alert('Esse item já existe cadastrado');
    } else {
        const novoItem = {
            valor: comprasItem,
            checar: false
            
        }
        
        listaDeItens.push(novoItem);
    }
    
    itensInput.value = '';
}

function mostrarItem() {
    ulItens.innerHTML = '';
    ulComprados.innerHTML = '';

    listaDeItens.forEach((item, index) => {
        if(item.checar) {
            ulComprados.innerHTML += `
            <li data-value=${index}>
                <div>
                    <input type="checkbox" checked>
                    <span class="elemento-item-comprado">${item.valor}</span>
                </div>
                <div>
                    <i class="fa-solid fa-trash deletar"></i>   
                </div>
            </li>
            `;
        } else {
            ulItens.innerHTML += `
            <li data-value=${index}>
                <div>
                    <input type="checkbox">
                    <input type="text" value="${item.valor}" ${index !== Number(itemAEditar) ? 'disabled' : ''}>
                </div>
                <div>
                    ${index === Number(itemAEditar) ? '<button onclick="atualizarItem()"><i class="fa-regular fa-floppy-disk"></i></button>' : '<i class="fa-regular fa-pen-to-square editar"></i>'}
                    <i class="fa-solid fa-trash deletar"></i>
                </div>
            </li>
            `
        }

        const itensChecar = document.querySelectorAll('input[type="checkbox"]');
        itensChecar.forEach(i => {
            i.addEventListener('click', event => {
                valorElemento = event.target.parentElement.parentElement.getAttribute('data-value');
                listaDeItens[valorElemento].checar = event.target.checked;
                mostrarItem();
            })
        });

        const itensDeletar = document.querySelectorAll('.deletar');
        itensDeletar.forEach(i => {
            i.addEventListener('click', event => {
                valorElemento = event.target.parentElement.parentElement.getAttribute('data-value');
                listaDeItens.splice(valorElemento, 1);
                mostrarItem();
            })
        });

        const itensEditar = document.querySelectorAll('.editar');
        itensEditar.forEach(i => {
            i.addEventListener('click', event => {
                itemAEditar = event.target.parentElement.parentElement.getAttribute('data-value');
                mostrarItem();
            });
        });
    });

    atualizarLocalStorage();
}

function atualizarItem() {
    const itemEditado = document.querySelector(`[data-value="${itemAEditar}"] input[type="text"]`);
    listaDeItens[itemAEditar].valor = itemEditado.value;
    itemAEditar = -1;
    mostrarItem();
}