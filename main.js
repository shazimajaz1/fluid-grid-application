/*
    Fluid Grid Application
*/

// Define element references
const columnSelect = document.getElementById("column-number-select");
const createGridButton = document.getElementById("create-grid-button");
const grid = document.getElementById("grid");
const gridSize = document.getElementById("grid-size");
const addBox = document.getElementById("add-box-button");
const boxElement = document.querySelector("div.grid-wrapper > div.grid > div.box");

/*
    Application State
*/
const state = {
    dropdownOptions: [1, 2, 3, 4, 5, 6],
    numberOfColumns: 1,
    boxes: [],
};

/*
    Initialize the dropdown options with initial 
    possible values
*/
state.dropdownOptions.forEach((opt) => {
    columnSelect.appendChild(new Option(getColumFormattedString(opt), opt));
});

/*
    Hanlde the change event with column selection
*/
columnSelect.onchange = (event) => {
    // Find the selected number of columns
    state.numberOfColumns = event.target.value;
};

/*
    @function
        Handles the action for create grid button
*/
createGridButton.onclick = () => {
    state.boxes = [];
    cleanUpGrid();
    createGrid();
};

/*
    @funciton
        Handles the action for adding a new box to the grid
*/
addBox.onclick = () => {
    state.boxes.push("box");
    redrawBoxes();
};

/*
    @function -> Create a grid on the screen
    @params 
        none
    @output
        2. void
*/
function createGrid() {
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = `repeat(${state.numberOfColumns}, 1fr)`;
    gridSize.innerText = getColumFormattedString(state.numberOfColumns);
}

/*
    @function:
        This function returns the formatted string for a column name based on how many
        columns are there
*/
function getColumFormattedString(opt) {
    return `${opt} Column${opt > 1 ? "s" : ""}`;
}

/*
    @function:
        - The goal of this function is to redraw the boxes

        *note - Usually, we would use a change detection library to ensure only
            the changes nodes are updated (such as the removed nodes). However, to 
            simplify the logic, we are redrawing the entire box tree everytime a node is removed
*/
function redrawBoxes() {
    cleanUpGrid();

    // Rdraw the grids array
    state.boxes.forEach((box, index) => {
        // create and initialize the new box
        const newBox = boxElement.cloneNode(true);
        grid.appendChild(newBox);

        // Add the label value
        const cElement = grid.children[index];
        cElement.style.display = "flex";
        cElement.children[0].innerText = index + 1;

        // Attach the remvoe button event listener
        cElement.children[1].onclick = () => {
            state.boxes.splice(index, 1);
            redrawBoxes();
        };
    });
}

/*
    @function
        Remove all the elements from teh grid leaving it empty
*/
function cleanUpGrid() {
    // Remove the nodes from the gird
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
}
