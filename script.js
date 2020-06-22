var homeRow = []; // initial tone row 
var nextRow = []; // subsequent rows
var oldValues = []; // initial row in value form 
var nextValues = []; //subsequent values
var refValues = [];
var m_col = [];
var m_row = [];
var counter = 0;
var rowIndex = 0;
var offset = 0;
var sharps = false;
var flats = false;
var matrix = [];

const noteNames = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];

const MAX = $("#buttons .tone").length;
var mode;
var background;

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

$("#matrix").hide();
$("#generate").hide();
$('#playback').hide();

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
  $("#pick4me").hide();
  $(this).hide();
  var x = $(this).val();
  homeRow.push(x);
  oldValues.push(getValue(x));
  $("#selection").val(homeRow);
  counter++;
  if (counter == MAX) {
    $("#generate").show(); // rows ready when we have 12
  };
});


$("#clear").click(function () {
  $("#pick4me").show();
  $("#generate").hide();
  $('#playback').hide();
  $("#matrix").hide();
  $("#buttons .tone").show();
  $("#sharps").show();
  $("#flats").show();
  $("#selection").val('');
  $(".columns").val('');
  $(".rows").val('');
  homeRow = [];
  oldValues = [];
  refValues = [];
  nextRow = [];
  nextValues = [];
  m_col = [];
  m_row = [];
  counter = 0;
  $("#matrix").text("");
  sharps = false;
  flats = false;
});

$("#pick4me").click(function () {
  shuffle(noteNames);
  $("#buttons .tone").hide();
  $("#pick4me").hide();
  $("#generate").show();
  for (var i = 0; i < MAX; i++) {
    homeRow.push(noteNames[i]);
    oldValues.push(getValue(homeRow[i]));
    $("#selection").val(homeRow);
  }
});


$("#generate").click(function () {
  $("#matrix").show();
  $("#generate").hide();
  $("#sharps").hide();
  $("#flats").hide();
  $('#playback').show();
  counter = 0;
  getInverses();
  getPrimes();
  printInversion("I", m_col);
  printMarker("P", m_row[0]);
  printhomeRow(homeRow, oldValues);
  printMarker("R", m_row[0]);
  nextValues = oldValues;
  for (var x = 1; x < MAX; x++) {
    offset = oldValues[x] - oldValues[x - 1];
    calcNum(nextValues, offset);
    printMarker("P", m_row[x]);
    printNextRow(nextRow, nextValues);
    printMarker("R", m_row[x]);
    nextRow = [];
  }
  console.log(matrix);
  printInversion("RI", m_col);
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
    note.text(row[i]);
    note.addClass("I" + m_col[i]);
    note.addClass("P" + m_row[counter]);
    $("#matrix").append(note);
    refValues.push(getValue(row[i]));
  }
  matrix.push(refValues);
  counter++;
}

function printNextRow(row, values) {
  for (var i = 0; i < MAX; i++) {
    var note = $("<div>");
    note.addClass("tone");
    note.addClass("I" + m_col[i]);
    note.addClass("P" + m_row[counter]);
    row.push(getNote(values[i]));
    note.text(row[i]);
    $("#matrix").append(note);
  }
  counter++;
}

function printMarker(letter, num) {
  var temp = $("<input>");
  temp.attr('type', 'button');
  temp.addClass("marker");
  temp.attr('value', letter + num);
  temp.attr('id', letter + num);
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
    var temp = $("<input>");
    temp.addClass("marker");
    temp.attr('type', 'button');
    temp.attr('id', letter + num[i]);
    temp.attr('value', letter + num[i]);
    $("#matrix").append(temp);
  }
  $("#matrix").append(last);
}


function calcNum(val, i) {
  var newRow = [];
  for (var y = 0; y < MAX; y++) {
    val[y] -= i;
    if (val[y] > 11)
      val[y] -= 12;
    else if (val[y] < 0)
      val[y] += 12;
    newRow.push(val[y]);
  }
  matrix.push(newRow);
}

function getInverses() {
  const invIndex = oldValues[0];
  for (var i = 0; i < MAX; i++) {
    var temp = oldValues[i] - invIndex;
    if (temp >= 0) {
      m_col[i] = temp;
    }
    else {
      temp += 12;
      m_col[i] = temp;
    }
  }
}

function getPrimes() {
  m_row[0] = 0;
  for (var i = 1; i < MAX; i++) {
    m_row[i] = 12 - m_col[i];
  }
}

