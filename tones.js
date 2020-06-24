var piano = $("#piano .sound");
var sources = [];
var sounds = [];
var speed = 800;

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
  $('#playback').show();
  var mode, index, row, col;
  var line = [];
  var temp = $(this).val();
  if (temp[1] == "I" && temp.substring(2, 4) >= 10) {
    mode = temp.substring(0, 2);
    index = parseInt(temp.substring(2, 4));
  }
  else if (temp[1] == "I" && temp.substring(2, 4) < 10) {
    mode = temp.substring(0, 2);
    index = parseInt(temp[2]);
  }
  else if (temp[1] != "I" && temp.substring(1) >= 10) {
    mode = temp[0];
    index = parseInt(temp.substring(1));
  }
  else {
    mode = temp[0];
    index = parseInt(temp[1]);
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
  console.log('\n' + temp + " was selected. The values are: \n" + line);

  var lineOffset = line[0];
  var newLine = line;
  var iterator = 1;
  var note = 0;

  // for (var i = 0; i < MAX; i++)
  // // (buffering issues with higher pitches)
  // {
  //   if (lineOffset > line[i]) {
  //     newLine[i] += 12;
  //   }
  // }

  function myLoop() {
    setTimeout(function () {
      var note = newLine[iterator - 1];
      piano[note].play();
      iterator++;
      if (iterator <= MAX) {
        myLoop();
      }
    }, speed)
  }

  myLoop();


  console.log("\n Actual pitches to be played are: " + newLine + "\n");

});


//Styling functions for the playback buttons

$(document).on('mouseenter', '.marker', function () {
  var toneClass;
  var letter;
  var temp = $(this).attr('id');
  toneClass = temp;
  if (temp[1] == 'I') { // prime/inverse rows share the same notes as their retrograde counterparts. 
    toneClass = temp.slice(1);
    $('.' + toneClass).css("color", "black");
    $('.' + toneClass).css("background-color", "#ffff30");
     $('.' + toneClass).css("border", ".5px solid gold");
  }
  else if (temp[0] == "R") { // retrograde
    temp = setCharAt(temp, 0, 'P');
    toneClass = temp;
    $('.' + toneClass).css("background-color", "crimson");
    $('.' + toneClass).css("color", "white");
    $('.' + toneClass).css("border", "0px");
  }
  else if (temp[0] == "P") //  prime
  {
    $('.' + toneClass).css("background-color", "#4060ff");
    $('.' + toneClass).css("color", "white");
    $('.' + toneClass).css("border", "0px");
  }
  else if (temp[0] == "I") { //inversion
    $('.' + toneClass).css("background-color", "darkblue");
    $('.' + toneClass).css("color", "white");
    $('.' + toneClass).css("border", "0px");
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
  $('.' + toneClass).css("background-color", "white");
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