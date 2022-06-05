const Price = (min, max) => {
    return `
    <li>
        <button class="btn_filter_item">${min} - ${max}</button>
    </li>
    `;
};

const Prices = (price) => {
    const PRICE_MAYOR = price.price;
    const NUM_INTERVALO = 5;
    const DIFERENCIA = PRICE_MAYOR / NUM_INTERVALO;
    let prices = "";
    for (let index = 0; index < NUM_INTERVALO; index++) {
        const min = index * DIFERENCIA;
        const max = min + DIFERENCIA;
        prices += Price(min, max);
    }
    return prices;
};
