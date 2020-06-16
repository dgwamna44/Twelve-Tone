var homeRow = []; // initial tone row 
var nextRow = []; // subsequent rows
var homeValues = []; // initial row in value form 
var nextValues = []; //subsequent values
var primeNum = [];
var invNum = [];
var matrix = [];
var counter = 0;
var rowIndex = 0;
var offset = 0;
var sharps = false;
var flats = false;

const MAX = $("#buttons .tone").length;

$("#matrix").hide();
$("#generate").hide();

$("#sharps").click(function () {
  $(this).hide();
  $("#flats").show();
  sharps = true;
  flats = false;
  $('#buttons .tone').each(function () {
    if ($(this).val() == "Db")
      $(this).prop('value', 'C#');
    else if ($(this).val() == "Eb")
      $(this).prop('value', 'D#');
    else if ($(this).val() == "Gb")
      $(this).prop('value', 'F#');
    else if ($(this).val() == "Ab")
      $(this).prop('value', 'G#');
    else if ($(this).val() == "Bb")
      $(this).prop('value', 'A#');
  });
  for (var i = 0; i < homeRow.length; i++) {
    if (homeRow[i] == "Db")
      homeRow[i] = "C#";
    else if (homeRow[i] == "Eb")
      homeRow[i] = "D#";
    else if (homeRow[i] == "Gb")
      homeRow[i] = "F#";
    else if (homeRow[i] == "Ab")
      homeRow[i] = "G#";
    else if (homeRow[i] == "Bb")
      homeRow[i] = "A#";
  }
  $("#selection").val(homeRow);
});


$("#flats").click(function () {
  $(this).hide();
  $("#sharps").show();
  sharps = false;
  flats = true;
  $('#buttons .tone').each(function () {
    if ($(this).val() == "C#")
      $(this).prop('value', 'Db');
    else if ($(this).val() == "D#")
      $(this).prop('value', 'Eb');
    else if ($(this).val() == "F#")
      $(this).prop('value', 'Gb');
    else if ($(this).val() == "G#")
      $(this).prop('value', 'Ab');
    else if ($(this).val() == "A#")
      $(this).prop('value', 'Bb');
  });
  for (var i = 0; i < homeRow.length; i++) {
    if (homeRow[i] == "C#")
      homeRow[i] = "Db";
    else if (homeRow[i] == "D#")
      homeRow[i] = "Eb";
    else if (homeRow[i] == "F#")
      homeRow[i] = "Gb";
    else if (homeRow[i] == "G#")
      homeRow[i] = "Ab";
    else if (homeRow[i] == "A#")
      homeRow[i] = "Bb";
  }
  $("#selection").val(homeRow);
});

$("#buttons .tone").click(function () {
  $(this).hide();
  var x = $(this).val();
  homeRow.push(x);
  homeValues.push(getValue(x));
  $("#selection").val(homeRow);
  matrix.push(homeValues[counter]);
  console.log(matrix);
  counter++;
  if (counter == MAX)
    $("#generate").show(); // rows ready when we have 12

});


$("#clear").click(function () {
  $("#matrix").hide();
  $("#buttons .tone").show();
  $("#sharps").show();
  $("#flats").show();
  $("#selection").val('');
  $(".columns").val('');
  $(".rows").val('');
  homeRow = [];
  homeValues = [];
  nextRow = [];
  nextValues = [];
  primeNum = [];
  invNum = [];
  counter = 0;
  $("#matrix").text("");
  sharps = false;
  flats = false;
});


$("#generate").click(function () {
  $("#matrix").show();
  $("#generate").hide();
  $("#sharps").hide();
  $("#flats").hide();
  getInverses();
  getPrimes();
  printInversion("I", invNum);
  printMarker("P", primeNum[0]);
  printhomeRow(homeRow, homeValues);
  printMarker("R", primeNum[0]);
  nextValues = homeValues;
  for (var x = 1; x < MAX; x++) {
    offset = homeValues[x] - homeValues[x - 1];
    calcNum(nextValues, offset);
    matrix += nextValues[i];
    printMarker("P", primeNum[x]);
    printNextRow(nextRow, nextValues);
    printMarker("R", primeNum[x]);
    nextRow = [];
  }
  console.log(matrix);
  printInversion("RI", invNum);
});

function getValue(note) {
  if (note == "C")
    return 0;
  else if (note == "C#" | note == "Db")
    return 1;
  else if (note == "D")
    return 2;
  else if (note == "Eb" | note == "D#")
    return 3;
  else if (note == "E")
    return 4;
  else if (note == "F")
    return 5;
  else if (note == "F#" | note == "Gb")
    return 6;
  else if (note == "G")
    return 7;
  else if (note == "Ab" | note == "G#")
    return 8;
  else if (note == "A")
    return 9;
  else if (note == "Bb" | note == "A#")
    return 10;
  else if (note == "B")
    return 11;
}
function getNote(pitch) {
  if (pitch == 0)
    return "C";
  else if (pitch == 1) {
    if (sharps)
      return "C#";
    else
      return "Db";
  }
  else if (pitch == 2)
    return "D";
  else if (pitch == 3) {
    if (sharps)
      return "D#";
    else
      return "Eb";
  }
  else if (pitch == 4)
    return "E";
  else if (pitch == 5)
    return "F";
  else if (pitch == 6) {
    if (sharps)
      return "F#";
    else
      return "Gb";
  }
  else if (pitch == 7)
    return "G";
  else if (pitch == 8) {
    if (sharps)
      return "G#";
    else
      return "Ab";
  }
  else if (pitch == 9)
    return "A";
  else if (pitch == 10) {
    if (sharps)
      return "A#";
    else
      return "Bb";
  }
  else if (pitch == 11)
    return "B";
}
function printhomeRow(row, values) {
  for (var i = 0; i < MAX; i++) {
    var note = $("<div>");
    note.addClass("tone");
    note.addClass(getPitchClass(row[i]));
    note.text(row[i]);
    $("#matrix").append(note);
  }
}

function printNextRow(row, values) {
  for (var i = 0; i < MAX; i++) {
    var note = $("<div>");
    note.addClass("tone");
    row.push(getNote(values[i]));
    note.addClass(getPitchClass(row[i]));
    note.text(row[i]);
    $("#matrix").append(note);
  }
}

function printMarker(letter, num) {
  var temp = $("<button>");
  temp.addClass("marker");
  temp.text(letter + num);
  temp.attr('id', letter + num);
  temp.attr('onclick', "playSeries()");
  $("#matrix").append(temp);
}

function printInversion(letter, num) {
  var first = $("<div>");
  var last = $("<div>");
  first.text(" ");
  last.text(" ");
  first.addClass("blank");
  last.addClass("blank");
  $("#matrix").append(first);
  for (var i = 0; i < MAX; i++) {
    var temp = $("<button>");
    temp.addClass("marker");
    temp.attr('id', letter + num[i]);
    temp.text(letter + num[i]);
    $("#matrix").append(temp);
  }
  $("#matrix").append(last);
}


function calcNum(val, i) {
  for (var y = 0; y < MAX; y++) {
    val[y] -= i;
    if (val[y] > 11)
      val[y] -= 12;
    else if (val[y] < 0)
      val[y] += 12;
  }
}

function getInverses() {
  const invIndex = homeValues[0];
  for (var i = 0; i < MAX; i++) {
    var temp = homeValues[i] - invIndex;
    if (temp >= 0) {
      invNum[i] = temp;
    }
    else {
      temp += 12;
      invNum[i] = temp;
    }
  }
}

function getPrimes() {
  primeNum[0] = 0;
  for (var i = 1; i < MAX; i++) {
    primeNum[i] = 12 - invNum[i];
  }
}

function getPitchClass(row) {
  if (row == "C#" | row == "Db")
    return "C-sharp";
  else if (row == "Eb" | row == "D#")
    return "E-flat";
  else if (row == "F#" | row == "Gb")
    return "F-sharp";
  else if (row == "Ab" | row == "G#")
    return "A-flat";
  else if (row == "Bb" | row == "A#")
    return "B-flat";
  else
    return row;
}





