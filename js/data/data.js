const ENDPOINT = "https://api-rest-bsale-store.herokuapp.com";
const ENDPOINT_PRODUCTS = `${ENDPOINT}/products`;
const LIMIT = 10;
const BY = {
    NAME: "name",
    PRICE: "price",
    DISCOUNT: "discount",
};
const ORDER = {
    ASC: "asc",
    DESC: "desc",
};

const getProducts = (numPage) => {
    return fetch(`${ENDPOINT_PRODUCTS}?numPage=${numPage}&limit=${LIMIT}`).then(
        (res) => {
            if (!res.ok) {
                throw new Error("getProducts - Error");
            }
            return res.json();
        }
    );
};
const getProductsSort = (by, order, numPage) => {
    return fetch(
        `${ENDPOINT_PRODUCTS}/sort?by=${by}&order=${order}&numPage=${numPage}&limit=${LIMIT}`
    ).then((res) => {
        if (!res.ok) {
            throw new Error("getProductsSort - Error");
        }
        return res.json();
    });
};
const getProductsByNameContaining = (name, numPage) => {
    return fetch(
        `${ENDPOINT_PRODUCTS}/name?name=${name}&numPage=${numPage}&limit=${LIMIT}`
    ).then((res) => {
        if (!res.ok) {
            // throw new Error("getProductsByNameContaining - Error");
            return [];
        }
        return res.json();
    });
};
const getProductByCategory = (id, numPage) => {
    return fetch(
        `${ENDPOINT_PRODUCTS}/categoria/${id}?numPage=${numPage}&limit=${LIMIT}`
    ).then((res) => {
        if (!res.ok) {
            throw new Error("getProductByCategory - Error");
        }
        return res.json();
    });
};
// ----------------------------- DESCUENTOS -----------------------------------
const ENDPOINT_PRODUCTS_DESCUENTOS = `${ENDPOINT_PRODUCTS}/descuentos`;
const getProductsByDiscountBetween = (min, max, numPage) => {
    return fetch(
        `${ENDPOINT_PRODUCTS_DESCUENTOS}?min=${min}&max=${max}&numPage=${numPage}&limit=${LIMIT}`
    ).then((res) => {
        if (!res.ok) {
            throw new Error("getDescuentos - Error");
        }
        return res.json();
    });
};
const getDescuentoMayor = () => {
    return fetch(`${ENDPOINT_PRODUCTS_DESCUENTOS}/mayor`).then((res) => {
        if (!res.ok) {
            throw new Error("getDescuentoMayor - Error");
        }
        return res.json();
    });
};
// --------------------------------- PRECIOS ----------------------------------
const ENDPOINT_PRODUCTS_PRECIOS = `${ENDPOINT_PRODUCTS}/precios`;
const getProductsByPriceBetween = (min, max, numPage) => {
    return fetch(
        `${ENDPOINT_PRODUCTS_PRECIOS}?min=${min}&max=${max}&numPage=${numPage}&limit=${LIMIT}`
    ).then((res) => {
        if (!res.ok) {
            throw new Error("getPrecios - Error");
        }
        return res.json();
    });
};
const getPrecioMayor = () => {
    return fetch(`${ENDPOINT_PRODUCTS_PRECIOS}/mayor`).then((res) => {
        if (!res.ok) {
            throw new Error("getPrecioMayor - Error");
        }
        return res.json();
    });
};

const ENDPOINT_CATEGORIES = `${ENDPOINT}/categories`;
const getCategories = () => {
    return fetch(ENDPOINT_CATEGORIES).then((res) => {
        if (!res.ok) {
            throw new Error("getPrecioMayor - Error");
        }
        return res.json();
    });
};
