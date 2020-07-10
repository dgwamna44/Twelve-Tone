var piano = $("#piano .sound");
var pianoHigh = $("#piano-high .sound");
var sources = [];
var sounds = [];
var speed = 1000;
var toneClass;
var toneClass2;
var rowClass;

function playC4() {
  piano[0].play();
}
function playCsharp4() {
  piano[1].play();
}
function playD4() {
  piano[2].play();
}
function playEb4() {
  piano[3].play();
}
function playE4() {
  piano[4].play();
}
function playF4() {
  piano[5].play();
}
function playFsharp4() {
  piano[6].play();
}
function playG4() {
  piano[7].play();
}
function playAb4() {
  piano[8].play();
}
function playA4() {
  piano[9].play();
}
function playBb4() {
  piano[10].play();
}
function playB4() {
  piano[11].play();
}
// function playC5() {
//   C5.trigger('play');
// }
// function playCsharp5() {
//   Csharp5.trigger('play');
// }
// function playD5() {
//   D5.trigger('play');
// }
// function playEb5() {
//   Eb5.trigger('play');
// }
// function playE5() {
//   E5.trigger('play');
// }
// function playF5() {
//   F5.trigger('play');
// }
// function playFsharp5() {
//   Fsharp5.trigger('play');
// }
// function playG5() {
//   G5.trigger('play');
// }
// function playAb5() {
//   Ab5.trigger('play');
// }
// function playA5() {
//   A5.trigger('play');
// }
// function playBb5() {
//   Bb5.trigger('play');
// }
// function playB5() {
//   B5.trigger('play');
// }

$(document).on('click', '.marker', function () {
  var mode, index, row, col;
  var line = [];
  var newLine = [];
  rowClass = $(this).val();
  $('#playing').html("Now Playing: " + "Row " + rowClass);
  if (rowClass[1] == "I" && rowClass.substring(2, 4) >= 10) {
    mode = rowClass.substring(0, 2);
    index = parseInt(rowClass.substring(2, 4));
  }
  else if (rowClass[1] == "I" && rowClass.substring(2, 4) < 10) {
    mode = rowClass.substring(0, 2);
    index = parseInt(rowClass[2]);
  }
  else if (rowClass[1] != "I" && rowClass.substring(1) >= 10) {
    mode = rowClass[0];
    index = parseInt(rowClass.substring(1));
  }
  else {
    mode = rowClass[0];
    index = parseInt(rowClass[1]);
  }

  switch (mode) {
    case "RI":
      col = m_col.indexOf(index);
      row = MAX - 1; //going backwards (up) from 11 to 0
      for (j = col; j < col + 1; j++) {
        for (i = row; i >= 0; i--) {
          line.push(matrix[i][j]);
        }
      }
      break;
    case "I":
      col = m_col.indexOf(index);
      row = 0; //going forward (down) from 0 to 11
      for (j = col; j < col + 1; j++) {
        for (i = row; i < MAX; i++) {
          line.push(matrix[i][j]);
        }
      }
      break;
    case "R":
      col = MAX - 1; //going backward (left) from 11 to 0
      row = m_row.indexOf(index);
      for (j = col; j >= 0; j--) {
        for (i = row; i < row + 1; i++) {
          line.push(matrix[i][j]);
        }
      }
      break;
    case "P":
      col = 0; //going forward (right) from 0 to 11
      row = m_row.indexOf(index);
      for (j = col; j < MAX; j++) {
        for (i = row; i < row + 1; i++) {
          line.push(matrix[i][j]);
        }
      }
      break;
  }


  var lineOffset = line[0];
  var newLine = line;
  var iterator = 1;
  var note = 0;


// offset if need to expand past the octave

 for (var i = 0; i < MAX; i++) { 
   if (lineOffset > line[i])
     newLine[i] += 12;
 }
 
  function myLoop() {
    setTimeout(function () {
      $('#playing').html("Now Playing: " + "Row " + rowClass);
      var note = newLine[iterator - 1];
      if(note < 12)
        piano[note].play();
      else
        pianoHigh[note-12].play();
      iterator++;
      var temp = $("<div>");
      temp.addClass("tone");
      switch (note) {
        case 0:
        case 12:
        temp.css('border', '4px solid blue');
          break;
        case 1:
        case 13:
          temp.css('border', '4px solid #ff00ff');
          break;
        case 2:
        case 14:
          temp.css('border', '4px solid orange');
          break;
        case 3:
        case 15:
          temp.css('border', '4px solid #37cfcf');
          break;
        case 4:
        case 16:
          temp.css('border', '4px solid rgb(227, 255, 100)');
          break;
        case 5:
        case 17:
          temp.css('border', '4px solid #50f0d0');
          break;
        case 6:
        case 18:
          temp.css('border', '4px solid brown');
          break;
        case 7:
        case 19:
          temp.css('border', '4px solid gold');
          break;
        case 8:
        case 20:
          temp.css('border', '4px solid #ff5f00');
          break;
        case 9:
        case 21:
          temp.css('border', '4px solid rgb(215, 218, 32)');
          break;
        case 10:
        case 22:
          temp.css('border', '4px solid rgb(127, 15, 207)');
          break;
        case 11:
          temp.css('border', '4px solid lightgreen');
          break;
      }
      if (note > 11)
        temp.text(getNote(note - 12));
      else
        temp.text(getNote(note));
      $('#playing').append(temp);
      if (iterator <= MAX) {
        $('.marker').attr('disabled', true);
        $('#newRow').hide();
        myLoop();
       }
    }, speed)
  }
  myLoop();
});

$(document).on('click', '#clearRow', function (){
  $('#playing').html("Now Playing:");
  $('.marker').attr('disabled', false);
  $('#newRow').show();
  $("#matrix .tone").css("transform", "scale(1)");
  $("#matrix .tone").css("transition", ".5s");
  $("#matrix .tone").css("border-color", "white");
  $("#matrix .tone").css("border", "1px solid olive");
  $("#matrix .tone").css("color", "black")
  $("#matrix .tone").css('border-radius', '0px');
});


//Styling functions for the playback buttons
$(document).on('mouseenter', '.marker', function () {
  var temp = $(this).attr('id');
  toneClass = temp;
  if (temp[1] == 'I') { // prime/inverse rows share the same notes as their retrograde counterparts. 
    toneClass = temp.slice(1);
    $('.' + toneClass).css("border", "3px solid gold");
  }
  else if (temp[0] == "R") { // retrograde
    temp = setCharAt(temp, 0, 'P');
    toneClass = temp;
    $('.' + toneClass).css("border", "3px solid crimson");
  }
  else if (temp[0] == "P") //  prime
  {
    $('.' + toneClass).css("border", "3px solid #4060ff");
  }
  else if (temp[0] == "I") { //inversion
    $('.' + toneClass).css("border", "3px solid darkblue");
  }

  $('.' + toneClass).css("transform", "scale(1.15)");
  $('.' + toneClass).css("transition", ".5s");
  $('.' + toneClass).css('border-radius', '10px');
});

$(document).on('mouseleave', '.marker', function () {
  var toneClass;
  var temp = $(this).attr('id');
  toneClass = temp;
  if (temp[1] == 'I') { // prime/inverse rows share the same notes as their retrograde counterparts
    toneClass = temp.slice(1);
  }
  else if (temp[0] == "R") {
    temp = setCharAt(temp, 0, 'P');
    toneClass = temp;
  }
  $('.' + toneClass).css("transform", "scale(1)");
  $('.' + toneClass).css("transition", ".5s");
  $('.' + toneClass).css("border-color", "white");
  $('.' + toneClass).css("border", "1px solid olive");
  $('.' + toneClass).css("color", "black")
  $('.' + toneClass).css('border-radius', '0px');
});





function setCharAt(str, index, chr) {
  if (index > str.length - 1) return str;
  return str.substr(0, index) + chr + str.substr(index + 1);
}






// $(document).on('input', '#speed', function () {
//   speed = (1400 - $(this).val());
//   console.log(speed);
// });