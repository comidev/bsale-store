const Shopping = (nombre, precio, cantidad) => {
    return `
    <tr>
        <td class="tabla_nombre">${nombre}</td>
        <td class="tabla_precio">$ ${precio}</td>
        <td class="tabla_cantidad">${cantidad}</td>
    </tr>
    `;
};

const ListShopping = (listShopping) =>
    listShopping
        .map((item) => Shopping(item.nombre, item.precio, item.cantidad))
        .join("");
