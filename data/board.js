function Field (val, col) {
    this.val = val;
    this.col = col;
};

var fieldArr = [field0 = new Field(), field1 = new Field(), field2 = new Field(), field3 = new Field(), field4 = new Field(), field5 = new Field(),
field6 = new Field(), field7 = new Field(), field8 = new Field(), field9 = new Field(), field10 = new Field(), field11 = new Field(), 
field12 = new Field(), field13 = new Field(), field14 = new Field(), field15 = new Field(), field16 = new Field(), field17 = new Field(),
field18 = new Field(), field19 = new Field(), field20 = new Field(), field21 = new Field(), field22 = new Field(), field23 = new Field(),
field24 = new Field(), field25 = new Field(), field26 = new Field(), field27 = new Field(), field28 = new Field(), field29 = new Field(),
field30 = new Field(), field31 = new Field(), field32 = new Field(), field33 = new Field(), field34 = new Field(), field35 = new Field(), 
field36 = new Field()];

var redFields = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];

var arrNumbers = [];
var arrColors = [];

for (var i = 0; i < fieldArr.length; i++) {
    fieldArr[i].val = i;
    arrNumbers.push(i);
    fieldArr[i].col = i == 0 ? "green" : (redFields.includes(i) ? "red" : "black");
    arrColors.push(fieldArr[i].col);
}

var arrColumnSelect = [];
var countColumn = 1;
while (countColumn < 13) {
    arrColumnSelect.push({
        index : countColumn,
        val : "kolumna " + countColumn
    });
    countColumn++;
}

exports.arrNumbers = arrNumbers;
exports.arrColors = arrColors;
exports.arrColumnSelect = arrColumnSelect;
exports.fieldArr = fieldArr;
exports.redFields = redFields;