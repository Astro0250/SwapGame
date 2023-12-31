const grid = document.querySelector('.grid');
const randomizeButton = document.getElementById('randomizeButton');
const gridItems = document.querySelectorAll('.grid-item');
const emptyCell = document.getElementById('empty-cell');

randomizeButton.addEventListener('click', () => {
    let values = Array.from(gridItems);
    values.sort(() => Math.random() - 0.5);
    values.forEach(item => {
        item.parentNode.appendChild(item);
    });
});

function swapTiles(clickedCell) {
    // Get the indices of the clicked cell and the empty cell
    const clickedCellIndex = Array.from(clickedCell.parentNode.children).indexOf(clickedCell);
    const emptyCellIndex = Array.from(emptyCell.parentNode.children).indexOf(emptyCell);

    // Calculate the difference between the indices
    const diff = Math.abs(clickedCellIndex - emptyCellIndex);

    // If the cells are adjacent (either above, below, to the right, or to the left of each other), swap them
    if (diff === 1 || diff === 4) {
        // Create a temporary node to hold the place of the clicked cell
        let tempNode = document.createElement('div');
        grid.insertBefore(tempNode, clickedCell);
        emptyCell.parentNode.insertBefore(clickedCell, emptyCell);
        tempNode.parentNode.insertBefore(emptyCell, tempNode);
        tempNode.parentNode.removeChild(tempNode);
        setTimeout(() => {
            checkForWin();
        }, 5);
    }
}

function checkForWin() {
    let grid = Array.from(document.querySelectorAll('.grid-item'));   
    let win = true;
    grid.forEach((item, index) => {
        if (item.id !== 'empty-cell') {
            item.innerHTML !== (index+1).toString() ? win = false : null;
        } else if (index !== 15) {
            win = false;
        }
    });
    console.log(`win?: ${win}`);
    if (win) {
        alert('You win!');
    }
}