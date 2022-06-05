const PaginaButton = (numPage) => {
    return `
    <li><button class="paginacion_btn">${numPage + 1}</button></li>
    `;
};

const PaginaButtons = (totalItems) => {
    let paginaButtons = "";
    for (let index = 0; index < totalItems; index++) {
        paginaButtons += PaginaButton(index);
    }
    return paginaButtons;
};
