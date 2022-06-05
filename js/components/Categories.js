const Category = (name, id) => {
    return `
        <li>
            <button value="${id}" class="btn_filter_item">
                ${name}
            </button>
        </li>
    `;
};

const Categories = (categories) => {
    return categories
        .map((category) => Category(category.name, category.id))
        .join("");
};
