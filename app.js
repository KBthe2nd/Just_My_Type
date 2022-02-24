$(document).ready(function () {
  $("#keyboard-upper-container").hide();
  $(document).on("keydown", function (e) {
    if (e.keyCode == 16) {
      $("#keyboard-upper-container").show();
      $("#keyboard-lower-container").hide();
    }
  });
  $(document).on("keyup", function (e) {
    if (e.keyCode == 16) {
      $("#keyboard-upper-container").hide();
      $("#keyboard-lower-container").toggle();
    }
  });
  let sentences = [
    "ten ate neite ate nee enet ite ate inet ent eate",
    "Too ato too nOt enot one totA not anot tOO aNot",
    "oat itain oat tain nate eate tea anne inant nean",
    "itant eate anot eat nato inate eat anot tain eat",
    "nee ene ate ite tent tiet ent ine ene ete ene ate",
  ];
  let sentIndex = 0;
  let charIndex = 0;
  let letterDiv = $("#next-letter");
  let error = 0;
  let start = 0;
  let finish = 0;

  let startSentence = sentences[0];
  let startChar = startSentence[0];
  letterDiv.text(startChar);
  $("#prompt").append(sentences[sentIndex]);

  $("#sentence").append(startSentence);
  $("#next-letter").append(startChar);
  $(document).on("keypress", function (e) {
    let code = $("#" + e.which);
    code.css("background-color", "green");

    startSentence = sentences[sentIndex];
    startChar = startSentence[charIndex];

    if (start == undefined) {
      start = e.timeStamp;
    }
    $("#yellow-block").css("left", "+=17px");

    charIndex++;

    let nextChar = startSentence[charIndex];
    letterDiv.text(nextChar);

    if (charIndex < startSentence.length - 1) {
      if (e.which === startChar.charCodeAt()) {
        $("#feedback").append("<span class = 'glyphicon glyphicon-ok'></span>");
      } else {
        $("#feedback").append(
          "<span class = 'glyphicon glyphicon-remove'></span>"
        );

        error++;
      }
    }
    if (charIndex == startSentence.length) {
      $("#sentence").empty();

      sentIndex++;

      startSentence = sentences[sentIndex];

      $("#sentence").append(sentences[sentIndex]);

      charIndex = 0;
      if (sentIndex < sentences.length - 1) {
        let nextChar = startSentence[charIndex];
      }
      letterDiv.text(nextChar);
      $("#yellow-block").css({ left: 17 });
      $("#feedback").empty();
    }
    if (startSentence > sentences.length - 1) {
      finish = e.timeStamp;

      let time = finish - start;
      time /= 60000;

      let speed = Math.round(54 / time - error * 2);

      $("#next-letter").text("Your score is" + speed + "words per minute");
    }
  });
});
