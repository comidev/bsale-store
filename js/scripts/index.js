const btnsFilters = document.querySelectorAll(".btn_filter");
const btnsClose = document.querySelectorAll(".btn_close");
const listFilter = document.querySelectorAll(".list_filter");

btnsFilters.forEach((btnFilter, index) => {
    btnFilter.addEventListener("click", () => {
        listFilter.forEach((listFilter) => {
            listFilter.style.display = "none";
        });
        listFilter[index].style.display = "block";
    });
});

btnsClose.forEach((btnClose, index) => {
    btnClose.addEventListener("click", () => {
        listFilter[index].style.display = "none";
    });
});

const listFilters = document.querySelector(".list_filters");
const btnFilter = document.querySelector(".btn-filtros");

btnFilter.addEventListener("click", () => {
    listFilters.classList.toggle("list_filters-opened");
});

const tablaHTML = document.querySelector(".tabla");
const btnCar = document.querySelector(".btn-car");

btnCar.addEventListener("click", () => {
    tablaHTML.classList.toggle("tabla-opened");
});

// ---------------------- API -------------------------
// Inicializamos la página
const cantidadHTML = document.getElementById("cantidad");
const productosHTML = document.querySelector(".productos");
const paginacionHTML = document.querySelector(".paginacion");

let pageNumberClient = 0;

const loadingResult = () => {
    productosHTML.innerHTML = `<div class="spinner" />`;
};

const loadingPage = () => {
    productosHTML.innerHTML = `<div class="spinner" />`;
    cantidadHTML.innerHTML = "";
    paginacionHTML.innerHTML = "";
    pageNumberClient = 0;
};

const precioTotal = document.getElementById("precio_total");
const tablaCuerpo = document.querySelector(".tabla_cuerpo");
const linkComprar = document.getElementById("comprar");
const textLinkComprar = linkComprar.href;
const listShopping = [];

const getTotal = () => {
    let total = 0;
    listShopping.forEach((item) => {
        total += item.precio * item.cantidad;
    });
    linkComprar.href =
        textLinkComprar +
        " " +
        listShopping
            .map(
                (item, index) =>
                    `(${index + 1}) Nombre: ${item.nombre}, cantidad : ${
                        item.cantidad
                    }, con un precio de $ ${item.precio}.`
            )
            .join(" | ") +
        ` Con un total de $ ${total}`;
    return total;
};

const initPagina = (totalPages, totalItems, apiFunction) => {
    cantidadHTML.innerHTML = `Resultados: ${totalItems}`;
    paginacionHTML.innerHTML = PaginaButtons(totalPages);

    const paginaBtns = document.querySelectorAll(".paginacion_btn");
    paginaBtns[pageNumberClient].classList.add("paginacion_btn-active");
    paginaBtns.forEach((paginaBtn, index) => {
        paginaBtn.addEventListener("click", () => {
            pageNumberClient = index;
            apiFunction(pageNumberClient);
            paginaBtns.forEach((item) =>
                item.classList.remove("paginacion_btn-active")
            );
            paginaBtns[pageNumberClient].classList.add("paginacion_btn-active");
        });
    });
};

const showProductResults = (items) => {
    productosHTML.innerHTML = Products(items);
    // CARRITO ------------------------------------------------------------------
    const inputsContador = document.querySelectorAll(".input-contador");
    const btnIncrements = document.querySelectorAll(".increment");
    const btnDecrements = document.querySelectorAll(".decrement");
    const btnsAgregar = document.querySelectorAll(".producto__form");

    btnIncrements.forEach((btnIncrement, index) => {
        btnIncrement.addEventListener("click", () => {
            inputsContador[index].value = Number(inputsContador[index].value) + 1;
        });
    });

    btnDecrements.forEach((btnDecrement, index) => {
        btnDecrement.addEventListener("click", () => {
            const value = Number(inputsContador[index].value);
            if (value > 0) {
                inputsContador[index].value = value - 1;
            }
        });
    });

    btnsAgregar.forEach((btnAgregar, index) => {
        btnAgregar.addEventListener("submit", (e) => {
            e.preventDefault();
            const id = btnAgregar.id;
            const productFind = listShopping.find((item) => item.id === id);
            const cantidad = Number(inputsContador[index].value);
            if (productFind) {
                if (cantidad > 0) {
                    // ACTUALIZA PRODUCTO --------------------------------
                    productFind.cantidad = cantidad;
                } else {
                    // ELIMINA PRODUCTO ----------------------------------
                    const indexRemove = listShopping.indexOf(productFind);
                    listShopping.splice(indexRemove, 1);
                }
            } else if (cantidad > 0) {
                // AGREGA PRODUCTO --------------------------------------
                const product = items.find((item) => item.id == id);
                listShopping.push({
                    id,
                    nombre: product.name,
                    precio: product.price * (1 - product.discount / 100),
                    cantidad,
                });
            }
            tablaCuerpo.innerHTML = ListShopping(listShopping);
            precioTotal.innerHTML = `$ ${getTotal()}`;
        });
    });
};

// DEFAULT ---------------------------------------------------------------------
loadingPage();
getProducts(pageNumberClient).then((res) => {
    const { items, totalPages, totalItems } = res;
    const btnPagina = (pageNumber) => {
        loadingResult();
        getProducts(pageNumber).then((res) => showProductResults(res.items));
    };
    initPagina(totalPages, totalItems, btnPagina);
    showProductResults(items);
});

// SIN FILTROS -----------------------------------------------------------------
const btnSinFiltros = document.querySelector(".btn_sin_filter");
btnSinFiltros.addEventListener("click", () => {
    loadingPage();
    getProducts(pageNumberClient).then((res) => {
        const { items, totalPages, totalItems } = res;
        const btnPagina = (pageNumber) => {
            loadingResult();
            getProducts(pageNumber).then((res) => showProductResults(res.items));
        };
        initPagina(totalPages, totalItems, btnPagina);
        showProductResults(items);
    });
});

// Poblamos los categorías -------------------------------------------------------
const categoriesHTML = document.getElementById("categories");
categoriesHTML.innerHTML = `<div class="spinner" />`;
getCategories().then((res) => {
    categoriesHTML.innerHTML = Categories(res);
    // AGREGAMOS EVENTOS
    const buttonsCategory = document.querySelectorAll(
        "#categories .btn_filter_item"
    );
    buttonsCategory.forEach((btnCategory) => {
        btnCategory.addEventListener("click", () => {
            const id = btnCategory.value;
            loadingPage();
            getProductByCategory(id, pageNumberClient).then((res) => {
                const { items, totalPages, totalItems } = res;
                const btnPagina = (pageNumber) => {
                    loadingResult();
                    getProductByCategory(id, pageNumber).then((res) =>
                        showProductResults(res.items)
                    );
                };
                initPagina(totalPages, totalItems, btnPagina);
                showProductResults(items);
            });
        });
    });
});

// Poblamos los precios ------------------------------------------------------------
const preciosHTML = document.getElementById("precios");
preciosHTML.innerHTML = `<div class="spinner" />`;
getPrecioMayor().then((res) => {
    preciosHTML.innerHTML = Prices(res);
    // AGREGAMOS EVENTOS --------------------------------
    const buttonsPrice = document.querySelectorAll("#precios .btn_filter_item");
    buttonsPrice.forEach((btnPrice) => {
        btnPrice.addEventListener("click", () => {
            const text = btnPrice.textContent.replace(" ", "").split("-");
            const min = text[0];
            const max = text[1];
            loadingPage();
            getProductsByPriceBetween(min, max, pageNumberClient).then((res) => {
                const { items, totalPages, totalItems } = res;
                const btnPagina = (pageNumber) => {
                    loadingResult();
                    getProductsByPriceBetween(min, max, pageNumber).then((res) =>
                        showProductResults(res.items)
                    );
                };
                initPagina(totalPages, totalItems, btnPagina);
                showProductResults(items);
            });
        });
    });
});

// Poblamos los descuentos -------------------------------------------------------
const descuentosHTML = document.getElementById("descuentos");
descuentosHTML.innerHTML = `<div class="spinner" />`;
getDescuentoMayor().then((res) => {
    descuentosHTML.innerHTML = Discounts(res);
    // AGREGAMOS EVENTOS --------------------------------
    const buttonsDiscount = document.querySelectorAll(
        "#descuentos .btn_filter_item"
    );
    buttonsDiscount.forEach((btnDiscount) => {
        btnDiscount.addEventListener("click", () => {
            const text = btnDiscount.textContent
                .replace(" ", "")
                .replace("%", "")
                .replace("%", "")
                .split("-");
            const min = text[0];
            const max = text[1];
            loadingPage();
            getProductsByDiscountBetween(min, max, pageNumberClient).then((res) => {
                const { items, totalPages, totalItems } = res;
                const btnPagina = (pageNumber) => {
                    loadingResult();
                    getProductsByDiscountBetween(min, max, pageNumber).then((res) =>
                        showProductResults(res.items)
                    );
                };
                initPagina(totalPages, totalItems, btnPagina);
                showProductResults(items);
            });
        });
    });
});

// AGREGAMOS EVENTOS A ORDENAR POR ----------------------------------------------
const buttonsSortBy = document.querySelectorAll("#ordenar_por .btn_filter_item");
buttonsSortBy.forEach((btnSortBy, index) => {
    btnSortBy.addEventListener("click", () => {
        const by = Object.values(BY)[Math.floor(index / 2)];
        const order = index % 2 === 0 ? ORDER.ASC : ORDER.DESC;
        loadingPage();
        getProductsSort(by, order, pageNumberClient).then((res) => {
            const { items, totalPages, totalItems } = res;
            const btnPagina = (pageNumber) => {
                loadingResult();
                getProductsSort(by, order, pageNumber).then((res) =>
                    showProductResults(res.items)
                );
            };
            initPagina(totalPages, totalItems, btnPagina);
            showProductResults(items);
        });
    });
});

// BUSCADOR -----------------------------------------------------------------
const btnSearch = document.querySelector(".form__search");
const inputSearch = document.querySelector(".form__search_input");
btnSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    const search = inputSearch.value;
    loadingPage();
    getProductsByNameContaining(search, pageNumberClient).then((res) => {
        const { items, totalPages, totalItems, empty } = res;
        if (!empty) {
            const btnPagina = (pageNumber) => {
                loadingResult();
                getProductsByNameContaining(search, pageNumber).then((res) =>
                    showProductResults(res.items)
                );
            };
            initPagina(totalPages, totalItems, btnPagina);
            showProductResults(items);
        } else {
            productosHTML.innerHTML = `
            <div class="not_found_container">
                <img class="not_found_img" src="./assets/icon.webp" />
                <p class="not_found">Búsqueda no encontrada :(</p>
            </div>
            `;
        }
    });
});
