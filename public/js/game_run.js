// var strColors = document.getElementById('arrColors').textContent;
// var strNumbers = document.getElementById('arrNumbers').textContent;

// var arrColors = strColors.split(',');
// var arrNumbers = strNumbers.split(',');

// var rollResult, rollColorDisplay;
// var startCash = 100;
// document.getElementById('credit').textContent = startCash;
// var credit = parseInt(document.getElementById('credit').textContent);

// showFieldColors();

// document.getElementById('roll').addEventListener('click', () => {
    
//     rollResult = Math.floor(Math.random() * 37);
//     rollColorDisplay = getRollDetails(rollResult);
//     document.getElementById('printRoll').textContent = rollResult + ", " + rollColorDisplay;
    
//     highlightNumber(rollResult);
    
//     placeBets(rollColorDisplay);
    
//     document.getElementById('credit').textContent = credit;
//     setTimeout(() =>{if (credit == 0) {
//         alert('Braklo pieniedzy');
//     }}, 100);
// });


// document.getElementById('clearBets').addEventListener('click', () => {
//     clearBets();
// });

// function getRollDetails(x) {
//     var colorDisplay = '';
//     for(var i = 0; i < arrColors.length; i++) {
//         if (arrNumbers[i] == x) {
//             colorDisplay = arrColors[i] == 'red' ? 'Czerwony' : (arrColors[i] == 'black' ? 'Czarny' : ' - ');
//         }
//     }
//     return colorDisplay;
// }

// function checkIfCredit(sum1, sum2, sum3, sum4) {
//     if(sum1 + sum2 + sum3 + sum4 > credit) {
//         alert("Nie masz tyle $");
//         document.getElementById('credit').textContent = credit;
//         return false;
//     }
//     return true;
// }

// function betOnColor(color, sum) {
//     if (document.getElementById('colorInput').value == 'empty') return;
//     if (document.getElementById('colorInput').value == color) {
//        credit += sum;
//     } else {
//        credit -= sum;
//     }
// }

// function betOnEven (sum) {
//     var rollIsEven = (parseInt(rollResult) % 2 == 0);

//     if (document.getElementById('evenInput').value == 'empty') return;
//     if (document.getElementById('evenInput').value == rollIsEven.toString()) {
//        credit += sum;
//     } else {
//       credit -= sum;
//     }
// }

// function betOnDozen(sum) {
//     if (document.getElementById('dozenInput').value == 'empty') return;
//     if ((document.getElementById('dozenInput').value == '0' && rollResult > 0 && rollResult <= 12) ||
//     (document.getElementById('dozenInput').value == '1' && rollResult > 12 && rollResult <= 24) ||
//     (document.getElementById('dozenInput').value == '2' && rollResult > 25)) {
//         credit += (sum * 2);
//     } else {
//         credit -= sum;
//     }
// }

// function placeBets(color) {
//     var colorBid = parseInt(document.getElementById('colorBid').value) || 0;
//     var evenBid = parseInt(document.getElementById('evenBid').value) || 0;
//     var dozenBid = parseInt(document.getElementById('dozenBid').value) || 0;
//     var columnBid = parseInt(document.getElementById('columnBid').value) || 0;

//     if (checkIfCredit(colorBid, evenBid, dozenBid, columnBid)) {
//         if (colorBid) betOnColor(color, colorBid);
//         if (evenBid) betOnEven(evenBid);
//         if (dozenBid) betOnDozen(dozenBid);
//         if (columnBid) betOnColumn(columnBid);
//     }
// }

function showFieldColors() {
    var redFields = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    var table = document.getElementById('numBoard');
    table.rows[4].cells[0].style.color = "green";
    for (var r = 1, n = table.rows.length; r < n; r++) {
        for (var c = 0, m = table.rows[r].cells.length; c < m; c++) {
            redFields.forEach(x => {
                if (table.rows[r].cells[c].innerHTML == x) {
                    table.rows[r].cells[c].style.color="red";
                };
            });
        }
    }
}

showFieldColors();

// var currentHighlightCol;
// function highlightNumber(num) {
//     var table = document.getElementById('numBoard');
//     for (var r = 1, n = table.rows.length; r < n; r++) {
//         for (var c = 0, m = table.rows[r].cells.length; c < m; c++) {
//             table.rows[r].cells[c].style.background="white";
//             if (table.rows[r].cells[c].innerHTML == num) {
//                 if (currentHighlightCol>=0) table.rows[0].cells[parseInt(currentHighlightCol)].style.background="white";
//                 table.rows[r].cells[c].style.background="yellow";
//                 table.rows[0].cells[c].style.background="pink";
//                 currentHighlightCol = c;
                
//             };
//         }
//     }
// }

// function betOnColumn(sum) {
//     if (document.getElementById('columnInput').value == 'empty') return;

//     var table = document.getElementById('numBoard');
//     for (var r = 1, n = table.rows.length; r < n; r++) {
//         for (var c = 0, m = table.rows[r].cells.length; c < m; c++) {
//             if (table.rows[r].cells[c].innerHTML == rollResult) {
//                 if (document.getElementById('columnInput').value == table.rows[0].cells[c].innerHTML) {
//                     credit += (sum * 11);
//                 } else {
//                     credit -= sum;
//                 }
                

//             }
//         }
//     }
// }

// function clearBets() {
//     document.getElementById('colorInput').value = 'empty';
//     document.getElementById('dozenInput').value = 'empty';
//     document.getElementById('evenInput').value = 'empty';
//     document.getElementById('columnInput').value = 'empty';
//     document.getElementById('colorBid').value = '';
//     document.getElementById('evenBid').value = '';
//     document.getElementById('dozenBid').value = '';
//     document.getElementById('columnBid').value = '';
// }