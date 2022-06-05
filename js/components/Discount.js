const Discount = (min, max) => {
    return `
    <li>
        <button class="btn_filter_item">${min}% - ${max}%</button>
    </li>
    `;
};

const Discounts = (discount) => {
    const DISCOUNT_MAYOR = discount.discount;
    const NUM_INTERVALO = 3;
    const DIFERENCIA = DISCOUNT_MAYOR / NUM_INTERVALO;
    let discounts = "";
    for (let index = 0; index < NUM_INTERVALO; index++) {
        const min = index * DIFERENCIA;
        const max = min + DIFERENCIA;
        discounts += Discount(min, max);
    }
    return discounts;
};
