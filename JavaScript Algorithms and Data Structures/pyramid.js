const character = "#";
const count = 8;
const rows = [];
let inverted = false;
let result = ""

// CREATE_ROW
// * "characterNum" is always 2*rowNumber-1
// * rowNumber counts up, rowCount is the total count
//   rowCount == rowNumber at max "characterNum", therefore = 0
function createRow(rowNumber, rowCount) {
    return " ".repeat(rowCount - rowNumber)
        + character.repeat(2 * rowNumber - 1)
        + " ".repeat(rowCount - rowNumber);
}

// CREATE_ROWS_LOOP
// * adding to rows array
// * For Loop = (initialization; condition; increment/decrement)
for (let i = 1; i <= count; i++) {
    if (inverted) {
        rows.unshift(createRow(i, count)); // unshift right
    } else {
        rows.push(createRow(i, count));
    }
}

// CREATE_PYRAMID_LOOP
// * for every value, defined as row, of rows[], add /n and then the
//   value to result.
for (const row of rows) {
    result = result + "\n" + row;
}

// PRINT_PYRAMID
console.log(result);