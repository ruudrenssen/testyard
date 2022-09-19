class AdvancedTable {
    constructor(el) {
        AdvancedTable.setResizeListeners(el);
    }

    static setResizeListeners(el) {
        const cells = el.querySelectorAll("th, td");
        cells.forEach(cell => {
            cell.onmousemove = event => {
                console.log(event.target.getBoundingClientRect().width);
                console.log(event.offsetX);

                // check if these values are close to one another
            }
        });
    }
}

export default AdvancedTable;
