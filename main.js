const listaDeItens = JSON.parse(localStorage.getItem("listaDeItens")) || [];

const formulario = document.querySelector("[data-formulario]");
const itensInput = document.querySelector("#receber-itens");

formulario.addEventListener("submit", event => {
    event.preventDefault();
    salvarItem();
    // mostrarItem();
    itensInput.focus();
});

function salvarItem() {
    const comprasItem = itensInput.value;
    console.log(comprasItem);
}