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

const noteNames = ["C", "C\u266f", "D", "E\u266d", "E", "F", "F\u266f", "G", "A\u266d", "A", "B\u266d", "B"];

const MAX = $("#buttons .tone").length;
var mode;
var background;

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

$("#matrix").hide();
$("#generate").hide();
$('#playing').hide();
$('#clearRow').hide();
$('#newRow').hide();

$("#sharps").click(function () {
  $(this).hide();
  $("#flats").show();
  sharps = true;
  flats = false;
  $('#buttons .tone').each(function () {
    if ($(this).val() == "D\u266d")
      $(this).prop('value', 'C\u266f');
    else if ($(this).val() == "E\u266d")
      $(this).prop('value', 'D\u266f');
    else if ($(this).val() == "G\u266d")
      $(this).prop('value', 'F\u266f');
    else if ($(this).val() == "A\u266d")
      $(this).prop('value', 'G\u266f');
    else if ($(this).val() == "B\u266d")
      $(this).prop('value', 'A\u266f');
  });
  for (var i = 0; i < homeRow.length; i++) {
    if (homeRow[i] == "D\u266d")
      homeRow[i] = "C\u266f";
    else if (homeRow[i] == "E\u266d")
      homeRow[i] = "D\u266f";
    else if (homeRow[i] == "G\u266d")
      homeRow[i] = "F\u266f";
    else if (homeRow[i] == "A\u266d")
      homeRow[i] = "G\u266f";
    else if (homeRow[i] == "B\u266d")
      homeRow[i] = "A\u266f";
  }
  $("#selection").val(homeRow);
});


$("#flats").click(function () {
  $(this).hide();
  $("#sharps").show();
  sharps = false;
  flats = true;
  $('#buttons .tone').each(function () {
    if ($(this).val() == "C\u266f")
      $(this).prop('value', 'D\u266d');
    else if ($(this).val() == "D\u266f")
      $(this).prop('value', 'E\u266d');
    else if ($(this).val() == "F\u266f")
      $(this).prop('value', 'G\u266d');
    else if ($(this).val() == "G\u266f")
      $(this).prop('value', 'A\u266d');
    else if ($(this).val() == "A\u266f")
      $(this).prop('value', 'B\u266d');
  });
  for (var i = 0; i < homeRow.length; i++) {
    if (homeRow[i] == "C\u266f")
      homeRow[i] = "D\u266d";
    else if (homeRow[i] == "D\u266f")
      homeRow[i] = "E\u266d";
    else if (homeRow[i] == "F\u266f")
      homeRow[i] = "G\u266d";
    else if (homeRow[i] == "G\u266f")
      homeRow[i] = "A\u266d";
    else if (homeRow[i] == "A\u266f")
      homeRow[i] = "B\u266d";
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


$("#newRow").click(function () {
  $(this).hide();
  $("#pick4me").show();
  $("#generate").hide();
  $("#matrix").hide();
  $("#playing").hide();
  $("#accidentals").show();
  $("#buttons .tone").show();
  $("#sharps").show();
  $("#flats").show();
  $("#newRow").css("bottom", "0px");
  $("#clearRow").hide();
  $("#selection").show();
  $("p").show();
  $("#selection").val('');
  $(".columns").val('');
  $(".rows").val('');
  homeRow = [];
  oldValues = [];
  refValues = [];
  newLine = [];
  line = [];
  nextRow = [];
  nextValues = [];
  m_col = [];
  m_row = [];
  matrix = [];
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
  $('#accidentals').hide();
  $("#selection").hide();
  $('#playing').show();
  $('#playing').html("Now Playing:");
  $('#newRow').show();
  $("#newRow").css("position", "relative");
  $("#newRow").css("bottom", "120px");
  $('#clearRow').show();
  $('#clearRow').css("position", 'relative');
  $('#clearRow').css("bottom", "120px");

  $('#playing').css("bottom", "100px");
  $("#playing").css("left", "60px");
  $("p").hide();
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

  printInversion("RI", m_col);
});

function getValue(note) {
  if (note == "C")
    return 0;
  else if (note == "C\u266f" | note == "D\u266d")
    return 1;
  else if (note == "D")
    return 2;
  else if (note == "E\u266d" | note == "D\u266f")
    return 3;
  else if (note == "E")
    return 4;
  else if (note == "F")
    return 5;
  else if (note == "F\u266f" | note == "G\u266d")
    return 6;
  else if (note == "G")
    return 7;
  else if (note == "A\u266d" | note == "G\u266f")
    return 8;
  else if (note == "A")
    return 9;
  else if (note == "B\u266d" | note == "A\u266f")
    return 10;
  else if (note == "B")
    return 11;
}
function getNote(pitch) {
  if (pitch == 0)
    return "C";
  else if (pitch == 1) {
    if (sharps)
      return "C\u266f";
    else
      return "D\u266d";
  }
  else if (pitch == 2)
    return "D";
  else if (pitch == 3) {
    if (sharps)
      return "D\u266f";
    else
      return "E\u266d";
  }
  else if (pitch == 4)
    return "E";
  else if (pitch == 5)
    return "F";
  else if (pitch == 6) {
    if (sharps)
      return "F\u266f";
    else
      return "G\u266d";
  }
  else if (pitch == 7)
    return "G";
  else if (pitch == 8) {
    if (sharps)
      return "G\u266f";
    else
      return "A\u266d";
  }
  else if (pitch == 9)
    return "A";
  else if (pitch == 10) {
    if (sharps)
      return "A\u266f";
    else
      return "B\u266d";
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

