const Product = (id, name, discount, urlImage, price) => {
    const priceWithDiscount = price * (1 - discount / 100);
    return `
    <article class="producto">
        ${discount !== 0 ? `<div class="desc">-${discount}%</div>` : ""}
        <img
            class="producto__img"
            ${
                urlImage
                    ? `srcset="${urlImage}, /assets/icon.webp"`
                    : `src="/assets/icon.webp"`
            }
            alt="${name}"
        />
        <p class="producto__name">${name}</p>
        <div class="producto__precio_container">
            <span class="precio_title">Regular</span>
            <span ${discount !== 0 ? `class="tachado"` : ""} >$ ${price}</span>
        </div>
        <div class="producto__precio_container">
        ${
            discount !== 0
                ? `<span class="precio_title">Oferta</span>
                    <span class="oferta">$ ${priceWithDiscount}</span>
                        `
                : ""
        }</div>
        <form id="${id}" class="producto__form">
            <input class="input-contador" type="number" disabled value="0" max="99" min="0" />
            <div class="producto__form_buttons">
                <button class="increment btn-contador" type="button">+</button>
                <button class="decrement btn-contador btn-inferior" type="button">
                    -
                </button>
            </div>
            <button class="producto__form_submit" type="submit">
                Agregar
            </button>
        </form>
    </article>
    `;
};

const Products = (products) => {
    return products
        .map((product) =>
            Product(
                product.id,
                product.name,
                product.discount,
                product.urlImage,
                product.price
            )
        )
        .join("");
};
