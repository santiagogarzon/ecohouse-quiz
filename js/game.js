////////////////////////////////////////////////////////////
// GAME
////////////////////////////////////////////////////////////

/*!
 *
 * GAME SETTING CUSTOMIZATION START
 *
 */

var stageW = 1200; //game width
var stageH = 650; //game height
var portraitW = 380; //game portrait width
var portraitH = 600; //game portrait height
var fitToScreen = true; //fit to browser screen
var maintainAspectRatio = true; //maintain aspect ratio
var viewportMode = {
  enable: false,
  viewport: "portrait",
  text: "Rota tu dispositivo <br/>a portrait",
}; //device viewport mode, portrait or landscape

var loaderText = "Cargando preguntas..."; //game loading text

var categoryPage = true; //show/hide category select page
var categoryAllOption = true; //add ALL category select option
var categoryAllText = "Todas"; //text for all category select option

var questionTotalDisplay = "[NUMBER]/[TOTAL]:"; //current question and total question display
var totalQuestions = 0; //set 0 for all questions, set more than 0 to limit total questions

var enableRandomQuestion = true; //enable question in random sequence
var enableRandomAnswer = true; //enable answer in random sequence
var enableRevealAnswer = true; //enable reveal answer
var enableExplanation = true; //enable show explanation

var enableTimer = true; //true or false to enable timer
var timerMode = "countdown"; //default or countdown mode
var timerAllSession = false; //true for whole session, false for one single questions
var coundownTimer = 25000; //countdown timer

//question property
var questionFontSize = 50;
var questionLineHeight = 58;
var questionColor = "#fff";
var questionTop = 25;
var questionLeft = 5;
var questionWidth = 90;
var questionHeight = 30;
var questionAlign = "center";

//video property
var videoTop = 15;
var videoLeft = 30;
var videoWidth = 40;
var videoHeight = 41;
var videoAutoplay = true;
var videoControls = true;

//answers property
var answerFontSize = 40;
var answerLineHeight = 40;
var answerColor = "#fff";
var answerAlign = "center";
var answerWidth = 30;
var answerHeight = 14;
var answerOffsetTop = -15;

var answerListsEnable = true; //enable answer list style
var answerLists = ["a) ", "b) ", "c) ", "d) ", "e) ", "f) ", "g) ", "h) "]; //answer list style format, maximum 8
var answerAnimationEnable = true; //enable answer animation

var answerButtonBgEnable = true; //toggle answer button background
var answerButtonBgRoundNumber = 15; //answer button background round corner number
var answerButtonBgColour = "#E57102"; //answer button background colour
var answerButtonBgShadowColour = "#C85E1C"; //answer button background shadow colour
var answeredButtonBgColour = "#964a03"; //answered button background colour
var answeredButtonBgShadowColour = "#dc4832"; //answered button background shadow colour
var wrongButtonBgColour = "#989898"; //answered button background colour
var wrongButtonBgShadowColour = "#666"; //answered button background shadow colour

var audioQuestionDelay = 300; //timer delay to play question audio
var audioAnswerDelay = 100; //timer delay to play answer audio

//inputs property
var inputFontSize = 40;
var inputLineHeight = 40;
var inputColor = "#333";
var inputBackground = "#fff";
var inputAlign = "center";
var inputWidth = 20;
var inputHeight = 12;
var inputTop = 50;
var inputLeft = 40;
var inputOffsetTop = -15;

//drag property
var dragRevertSpeed = 0.5; //revert speed
var dragListEnable = false; //enable drag answer list style
var dragDroppedAnswerAgain = true; //enable drag answer again after dropped
var dragRandomAnswer = true; //enable drag answer display in random sequence
var dropBorder = "#fff";
var dropStroke = "1px";
var dropBackground = "";

var dropLabelFontSize = 50;
var dropLabelLineHeight = 50;
var dropLabelColor = "#fff";
var dropLabelAlign = "right";
var dropLabelOffsetTop = -15;

//group drop property
var groupBorder = "#fff";
var groupStroke = "1px";
var groupBackground = "";
var groupDropMax = 4;
var groupDropWidth = 40;
var groupDropHeight = 30;
var groupDropOffLeft = 1;
var groupDropOffTop = 3;

var groupFontSize = 50;
var groupLineHeight = 50;
var groupColor = "#fff";
var groupAlign = "right";
var groupOffsetTop = -15;

//correct or wrong property
var correctDisplayText = "Correcto!";
var wrongDisplayText = "Incorrecto!";
var quesResultFontSize = 50;
var quesResultLineHeight = 50;
var quesResultColor = "#fff";
var quesResultTop = 30;
var quesResultLeft = 5;
var quesResultWidth = 90;
var quesResultHeight = 30;
var quesResultAlign = "center";

//explanation property
var explanationFontSize = 35;
var explanationLineHeight = 35;
var explanationColor = "#fff";
var explanationTop = 45;
var explanationLeft = 5;
var explanationWidth = 90;
var explanationHeight = 10;
var explanationAlign = "center";

//result
var scoreMode = "score"; //display result by 'score' or 'timer'
var scoreDisplayText = "Tu puntaje : [NUMBER]!"; //score result display text
var timerDisplayText = "Mejor tiempo : [NUMBER]!"; //timer result display text

//Social share, [SCORE] will replace with game score
var shareEnable = true; //toggle share
var shareTitle = "Mi mejor puntaje en EcoHouse quiz game es [SCORE]pts"; //social share score title
var shareMessage =
  "[SCORE] es mi nuevo puntaje mas alto en EcoHouse Quiz Game! Probalo ahora!"; //social share score message

/*!
 *
 * GAME SETTING CUSTOMIZATION END
 *
 */
$.editor = { enable: false };
var playerData = { score: 0, answered: false, answerType: "", answer_arr: [] };
var gameData = {
  page: "",
  questionNum: 0,
  sequenceNum: 0,
  categoryNum: 0,
  category_arr: [],
  categoryThumb_arr: [],
  sequence_arr: [],
  targetArray: null,
  targetAnswerSequence: null,
  mode: "landscape",
  oldMode: "landscape",
  build: false,
};
var storeData = { status: false, timerDate: 0 };

var quesLandscape_arr = [];
var quesPortrait_arr = [];
var quesLandscapeSequence_arr = [];
var quesPortraitSequence_arr = [];
var categoryData = { page: 1, total: 0, thumb: 16, max: 3 };

var audioLandscape_arr = [];
var audioPortrait_arr = [];
var audioData = { audioNum: 0, audioInterval: null };

var timeData = { enable: false, startDate: null, nowDate: null, timer: 0 };

/*!
 *
 * GAME BUTTONS - This is the function that runs to setup button event
 *
 */
function buildGameButton() {
  $("#buttonStart").click(function () {
    playSound("soundClick");
    if (categoryPage) {
      goPage("category");
    } else {
      goPage("game");
    }
  });

  $("#buttonNextCat").click(function () {
    playSound("soundClick");
    toggleCategory(true);
  });

  $("#buttonPrevCat").click(function () {
    playSound("soundClick");
    toggleCategory(false);
  });

  $("#buttonOk").click(function () {
    playSound("soundClick");
    toggleConfirm(false);
    goPage("main");
  });

  $("#buttonCancel").click(function () {
    playSound("soundClick");
    toggleConfirm(false);
  });

  $("#buttonNextQues").click(function () {
    playSound("soundClick");
    prepareNextQuestion();
  });

  $("#buttonPreviewQues").click(function () {
    playSound("soundClick");
    previewQuestion();
  });

  $("#buttonReplay").click(function () {
    playSound("soundClick");
    if (categoryPage) {
      goPage("category");
    } else {
      goPage("game");
    }
  });

  $("#buttonFacebook").click(function () {
    share("facebook");
  });

  $("#buttonTwitter").click(function () {
    share("twitter");
  });

  $("#buttonWhatsapp").click(function () {
    share("whatsapp");
  });

  $("#buttonOption").click(function () {
    playSound("soundClick");
    toggleGameOption();
  });

  $("#buttonSound").click(function () {
    playSound("soundClick");
    toggleGameMute();
  });

  $("#buttonFullscreen").click(function () {
    playSound("soundClick");
    toggleFullScreen();
  });

  $("#buttonExit").click(function () {
    playSound("soundClick");
    toggleGameOption();
    toggleConfirm(true);
  });

  $(window).focus(function () {
    //resizeGameDetail();
  });
}

/*!
 *
 * GAME STYLE - This is the function that runs to build game style
 *
 */
function buildGameStyle() {
  $(".preloadText").html(loaderText);

  $(".questionResultText").html(correctDisplayText);
  $(".questionResultText").css("font-size", quesResultFontSize + "px");
  $(".questionResultText").css("line-height", quesResultLineHeight + "px");

  $(".questionResultText").attr("data-fontSize", quesResultFontSize);
  $(".questionResultText").attr("data-lineHeight", quesResultLineHeight);
  $(".questionResultText").css("color", quesResultColor);

  $(".questionResultText").css("top", quesResultTop + "%");
  $(".questionResultText").css("left", quesResultLeft + "%");

  $(".questionResultText").css("width", quesResultWidth + "%");
  $(".questionResultText").css("height", quesResultHeight + "%");
  $(".questionResultText").css("text-align", quesResultAlign);

  if (!enableTimer) {
    $(".gameTimer").hide();
  }

  toggleConfirm(false);
}

/*!
 *
 * DISPLAY PAGES - This is the function that runs to display pages
 *
 */
function goPage(page) {
  gameData.page = page;
  $("#logoHolder").hide();
  $("#categoryHolder").hide();
  $("#gameHolder").hide();
  $("#resultHolder").hide();
  $("#buttonExit").show();

  var targetContainer = "";
  switch (page) {
    case "main":
      targetContainer = $("#logoHolder");
      $("#buttonExit").hide();
      break;

    case "category":
      targetContainer = $("#categoryHolder");
      break;

    case "game":
      targetContainer = $("#gameHolder");
      startGame();
      break;

    case "result":
      targetContainer = $("#resultHolder");
      if (!shareEnable) {
        $("#shareOption").hide();
      }

      playSound("soundResult");
      stopGame();
      if (scoreMode == "score") {
        $("#resultScore").html(
          scoreDisplayText.replace("[NUMBER]", playerData.score)
        );
        saveGame(playerData.score, gameData.category_arr[gameData.categoryNum]);
      } else if (scoreMode == "timer") {
        playerData.timer = timeData.timer;
        $("#resultScore").html(
          timerDisplayText.replace(
            "[NUMBER]",
            millisecondsToTime(playerData.timer)
          )
        );
        saveGame(playerData.timer, gameData.category_arr[gameData.categoryNum]);
      }

      goScorePage("");
      toggleSaveButton(true);
      break;
  }

  targetContainer.show();
  TweenMax.to(targetContainer, 0, { opacity: 0, overwrite: true });
  TweenMax.to(targetContainer, 1, { opacity: 1, overwrite: true });
  resizeGameDetail();
}

/*!
 *
 * BUILD CATEGORY - This is the function that runs to build category page
 *
 */
function buildCategory() {
  categoryData.thumb = gameData.category_arr.length;
  resetCategory();

  $("#categoryList").empty();
  for (var c = 0; c < categoryData.thumb; c++) {
    var thumbSrc = "assets/item_thumb.svg";
    if (gameData.categoryThumb_arr.length > 0) {
      for (var t = 0; t < gameData.categoryThumb_arr.length; t++) {
        if (gameData.category_arr[c] == gameData.categoryThumb_arr[t].name) {
          thumbSrc = gameData.categoryThumb_arr[t].src;
        }
      }
    }
    var categoryHTML =
      '<li class="categoryThumb buttonClick"><div><img src="' +
      thumbSrc +
      '" /></div><div class="categoryTitle fontCategory resizeFont"  data-fontSize="30" data-lineHeight="30">' +
      gameData.category_arr[c] +
      "</div></li>";
    $("#categoryList").append(categoryHTML);
  }

  $(".categoryThumb").click(function () {
    playSound("soundClick");
    gameData.categoryNum = $(this).index();
    goPage("game");
  });

  displayCategory();
}

function resetCategory() {
  if (gameData.mode == "portrait") {
    categoryData.max = 4;
  } else {
    categoryData.max = 3;
  }

  categoryData.total = categoryData.thumb / categoryData.max;
  if (String(categoryData.total).indexOf(".") > -1) {
    categoryData.total = Math.floor(categoryData.total) + 1;
  }

  displayCategory();
}

function toggleCategory(con) {
  if (con) {
    categoryData.page++;
    categoryData.page =
      categoryData.page > categoryData.total
        ? categoryData.total
        : categoryData.page;
  } else {
    categoryData.page--;
    categoryData.page = categoryData.page < 1 ? 1 : categoryData.page;
  }
  displayCategory();
}

function displayCategory() {
  var startPageNum = (categoryData.page - 1) * categoryData.max;
  var endPageNum = startPageNum + categoryData.max;
  $("#categoryList li").hide();
  $("#categoryList li").each(function (index, element) {
    if (index >= startPageNum && index < endPageNum) {
      $(this).show();
    }
  });
}

/*!
 *
 * FILTER CATEGORY - This is the function that runs to filter category
 *
 */
function filterCategoryQuestion() {
  gameData.sequence_arr = [];
  for (n = 0; n < gameData.targetArray.length; n++) {
    gameData.sequence_arr.push(n);
  }

  if ($.editor.enable) {
    return;
  }

  //do nothing if category page is off
  if (!categoryPage) {
    return;
  }

  //do nothing if category all is selected
  if (
    categoryAllOption &&
    gameData.category_arr[gameData.categoryNum] == categoryAllText
  ) {
    return;
  }

  //filter the category
  gameData.sequence_arr = [];
  for (n = 0; n < gameData.targetArray.length; n++) {
    if (
      gameData.category_arr[gameData.categoryNum] ==
      gameData.targetArray[n].category
    ) {
      gameData.sequence_arr.push(n);
    }
  }
}

/*!
 *
 * START GAME - This is the function that runs to start play game
 *
 */
function startGame() {
  gameData.questionNum = 0;
  gameData.sequenceNum = 0;
  playerData.score = 0;

  timeData.accumulate = 0;
  timeData.countdown = coundownTimer;
  updateTimerDisplay(true);

  $("#gameStatus .gameQuestionStatus").html("");
  toggleResult(true);

  filterCategoryQuestion();
  if (enableRandomQuestion && !$.editor.enable) {
    shuffle(gameData.sequence_arr);
  }
  loadQuestion();
}

/*!
 *
 * STOP GAME - This is the function that runs to stop play game
 *
 */
function stopGame() {
  TweenMax.killAll(false, true, false);
  $(".questionHolder").remove();
}

function saveGame(score, type) {
  /*$.ajax({
      type: "POST",
      url: 'saveResults.php',
      data: {score:score},
      success: function (result) {
          console.log(result);
      }
    });*/
}

/*!
 *
 * LOAD QUESTION - This is the function that runs to load new question
 *
 */
function loadQuestion() {
  $("#questionHolder").show();
  $("#questionResultHolder").hide();

  storeData.timerDate = 0;
  storeData.status = false;

  toggleQuestionLoader(true);
  resetQuestion();
  fileFest = [];
  gameData.build = false;
  playerData.answered = false;
  gameData.sequenceNum = gameData.sequence_arr[gameData.questionNum];

  var randomAnswerLayout = false;
  if (enableRandomAnswer && !$.editor.enable) {
    randomAnswerLayout = true;
  }

  if (
    gameData.targetArray[gameData.sequenceNum].drag == "true" &&
    dragRandomAnswer &&
    !$.editor.enable
  ) {
    randomAnswerLayout = true;
  }

  //landscape & portrait
  quesLandscapeSequence_arr = [];
  quesPortraitSequence_arr = [];

  audioLandscape_arr = [];
  audioPortrait_arr = [];

  for (var t = 0; t < 2; t++) {
    var loopTargetArray = t == 0 ? quesLandscape_arr : quesPortrait_arr;
    var loopTargetSeqArray =
      t == 0 ? quesLandscapeSequence_arr : quesPortraitSequence_arr;
    var loopAudioArray = t == 0 ? audioLandscape_arr : audioPortrait_arr;
    var thisMode = t == 0 ? "landscape" : "portrait";

    var submitButton = -1;
    for (
      var n = 0;
      n < loopTargetArray[gameData.sequenceNum].answer.length;
      n++
    ) {
      if (
        loopTargetArray[gameData.sequenceNum].answer[n].submit == "false" ||
        loopTargetArray[gameData.sequenceNum].answer[n].submit == undefined
      ) {
        loopTargetSeqArray.push(n);
      } else {
        submitButton = n;
      }
    }

    if (loopTargetArray[gameData.sequenceNum].background != "") {
      fileFest.push({
        src: loopTargetArray[gameData.sequenceNum].background,
        id: thisMode + "backgroundImage",
        type: createjs.LoadQueue.IMAGE,
      });
    }

    if (loopTargetArray[gameData.sequenceNum].type == "image") {
      fileFest.push({
        src: loopTargetArray[gameData.sequenceNum].question,
        id: thisMode + "questionImage",
        type: createjs.LoadQueue.IMAGE,
      });
    }

    var questionAudio = loopTargetArray[gameData.sequenceNum].audio;
    questionAudio = questionAudio == undefined ? "" : questionAudio;

    if (questionAudio != "") {
      loopAudioArray.push({
        type: "question",
        id: thisMode + "questionAudio",
        list: 0,
      });
      fileFest.push({
        src: loopTargetArray[gameData.sequenceNum].audio,
        id: thisMode + "questionAudio",
      });
    }

    if (randomAnswerLayout) {
      shuffle(loopTargetSeqArray);
    }
    if (submitButton != -1) {
      loopTargetSeqArray.push(submitButton);
    }

    for (
      var n = 0;
      n < loopTargetArray[gameData.sequenceNum].groups.length;
      n++
    ) {
      var groupAudio = loopTargetArray[gameData.sequenceNum].groups[n].audio;
      groupAudio = groupAudio == undefined ? "" : groupAudio;

      if (groupAudio != "") {
        loopAudioArray.push({
          type: "group",
          id: thisMode + "groupAudio" + n,
          list: n,
        });
        fileFest.push({
          src: loopTargetArray[gameData.sequenceNum].groups[n].audio,
          id: thisMode + "groupAudio" + n,
        });
      }
    }

    for (
      var n = 0;
      n < loopTargetArray[gameData.sequenceNum].answer.length;
      n++
    ) {
      if (loopTargetArray[gameData.sequenceNum].answer[n].type == "image") {
        fileFest.push({
          src: loopTargetArray[gameData.sequenceNum].answer[n].text,
          id: thisMode + "answerImage" + n,
          type: createjs.LoadQueue.IMAGE,
        });
      }

      if (
        loopTargetArray[gameData.sequenceNum].answer[n].dropLabelType == "image"
      ) {
        fileFest.push({
          src: loopTargetArray[gameData.sequenceNum].answer[n].dropLabelText,
          id: thisMode + "answerLabelImage" + n,
          type: createjs.LoadQueue.IMAGE,
        });
      }

      var answerNum = loopTargetSeqArray[n];
      var answerAudio =
        loopTargetArray[gameData.sequenceNum].answer[answerNum].audio;
      answerAudio = answerAudio == undefined ? "" : answerAudio;

      if (
        answerAudio != "" &&
        checkBoolean(
          loopTargetArray[gameData.sequenceNum].answer[answerNum].dragEnable
        )
      ) {
        loopAudioArray.push({
          type: "answer",
          id: thisMode + "answerAudio" + answerNum,
          list: n,
        });
        fileFest.push({
          src: loopTargetArray[gameData.sequenceNum].answer[answerNum].audio,
          id: thisMode + "answerAudio" + answerNum,
        });
      }
    }

    for (
      var n = 0;
      n < loopTargetArray[gameData.sequenceNum].input.length;
      n++
    ) {
      if (loopTargetArray[gameData.sequenceNum].input[n].type == "image") {
        fileFest.push({
          src: loopTargetArray[gameData.sequenceNum].input[n].text,
          id: thisMode + "inputImage" + n,
          type: createjs.LoadQueue.IMAGE,
        });
      }
    }

    if (loopTargetArray[gameData.sequenceNum].explanationType == "image") {
      fileFest.push({
        src: loopTargetArray[gameData.sequenceNum].explanation,
        id: thisMode + "explanationImage",
        type: createjs.LoadQueue.IMAGE,
      });
    }

    var explanationAudio =
      loopTargetArray[gameData.sequenceNum].explanationAudio;
    explanationAudio = explanationAudio == undefined ? "" : explanationAudio;

    if (explanationAudio != "") {
      loopAudioArray.push({
        type: "explanation",
        id: thisMode + "explanationAudio",
        list: 0,
      });
      fileFest.push({
        src: loopTargetArray[gameData.sequenceNum].explanationAudio,
        id: thisMode + "explanationAudio",
      });
    }
  }

  if (fileFest.length > 0) {
    loadQuestionAssets();
  } else {
    buildQuestion();
  }
}

/*!
 *
 * BUILD QUESTION - This is the function that runs to build question
 *
 */
function buildQuestion() {
  toggleQuestionLoader(false);
  stopAudio();
  toggleAudioInterval(false);
  audioData.audioNum = 0;
  resetQuestion();

  if (gameData.mode == "landscape") {
    gameData.targetArray = quesLandscape_arr;
    gameData.targetAnswerSequence = quesLandscapeSequence_arr;
    gameData.targetAudio = audioLandscape_arr;
  } else {
    gameData.targetArray = quesPortrait_arr;
    gameData.targetAnswerSequence = quesPortraitSequence_arr;
    gameData.targetAudio = audioPortrait_arr;
  }

  //total display
  var curQuestionText = questionTotalDisplay.replace(
    "[NUMBER]",
    gameData.questionNum + 1
  );
  if (totalQuestions != 0) {
    var totalMax =
      totalQuestions > gameData.sequence_arr.length
        ? gameData.sequence_arr.length
        : totalQuestions;
    curQuestionText = curQuestionText.replace("[TOTAL]", totalMax);
  } else {
    curQuestionText = curQuestionText.replace(
      "[TOTAL]",
      gameData.sequence_arr.length
    );
  }
  $("#gameStatus .gameQuestionStatus").html(curQuestionText);

  buildBackground();

  //questions
  var value = getArrayValue("question");
  if (value.type == "image") {
    var questionHTML =
      '<div class="question fontQuestion fitImg" style="top:' +
      value.top +
      "%; left:" +
      value.left +
      "%; width:" +
      value.width +
      '%; "><img src="' +
      gameData.targetArray[gameData.sequenceNum].question +
      '" /></div>';
  } else {
    var questionHTML =
      '<div class="question fontQuestion resizeFont" data-fontSize="' +
      value.fontSize +
      '" data-lineHeight="' +
      value.lineHeight +
      '" style="font-size:' +
      value.fontSize +
      "px; line-height:" +
      value.lineHeight +
      "px; color:" +
      value.color +
      ";  text-align:" +
      value.align +
      "; top:" +
      value.top +
      "%; left:" +
      value.left +
      "%; width:" +
      value.width +
      "%; height:" +
      value.height +
      '%; ">' +
      gameData.targetArray[gameData.sequenceNum].question +
      "</div>";
  }
  $("#questionHolder").append(questionHTML);

  buildGroups();
  buildAnswers();
  buildInputs();
  buildVideo();
  buildExplanation();
  gameData.build = true;
  resizeGameDetail();

  if (playerData.answered) {
    presetAnswered();
    return;
  }

  if (gameData.targetAudio.length == 0) {
    initAnimateAnswers();
  } else if (
    gameData.targetAudio.length == 1 &&
    gameData.targetAudio[0].type == "question"
  ) {
    initAnimateAnswers();
  }

  if ($.editor.enable) {
    if (edit.con == "explanation") {
      $("#questionResultHolder").show();
      $("#questionHolder").hide();
      playerData.answered = true;
      playAudioLoop("explanation");
      $("#explanationHolder").show();
    }
    setBorderFocus();
  }

  if ($.editor.enable && !edit.replay) {
    return;
  }

  updateTimerDisplay(false);
  $("#questionHolder").css("opacity", 0);
  TweenMax.to($("#questionHolder"), 0.5, {
    alpha: 1,
    overwrite: true,
    onComplete: function () {
      if (gameData.targetAudio.length > 0) {
        playAudioLoop();
      }

      toggleGameTimer(true);
      storeData.status = true;
    },
  });
}

function resetQuestion() {
  $("#questionHolder").empty();
  $("#explanationHolder").empty();
}

function buildBackground() {
  //questions
  var value = getArrayValue("background");
  if (value.image != "") {
    var bgHolderHTML = '<div id="bgHolder"></div>';
    $("#questionHolder").append(bgHolderHTML);

    var backgroundHTML =
      '<div class="background fitImg" style="top:' +
      value.top +
      "%; left:" +
      value.left +
      "%; width:" +
      value.width +
      '%; "><img src="' +
      gameData.targetArray[gameData.sequenceNum].background +
      '" /></div>';
    $("#bgHolder").append(backgroundHTML);
  }
}

/*!
 *
 * GET ARRAY VALUE - This is the function that runs to get array value
 *
 */
function getArrayValue(type, answerNum, n) {
  var value = {
    type: "",
    submit: "",
    text: "",
    top: "",
    left: "",
    width: "",
    height: "",
    fontSize: "",
    lineHeight: "",
    color: "",
    background: "",
    align: "",
    correctAnswer: "",
  };

  if (type == "background") {
    value.image = gameData.targetArray[gameData.sequenceNum].background;
    value.top = !checkValue(
      gameData.targetArray[gameData.sequenceNum].backgroundTop
    )
      ? 0
      : gameData.targetArray[gameData.sequenceNum].backgroundTop;
    value.left = !checkValue(
      gameData.targetArray[gameData.sequenceNum].backgroundLeft
    )
      ? 0
      : gameData.targetArray[gameData.sequenceNum].backgroundLeft;
    value.width = !checkValue(
      gameData.targetArray[gameData.sequenceNum].backgroundWidth
    )
      ? 100
      : gameData.targetArray[gameData.sequenceNum].backgroundWidth;
    value.height = !checkValue(
      gameData.targetArray[gameData.sequenceNum].backgroundHeight
    )
      ? 100
      : gameData.targetArray[gameData.sequenceNum].backgroundHeight;
  } else if (type == "question") {
    value.type = gameData.targetArray[gameData.sequenceNum].type;
    value.top = !checkValue(gameData.targetArray[gameData.sequenceNum].top)
      ? questionTop
      : gameData.targetArray[gameData.sequenceNum].top;
    value.left = !checkValue(gameData.targetArray[gameData.sequenceNum].left)
      ? questionLeft
      : gameData.targetArray[gameData.sequenceNum].left;
    value.width = !checkValue(gameData.targetArray[gameData.sequenceNum].width)
      ? questionWidth
      : gameData.targetArray[gameData.sequenceNum].width;
    value.height = !checkValue(
      gameData.targetArray[gameData.sequenceNum].height
    )
      ? questionHeight
      : gameData.targetArray[gameData.sequenceNum].height;
    value.fontSize = !checkValue(
      gameData.targetArray[gameData.sequenceNum].fontSize
    )
      ? questionFontSize
      : gameData.targetArray[gameData.sequenceNum].fontSize;
    value.lineHeight = !checkValue(
      gameData.targetArray[gameData.sequenceNum].lineHeight
    )
      ? questionLineHeight
      : gameData.targetArray[gameData.sequenceNum].lineHeight;
    value.color = !checkValue(gameData.targetArray[gameData.sequenceNum].color)
      ? questionColor
      : gameData.targetArray[gameData.sequenceNum].color;
    value.align = !checkValue(gameData.targetArray[gameData.sequenceNum].align)
      ? questionAlign
      : gameData.targetArray[gameData.sequenceNum].align;
  } else if (type == "video") {
    value.embed =
      gameData.targetArray[gameData.sequenceNum].videos[answerNum].embed;
    value.top = !checkValue(
      gameData.targetArray[gameData.sequenceNum].videos[answerNum].top
    )
      ? videoTop
      : gameData.targetArray[gameData.sequenceNum].videos[answerNum].top;
    value.left = !checkValue(
      gameData.targetArray[gameData.sequenceNum].videos[answerNum].left
    )
      ? videoLeft
      : gameData.targetArray[gameData.sequenceNum].videos[answerNum].left;
    value.width = !checkValue(
      gameData.targetArray[gameData.sequenceNum].videos[answerNum].width
    )
      ? videoWidth
      : gameData.targetArray[gameData.sequenceNum].videos[answerNum].width;
    value.height = !checkValue(
      gameData.targetArray[gameData.sequenceNum].videos[answerNum].height
    )
      ? videoHeight
      : gameData.targetArray[gameData.sequenceNum].videos[answerNum].height;
    value.autoplay = !checkValue(
      gameData.targetArray[gameData.sequenceNum].videos[answerNum].autoplay
    )
      ? videoAutoplay
      : gameData.targetArray[gameData.sequenceNum].videos[answerNum].autoplay;
    value.controls = !checkValue(
      gameData.targetArray[gameData.sequenceNum].videos[answerNum].controls
    )
      ? videoControls
      : gameData.targetArray[gameData.sequenceNum].videos[answerNum].controls;
  } else if (type == "answer") {
    value.submit =
      gameData.targetArray[gameData.sequenceNum].answer[answerNum].submit;
    value.type =
      gameData.targetArray[gameData.sequenceNum].answer[answerNum].type;
    value.text =
      gameData.targetArray[gameData.sequenceNum].answer[answerNum].text;
    value.top = !checkValue(
      gameData.targetArray[gameData.sequenceNum].answer[n].top
    )
      ? questionTop
      : gameData.targetArray[gameData.sequenceNum].answer[n].top;
    value.left = !checkValue(
      gameData.targetArray[gameData.sequenceNum].answer[n].left
    )
      ? questionLeft
      : gameData.targetArray[gameData.sequenceNum].answer[n].left;
    value.width = !checkValue(
      gameData.targetArray[gameData.sequenceNum].answer[n].width
    )
      ? answerWidth
      : gameData.targetArray[gameData.sequenceNum].answer[n].width;
    value.height = !checkValue(
      gameData.targetArray[gameData.sequenceNum].answer[n].height
    )
      ? answerHeight
      : gameData.targetArray[gameData.sequenceNum].answer[n].height;
    value.fontSize = !checkValue(
      gameData.targetArray[gameData.sequenceNum].answer[n].fontSize
    )
      ? answerFontSize
      : gameData.targetArray[gameData.sequenceNum].answer[n].fontSize;
    value.lineHeight = !checkValue(
      gameData.targetArray[gameData.sequenceNum].answer[n].lineHeight
    )
      ? answerLineHeight
      : gameData.targetArray[gameData.sequenceNum].answer[n].lineHeight;
    value.color = !checkValue(
      gameData.targetArray[gameData.sequenceNum].answer[n].color
    )
      ? answerColor
      : gameData.targetArray[gameData.sequenceNum].answer[n].color;
    value.align = !checkValue(
      gameData.targetArray[gameData.sequenceNum].answer[n].align
    )
      ? answerAlign
      : gameData.targetArray[gameData.sequenceNum].answer[n].align;
    value.offsetTop = !checkValue(
      gameData.targetArray[gameData.sequenceNum].answer[n].offsetTop
    )
      ? answerOffsetTop
      : gameData.targetArray[gameData.sequenceNum].answer[n].offsetTop;

    value.dragEnable =
      gameData.targetArray[gameData.sequenceNum].answer[answerNum].dragEnable ==
      "false"
        ? false
        : true;
    value.dropEnable =
      gameData.targetArray[gameData.sequenceNum].answer[answerNum].dropEnable ==
      "false"
        ? false
        : true;
    value.dropLabelType =
      gameData.targetArray[gameData.sequenceNum].answer[
        answerNum
      ].dropLabelType;
    value.dropLabelText = !checkValue(
      gameData.targetArray[gameData.sequenceNum].answer[answerNum].dropLabelText
    )
      ? ""
      : gameData.targetArray[gameData.sequenceNum].answer[answerNum]
          .dropLabelText;
    value.dropLabelTop = !checkValue(
      gameData.targetArray[gameData.sequenceNum].answer[n].dropLabelTop
    )
      ? 0
      : gameData.targetArray[gameData.sequenceNum].answer[n].dropLabelTop;
    value.dropLabelLeft = !checkValue(
      gameData.targetArray[gameData.sequenceNum].answer[n].dropLabelLeft
    )
      ? 0
      : gameData.targetArray[gameData.sequenceNum].answer[n].dropLabelLeft;
    value.dropLabelWidth = !checkValue(
      gameData.targetArray[gameData.sequenceNum].answer[n].dropLabelWidth
    )
      ? 0
      : gameData.targetArray[gameData.sequenceNum].answer[n].dropLabelWidth;
    value.dropLabelHeight = !checkValue(
      gameData.targetArray[gameData.sequenceNum].answer[n].dropLabelHeight
    )
      ? 0
      : gameData.targetArray[gameData.sequenceNum].answer[n].dropLabelHeight;
    value.dropLabelFontSize = !checkValue(
      gameData.targetArray[gameData.sequenceNum].answer[n].dropLabelFontSize
    )
      ? dropLabelFontSize
      : gameData.targetArray[gameData.sequenceNum].answer[n].dropLabelFontSize;
    value.dropLabelLineHeight = !checkValue(
      gameData.targetArray[gameData.sequenceNum].answer[n].dropLabelLineHeight
    )
      ? dropLabelLineHeight
      : gameData.targetArray[gameData.sequenceNum].answer[n]
          .dropLabelLineHeight;
    value.dropLabelColor = !checkValue(
      gameData.targetArray[gameData.sequenceNum].answer[n].dropLabelColor
    )
      ? dropLabelColor
      : gameData.targetArray[gameData.sequenceNum].answer[n].dropLabelColor;
    value.dropLabelAlign = !checkValue(
      gameData.targetArray[gameData.sequenceNum].answer[n].dropLabelAlign
    )
      ? dropLabelAlign
      : gameData.targetArray[gameData.sequenceNum].answer[n].dropLabelAlign;
    value.dropLabelOffsetTop = !checkValue(
      gameData.targetArray[gameData.sequenceNum].answer[n].dropLabelOffsetTop
    )
      ? dropLabelOffsetTop
      : gameData.targetArray[gameData.sequenceNum].answer[n].dropLabelOffsetTop;

    value.dropLeft = !checkValue(
      gameData.targetArray[gameData.sequenceNum].answer[n].dropLeft
    )
      ? questionLeft
      : gameData.targetArray[gameData.sequenceNum].answer[n].dropLeft;
    value.dropTop = !checkValue(
      gameData.targetArray[gameData.sequenceNum].answer[n].dropTop
    )
      ? questionTop
      : gameData.targetArray[gameData.sequenceNum].answer[n].dropTop;
    value.dropWidth = !checkValue(
      gameData.targetArray[gameData.sequenceNum].answer[n].dropWidth
    )
      ? answerWidth
      : gameData.targetArray[gameData.sequenceNum].answer[n].dropWidth;
    value.dropHeight = !checkValue(
      gameData.targetArray[gameData.sequenceNum].answer[n].dropHeight
    )
      ? answerHeight
      : gameData.targetArray[gameData.sequenceNum].answer[n].dropHeight;

    value.dropOffLeft = !checkValue(
      gameData.targetArray[gameData.sequenceNum].answer[n].dropOffLeft
    )
      ? 0
      : gameData.targetArray[gameData.sequenceNum].answer[n].dropOffLeft;
    value.dropOffTop = !checkValue(
      gameData.targetArray[gameData.sequenceNum].answer[n].dropOffTop
    )
      ? 0
      : gameData.targetArray[gameData.sequenceNum].answer[n].dropOffTop;
  } else if (type == "input") {
    value.type =
      gameData.targetArray[gameData.sequenceNum].input[answerNum].type;
    value.submit =
      gameData.targetArray[gameData.sequenceNum].input[answerNum].submit;
    value.correctAnswer =
      gameData.targetArray[gameData.sequenceNum].input[answerNum].correctAnswer;
    value.top = !checkValue(
      gameData.targetArray[gameData.sequenceNum].input[answerNum].top
    )
      ? inputTop
      : gameData.targetArray[gameData.sequenceNum].input[answerNum].top;
    value.left = !checkValue(
      gameData.targetArray[gameData.sequenceNum].input[answerNum].left
    )
      ? inputLeft
      : gameData.targetArray[gameData.sequenceNum].input[answerNum].left;
    value.width = !checkValue(
      gameData.targetArray[gameData.sequenceNum].input[answerNum].width
    )
      ? inputWidth
      : gameData.targetArray[gameData.sequenceNum].input[answerNum].width;
    value.height = !checkValue(
      gameData.targetArray[gameData.sequenceNum].input[answerNum].height
    )
      ? inputHeight
      : gameData.targetArray[gameData.sequenceNum].input[answerNum].height;
    value.fontSize = !checkValue(
      gameData.targetArray[gameData.sequenceNum].input[answerNum].fontSize
    )
      ? inputFontSize
      : gameData.targetArray[gameData.sequenceNum].input[answerNum].fontSize;
    value.lineHeight = !checkValue(
      gameData.targetArray[gameData.sequenceNum].input[answerNum].lineHeight
    )
      ? inputLineHeight
      : gameData.targetArray[gameData.sequenceNum].input[answerNum].lineHeight;
    value.color = !checkValue(
      gameData.targetArray[gameData.sequenceNum].input[answerNum].color
    )
      ? inputColor
      : gameData.targetArray[gameData.sequenceNum].input[answerNum].color;
    value.background = !checkValue(
      gameData.targetArray[gameData.sequenceNum].input[answerNum].background
    )
      ? inputBackground
      : gameData.targetArray[gameData.sequenceNum].input[answerNum].background;
    value.align = !checkValue(
      gameData.targetArray[gameData.sequenceNum].input[answerNum].align
    )
      ? inputAlign
      : gameData.targetArray[gameData.sequenceNum].input[answerNum].align;
    value.offsetTop = !checkValue(
      gameData.targetArray[gameData.sequenceNum].input[answerNum].offsetTop
    )
      ? inputOffsetTop
      : gameData.targetArray[gameData.sequenceNum].input[answerNum].offsetTop;
  } else if (type == "explanation") {
    value.type = gameData.targetArray[gameData.sequenceNum].explanationType;
    value.top = !checkValue(
      gameData.targetArray[gameData.sequenceNum].explanationTop
    )
      ? explanationTop
      : gameData.targetArray[gameData.sequenceNum].explanationTop;
    value.left = !checkValue(
      gameData.targetArray[gameData.sequenceNum].explanationLeft
    )
      ? explanationLeft
      : gameData.targetArray[gameData.sequenceNum].explanationLeft;
    value.width = !checkValue(
      gameData.targetArray[gameData.sequenceNum].explanationWidth
    )
      ? explanationWidth
      : gameData.targetArray[gameData.sequenceNum].explanationWidth;
    value.height = !checkValue(
      gameData.targetArray[gameData.sequenceNum].explanationHeight
    )
      ? explanationHeight
      : gameData.targetArray[gameData.sequenceNum].explanationHeight;
    value.fontSize = !checkValue(
      gameData.targetArray[gameData.sequenceNum].explanationFontSize
    )
      ? explanationFontSize
      : gameData.targetArray[gameData.sequenceNum].explanationFontSize;
    value.lineHeight = !checkValue(
      gameData.targetArray[gameData.sequenceNum].explanationLineHeight
    )
      ? explanationLineHeight
      : gameData.targetArray[gameData.sequenceNum].explanationLineHeight;
    value.color = !checkValue(
      gameData.targetArray[gameData.sequenceNum].explanationColor
    )
      ? explanationColor
      : gameData.targetArray[gameData.sequenceNum].explanationColor;
    value.align = !checkValue(
      gameData.targetArray[gameData.sequenceNum].explanationAlign
    )
      ? explanationAlign
      : gameData.targetArray[gameData.sequenceNum].explanationAlign;
  } else if (type == "group") {
    value.correctAnswer =
      gameData.targetArray[gameData.sequenceNum].groups[n].correctAnswer;
    value.dropMax = !checkValue(
      gameData.targetArray[gameData.sequenceNum].groups[n].dropMax
    )
      ? groupDropMax
      : gameData.targetArray[gameData.sequenceNum].groups[n].dropMax;
    value.dropTop = !checkValue(
      gameData.targetArray[gameData.sequenceNum].groups[n].dropTop
    )
      ? 0
      : gameData.targetArray[gameData.sequenceNum].groups[n].dropTop;
    value.dropLeft = !checkValue(
      gameData.targetArray[gameData.sequenceNum].groups[n].dropLeft
    )
      ? 0
      : gameData.targetArray[gameData.sequenceNum].groups[n].dropLeft;
    value.dropWidth = !checkValue(
      gameData.targetArray[gameData.sequenceNum].groups[n].dropWidth
    )
      ? groupDropWidth
      : gameData.targetArray[gameData.sequenceNum].groups[n].dropWidth;
    value.dropHeight = !checkValue(
      gameData.targetArray[gameData.sequenceNum].groups[n].dropHeight
    )
      ? groupDropHeight
      : gameData.targetArray[gameData.sequenceNum].groups[n].dropHeight;

    value.dropOffLeft = !checkValue(
      gameData.targetArray[gameData.sequenceNum].groups[n].dropOffLeft
    )
      ? groupDropOffLeft
      : gameData.targetArray[gameData.sequenceNum].groups[n].dropOffLeft;
    value.dropOffTop = !checkValue(
      gameData.targetArray[gameData.sequenceNum].groups[n].dropOffTop
    )
      ? groupDropOffTop
      : gameData.targetArray[gameData.sequenceNum].groups[n].dropOffTop;

    value.type = gameData.targetArray[gameData.sequenceNum].groups[n].type;
    value.text = !checkValue(
      gameData.targetArray[gameData.sequenceNum].groups[n].text
    )
      ? ""
      : gameData.targetArray[gameData.sequenceNum].groups[n].text;
    value.top = !checkValue(
      gameData.targetArray[gameData.sequenceNum].groups[n].top
    )
      ? 0
      : gameData.targetArray[gameData.sequenceNum].groups[n].top;
    value.left = !checkValue(
      gameData.targetArray[gameData.sequenceNum].groups[n].left
    )
      ? 0
      : gameData.targetArray[gameData.sequenceNum].groups[n].left;
    value.width = !checkValue(
      gameData.targetArray[gameData.sequenceNum].groups[n].width
    )
      ? 0
      : gameData.targetArray[gameData.sequenceNum].groups[n].width;
    value.height = !checkValue(
      gameData.targetArray[gameData.sequenceNum].groups[n].height
    )
      ? 0
      : gameData.targetArray[gameData.sequenceNum].groups[n].height;
    value.fontSize = !checkValue(
      gameData.targetArray[gameData.sequenceNum].groups[n].fontSize
    )
      ? groupFontSize
      : gameData.targetArray[gameData.sequenceNum].groups[n].fontSize;
    value.lineHeight = !checkValue(
      gameData.targetArray[gameData.sequenceNum].groups[n].lineHeight
    )
      ? groupLineHeight
      : gameData.targetArray[gameData.sequenceNum].groups[n].lineHeight;
    value.color = !checkValue(
      gameData.targetArray[gameData.sequenceNum].groups[n].color
    )
      ? groupColor
      : gameData.targetArray[gameData.sequenceNum].groups[n].color;
    value.align = !checkValue(
      gameData.targetArray[gameData.sequenceNum].groups[n].align
    )
      ? groupAlign
      : gameData.targetArray[gameData.sequenceNum].groups[n].align;
    value.offsetTop = !checkValue(
      gameData.targetArray[gameData.sequenceNum].groups[n].offsetTop
    )
      ? groupOffsetTop
      : gameData.targetArray[gameData.sequenceNum].groups[n].offsetTop;
  }

  return value;
}

function checkValue(value) {
  if (value == undefined || value == "") {
    return false;
  } else {
    return true;
  }
}

/*!
 *
 * AUDIO - This is the function that runs to play question and answer audio
 *
 */
function playAudioLoop(con) {
  if (gameData.targetAudio.length <= 0) {
    return;
  }

  toggleAudioInterval(false);
  if (con == "explanation") {
    audioData.audioNum = gameData.targetAudio.length - 1;
    if (
      gameData.targetAudio[audioData.audioNum].type == "explanation" &&
      playerData.answered
    ) {
      TweenMax.to(audioData, 1, {
        overwrite: true,
        onComplete: function () {
          playAudio(gameData.targetAudio[audioData.audioNum].id);
        },
      });
    }
  } else {
    if (gameData.targetAudio[audioData.audioNum].type == "question") {
      playAudio(gameData.targetAudio[audioData.audioNum].id);
    } else if (gameData.targetAudio[audioData.audioNum].type == "group") {
      playAudio(gameData.targetAudio[audioData.audioNum].id);
    } else if (gameData.targetAudio[audioData.audioNum].type == "answer") {
      playAudio(gameData.targetAudio[audioData.audioNum].id);
      animateAnswer(gameData.targetAudio[audioData.audioNum].list);
    }
  }
}

function playAudioComplete() {
  audioData.audioNum++;
  if (audioData.audioNum < gameData.targetAudio.length) {
    toggleAudioInterval(true);
  }
}

function toggleAudioInterval(con) {
  if (con) {
    var audioTimer = audioAnswerDelay;
    if (
      gameData.targetAudio.length > 0 &&
      gameData.targetAudio[audioData.audioNum].type == "question"
    ) {
      audioTimer = audioQuestionDelay;
    }
    audioData.audioInterval = setInterval(function () {
      playAudioLoop();
    }, audioTimer);
  } else {
    TweenMax.killTweensOf(audioData);
    clearInterval(audioData.audioInterval);
    audioData.audioInterval = null;
  }
}

/*!
 *
 * BUILD VIDEO - This is the function that runs to build video
 *
 */
function buildVideo() {
  if (gameData.targetArray[gameData.sequenceNum].videos[0] == undefined) {
    return;
  }
  if (gameData.targetArray[gameData.sequenceNum].videos[0].types.length <= 0) {
    return;
  }

  var value = getArrayValue("video", 0);
  var videoProperty = "";
  var videoWrapperHTML =
    '<div id="videoHolder" style="top:' +
    value.top +
    "%; left:" +
    value.left +
    "%; width:" +
    value.width +
    "%; height:" +
    value.height +
    '%;">';

  if (value.embed == "youtube") {
    for (
      var n = 0;
      n < gameData.targetArray[gameData.sequenceNum].videos[0].types.length;
      n++
    ) {
      videoWrapperHTML +=
        gameData.targetArray[gameData.sequenceNum].videos[0].types[n].src;
    }
    videoWrapperHTML += "</div>";
  } else {
    if (value.autoplay == "true" || value.autoplay == true) {
      videoProperty += " autoplay";
    }
    if (value.controls == "true" || value.controls == true) {
      videoProperty += " controls";
    }
    videoWrapperHTML +=
      '<video width="100%" height="100%"' + videoProperty + ">";
    for (
      var n = 0;
      n < gameData.targetArray[gameData.sequenceNum].videos[0].types.length;
      n++
    ) {
      videoWrapperHTML +=
        '<source src="' +
        gameData.targetArray[gameData.sequenceNum].videos[0].types[n].src +
        '" type="' +
        gameData.targetArray[gameData.sequenceNum].videos[0].types[n].type +
        '">';
    }
    videoWrapperHTML += "Your browser does not support the video tag.";
    videoWrapperHTML += "</video>";
    videoWrapperHTML += "</div>";
  }

  $("#questionHolder").append(videoWrapperHTML);
  if (value.embed == "youtube") {
    $("#videoHolder iframe").attr(
      "data-src",
      $("#videoHolder iframe").attr("src")
    );
  }
}

/*!
 *
 * BUILD GROUP - This is the function that runs to build groups
 *
 */
function buildGroups() {
  if (gameData.targetArray[gameData.sequenceNum].groups.length <= 0) {
    return;
  }

  var groupHolderHTML = '<div id="groupHolder"></div>';
  $("#questionHolder").append(groupHolderHTML);

  for (
    n = 0;
    n < gameData.targetArray[gameData.sequenceNum].groups.length;
    n++
  ) {
    var value = getArrayValue("group", n, n);

    //label
    if (value.type == "image") {
      var groupLabelWrapperHTML =
        "<div id='groupLabel" +
        n +
        "' class='groupDropLabel fitImg' style='width:" +
        value.width +
        "%; height:" +
        value.height +
        "%; top:" +
        value.top +
        "%; left:" +
        value.left +
        "%;'><img src='" +
        value.text +
        "' /></div>";
    } else {
      var groupLabelWrapperHTML =
        "<div id='groupLabel" +
        n +
        "' class='groupDropLabel fontAnswer resizeFont' data-fontSize='" +
        value.fontSize +
        "' data-lineHeight='" +
        value.lineHeight +
        "' style='width:" +
        value.width +
        "%; height:" +
        value.height +
        "%; top:" +
        value.top +
        "%; left:" +
        value.left +
        "%; font-size:" +
        value.fontSize +
        "px; line-height:" +
        value.lineHeight +
        "px; color:" +
        value.color +
        "; text-align:" +
        value.align +
        ";'>" +
        value.text +
        "</div>";
    }

    $("#groupHolder").append(groupLabelWrapperHTML);

    //drop group
    var dropLeft = Number(value.dropLeft) + Number(value.dropOffLeft);
    var dropTop = Number(value.dropTop) + Number(value.dropOffTop);

    var groupDropWrapperHTML =
      "<div id='groupDrop" +
      n +
      "' class='groupDrop' style='width:" +
      value.dropWidth +
      "%; height:" +
      value.dropHeight +
      "%; top:" +
      value.dropTop +
      "%; left:" +
      value.dropLeft +
      "%; border:" +
      groupBorder +
      " solid " +
      groupStroke +
      "; background:" +
      groupBackground +
      ";' data-left='" +
      dropLeft +
      "%' data-top='" +
      dropTop +
      "%' data-offleft='" +
      value.dropOffLeft +
      "%' data-offtop='" +
      value.dropOffTop +
      "%' data-width='" +
      value.dropWidth +
      "%' data-height='" +
      value.dropHeight +
      "%' data-max='" +
      value.dropMax +
      "' data-answer='" +
      value.correctAnswer +
      "' data-id='" +
      n +
      "'></div>";

    $("#groupHolder").append(groupDropWrapperHTML);
  }
}

/*!
 *
 * BUILD ANSWERS - This is the function that runs to build answers
 *
 */
function buildAnswers() {
  if (gameData.targetArray[gameData.sequenceNum].answer.length <= 0) {
    return;
  }

  var answerHolderHTML = '<div id="answerHolder"></div>';
  $("#questionHolder").append(answerHolderHTML);
  playerData.answerType = "select";
  if (gameData.targetArray[gameData.sequenceNum].drag == "true") {
    playerData.answerType = "drag";
  }

  var answerArray = gameData.targetArray[gameData.sequenceNum].correctAnswer
    .split(",")
    .map(function (item) {
      return parseInt(item, 10);
    });

  playerData.correctAnswer = [];
  for (
    n = 0;
    n < gameData.targetArray[gameData.sequenceNum].answer.length;
    n++
  ) {
    var answerNum = gameData.targetAnswerSequence[n];
    if (
      answerArray.indexOf(answerNum + 1) != -1 &&
      playerData.answerType != "drag"
    ) {
      playerData.correctAnswer.push(n + 1);
    }

    var value = getArrayValue("answer", answerNum, n);
    var dragLabel = getArrayValue("answer", n, n);

    if (value.type == "image") {
      var answerHTML =
        '<div id="answer' +
        n +
        '" class="answer fitImg buttonClick" style="top:' +
        value.top +
        "%; left:" +
        value.left +
        "%; width:" +
        value.width +
        '%; "><img src="' +
        value.text +
        '" /></div>';
      $("#answerHolder").append(answerHTML);
    } else {
      var curAnswerList = "";
      if (answerListsEnable) {
        curAnswerList = answerLists[n];
      }
      if (value.submit == "true") {
        curAnswerList = "";
      }

      if (playerData.answerType == "drag" && !dragListEnable) {
        curAnswerList = "";
      }

      var answerWrapperHTML =
        "<div id='answer" +
        n +
        "' class='answer resizeBorder' data-border='" +
        answerButtonBgRoundNumber +
        "' style='border-radius: " +
        answerButtonBgRoundNumber +
        "px " +
        answerButtonBgRoundNumber +
        "px " +
        answerButtonBgRoundNumber +
        "px " +
        answerButtonBgRoundNumber +
        "px; -moz-border-radius: " +
        answerButtonBgRoundNumber +
        "px " +
        answerButtonBgRoundNumber +
        "px " +
        answerButtonBgRoundNumber +
        "px " +
        answerButtonBgRoundNumber +
        "px; -webkit-border-radius: " +
        answerButtonBgRoundNumber +
        "px " +
        answerButtonBgRoundNumber +
        "px " +
        answerButtonBgRoundNumber +
        "px " +
        answerButtonBgRoundNumber +
        "px; width:" +
        value.width +
        "%; height:" +
        value.height +
        "%; top:" +
        value.top +
        "%; left:" +
        value.left +
        "%;'></div>";

      $("#answerHolder").append(answerWrapperHTML);

      if (answerButtonBgEnable) {
        var backgroundShadowHTML =
          "<div class='shadow resizeBorder' data-border='" +
          answerButtonBgRoundNumber +
          "' style='border-radius: " +
          answerButtonBgRoundNumber +
          "px " +
          answerButtonBgRoundNumber +
          "px " +
          answerButtonBgRoundNumber +
          "px " +
          answerButtonBgRoundNumber +
          "px; -moz-border-radius: " +
          answerButtonBgRoundNumber +
          "px " +
          answerButtonBgRoundNumber +
          "px " +
          answerButtonBgRoundNumber +
          "px " +
          answerButtonBgRoundNumber +
          "px; -webkit-border-radius: " +
          answerButtonBgRoundNumber +
          "px " +
          answerButtonBgRoundNumber +
          "px " +
          answerButtonBgRoundNumber +
          "px " +
          answerButtonBgRoundNumber +
          "px; background:" +
          answerButtonBgShadowColour +
          "; width:100%; height:100%; position:absolute; top:" +
          value.offsetTop +
          "%; left:0;'></div>";
        $("#answer" + n).append(backgroundShadowHTML);

        var backgroundHTML =
          "<div class='background resizeBorder' data-border='" +
          answerButtonBgRoundNumber +
          "' style='border-radius: " +
          answerButtonBgRoundNumber +
          "px " +
          answerButtonBgRoundNumber +
          "px " +
          answerButtonBgRoundNumber +
          "px " +
          answerButtonBgRoundNumber +
          "px; -moz-border-radius: " +
          answerButtonBgRoundNumber +
          "px " +
          answerButtonBgRoundNumber +
          "px " +
          answerButtonBgRoundNumber +
          "px " +
          answerButtonBgRoundNumber +
          "px; -webkit-border-radius: " +
          answerButtonBgRoundNumber +
          "px " +
          answerButtonBgRoundNumber +
          "px " +
          answerButtonBgRoundNumber +
          "px " +
          answerButtonBgRoundNumber +
          "px; background:" +
          answerButtonBgColour +
          "; width:100%; height:85%; position:absolute; top:" +
          value.offsetTop +
          "%; left:0;'></div>";
        $("#answer" + n).append(backgroundHTML);
      }

      var answerHTML =
        '<div id="text' +
        n +
        '" class="fontAnswer resizeFont" data-fontSize="' +
        value.fontSize +
        '" data-lineHeight="' +
        value.lineHeight +
        '" style="position:relative; font-size:' +
        value.fontSize +
        "px; line-height:" +
        value.lineHeight +
        "px; color:" +
        value.color +
        ";  text-align:" +
        value.align +
        ';">' +
        curAnswerList +
        value.text +
        "</div>";
      $("#answer" + n).append(answerHTML);

      var clickHTML =
        "<div class='buttonClick resizeBorder' data-border='" +
        answerButtonBgRoundNumber +
        "' style='position:absolute; border-radius: " +
        answerButtonBgRoundNumber +
        "px " +
        answerButtonBgRoundNumber +
        "px " +
        answerButtonBgRoundNumber +
        "px " +
        answerButtonBgRoundNumber +
        "px; -moz-border-radius: " +
        answerButtonBgRoundNumber +
        "px " +
        answerButtonBgRoundNumber +
        "px " +
        answerButtonBgRoundNumber +
        "px " +
        answerButtonBgRoundNumber +
        "px; -webkit-border-radius: " +
        answerButtonBgRoundNumber +
        "px " +
        answerButtonBgRoundNumber +
        "px " +
        answerButtonBgRoundNumber +
        "px " +
        answerButtonBgRoundNumber +
        "px; width:100%; height:100%; position:absolute; top:" +
        value.offsetTop +
        "%;'></div>";
      $("#answer" + n).append(clickHTML);
    }

    $("#answer" + n).attr("data-id", n);
    $("#answer" + n).attr("data-type", value.type);
    $("#answer" + n).attr("data-submit", value.submit);

    if (playerData.answerType == "drag" && value.submit != "true") {
      if (gameData.targetArray[gameData.sequenceNum].groups.length > 0) {
        $("#answer" + n).attr("data-ori-id", answerNum + 1);
        $("#answer" + n).attr("data-top", value.top + "%");
        $("#answer" + n).attr("data-left", value.left + "%");
        $("#answer" + n).addClass("groupDrag");
      } else {
        if (value.dragEnable) {
          $("#answer" + n).addClass("dragActive");
        } else {
          $("#answer" + n).hide();
        }

        //drop label
        if (dragLabel.dropLabelType == "image") {
          var answerDropLabelWrapperHTML =
            "<div id='dropLabel" +
            n +
            "' class='dropLabel fitImg' style='width:" +
            dragLabel.dropLabelWidth +
            "%; height:" +
            dragLabel.dropLabelHeight +
            "%; top:" +
            dragLabel.dropLabelTop +
            "%; left:" +
            dragLabel.dropLabelLeft +
            "%;'><img src='" +
            dragLabel.dropLabelText +
            "' /></div>";
        } else {
          var answerDropLabelWrapperHTML =
            "<div id='dropLabel" +
            n +
            "' class='dropLabel fontAnswer resizeFont' data-fontSize='" +
            dragLabel.dropLabelFontSize +
            "' data-lineHeight='" +
            dragLabel.dropLabelLineHeight +
            "' style='width:" +
            dragLabel.dropLabelWidth +
            "%; height:" +
            dragLabel.dropLabelHeight +
            "%; top:" +
            dragLabel.dropLabelTop +
            "%; left:" +
            dragLabel.dropLabelLeft +
            "%; font-size:" +
            dragLabel.dropLabelFontSize +
            "px; line-height:" +
            dragLabel.dropLabelLineHeight +
            "px; color:" +
            dragLabel.dropLabelColor +
            "; text-align:" +
            dragLabel.dropLabelAlign +
            ";'>" +
            dragLabel.dropLabelText +
            "</div>";
        }

        $("#answerHolder").append(answerDropLabelWrapperHTML);

        //drop group
        var dropLeft = Number(value.dropLeft) + Number(value.dropOffLeft);
        var dropTop = Number(value.dropTop) + Number(value.dropOffTop);

        var answerDropWrapperHTML =
          "<div id='drop" +
          n +
          "' class='drop' style='width:" +
          value.dropWidth +
          "%; height:" +
          value.dropHeight +
          "%; top:" +
          value.dropTop +
          "%; left:" +
          value.dropLeft +
          "%; border:" +
          dropBorder +
          " solid " +
          dropStroke +
          "; background:" +
          dropBackground +
          ";' data-left='" +
          dropLeft +
          "%' data-top='" +
          dropTop +
          "%'></div>";

        if (dragLabel.dropEnable) {
          $("#answerHolder").append(answerDropWrapperHTML);
        }

        $("#answer" + n).attr("data-top", value.top + "%");
        $("#answer" + n).attr("data-left", value.left + "%");
        $("#answer" + n).attr("data-answer", answerNum);
        $("#answer" + n).addClass("drag");
      }
    }

    buildAnswerEvent("#answer" + n);
  }

  if (playerData.answerType == "drag") {
    setDragIndex();
  }
}

/*!
 *
 * BUILD INPUTS - This is the function that runs to build inputs
 *
 */
function buildInputs() {
  if (gameData.targetArray[gameData.sequenceNum].input.length <= 0) {
    return;
  }

  var answerHolderHTML = '<div id="inputHolder"></div>';
  $("#questionHolder").append(answerHolderHTML);
  playerData.answerType = "input";

  for (
    n = 0;
    n < gameData.targetArray[gameData.sequenceNum].input.length;
    n++
  ) {
    var value = getArrayValue("input", n);

    if (value.submit == "true") {
      if (value.type == "image") {
        var inputHTML =
          '<div id="input' +
          n +
          '" class="input fitImg buttonClick" style="top:' +
          value.top +
          "%; left:" +
          value.left +
          "%; width:" +
          value.width +
          '%; "><img src="' +
          gameData.targetArray[gameData.sequenceNum].input[n].text +
          '" /></div>';
        $("#inputHolder").append(answerHTML);
        buildInputEvent("#input" + n);
      } else if (value.type == "text") {
        var inputWrapperHTML =
          "<div id='input" +
          n +
          "' class='input resizeFont resizeBorder' data-border='" +
          answerButtonBgRoundNumber +
          "' style='border-radius: " +
          answerButtonBgRoundNumber +
          "px " +
          answerButtonBgRoundNumber +
          "px " +
          answerButtonBgRoundNumber +
          "px " +
          answerButtonBgRoundNumber +
          "px; -moz-border-radius: " +
          answerButtonBgRoundNumber +
          "px " +
          answerButtonBgRoundNumber +
          "px " +
          answerButtonBgRoundNumber +
          "px " +
          answerButtonBgRoundNumber +
          "px; -webkit-border-radius: " +
          answerButtonBgRoundNumber +
          "px " +
          answerButtonBgRoundNumber +
          "px " +
          answerButtonBgRoundNumber +
          "px " +
          answerButtonBgRoundNumber +
          "px; width:" +
          value.width +
          "%; height:" +
          value.height +
          "%; top:" +
          value.top +
          "%; left:" +
          value.left +
          "%;'></div>";

        $("#inputHolder").append(inputWrapperHTML);

        if (answerButtonBgEnable) {
          var backgroundShadowHTML =
            "<div class='shadow resizeBorder' data-border='" +
            answerButtonBgRoundNumber +
            "' style='border-radius: " +
            answerButtonBgRoundNumber +
            "px " +
            answerButtonBgRoundNumber +
            "px " +
            answerButtonBgRoundNumber +
            "px " +
            answerButtonBgRoundNumber +
            "px; -moz-border-radius: " +
            answerButtonBgRoundNumber +
            "px " +
            answerButtonBgRoundNumber +
            "px " +
            answerButtonBgRoundNumber +
            "px " +
            answerButtonBgRoundNumber +
            "px; -webkit-border-radius: " +
            answerButtonBgRoundNumber +
            "px " +
            answerButtonBgRoundNumber +
            "px " +
            answerButtonBgRoundNumber +
            "px " +
            answerButtonBgRoundNumber +
            "px; background:" +
            answerButtonBgShadowColour +
            "; width:100%; height:100%; position:absolute; top:" +
            value.offsetTop +
            "%; left:0;'></div>";
          $("#input" + n).append(backgroundShadowHTML);

          var backgroundHTML =
            "<div class='background resizeBorder' data-border='" +
            answerButtonBgRoundNumber +
            "' style='border-radius: " +
            answerButtonBgRoundNumber +
            "px " +
            answerButtonBgRoundNumber +
            "px " +
            answerButtonBgRoundNumber +
            "px " +
            answerButtonBgRoundNumber +
            "px; -moz-border-radius: " +
            answerButtonBgRoundNumber +
            "px " +
            answerButtonBgRoundNumber +
            "px " +
            answerButtonBgRoundNumber +
            "px " +
            answerButtonBgRoundNumber +
            "px; -webkit-border-radius: " +
            answerButtonBgRoundNumber +
            "px " +
            answerButtonBgRoundNumber +
            "px " +
            answerButtonBgRoundNumber +
            "px " +
            answerButtonBgRoundNumber +
            "px; background:" +
            answerButtonBgColour +
            "; width:100%; height:85%; position:absolute; top:" +
            value.offsetTop +
            "%; left:0;'></div>";
          $("#input" + n).append(backgroundHTML);
        }

        var inputHTML =
          '<div id="text' +
          n +
          '" class="fontAnswer resizeFont" data-fontSize="' +
          value.fontSize +
          '" data-lineHeight="' +
          value.lineHeight +
          '" style="position:relative; font-size:' +
          value.fontSize +
          "px; line-height:" +
          value.lineHeight +
          "px; color:" +
          value.color +
          "; text-align:" +
          value.align +
          ';">' +
          gameData.targetArray[gameData.sequenceNum].input[n].text +
          "</div>";
        $("#input" + n).append(inputHTML);

        var clickHTML =
          "<div class='buttonClick resizeBorder' data-border='" +
          answerButtonBgRoundNumber +
          "' style='border-radius: " +
          answerButtonBgRoundNumber +
          "px " +
          answerButtonBgRoundNumber +
          "px " +
          answerButtonBgRoundNumber +
          "px " +
          answerButtonBgRoundNumber +
          "px; -moz-border-radius: " +
          answerButtonBgRoundNumber +
          "px " +
          answerButtonBgRoundNumber +
          "px " +
          answerButtonBgRoundNumber +
          "px " +
          answerButtonBgRoundNumber +
          "px; -webkit-border-radius: " +
          answerButtonBgRoundNumber +
          "px " +
          answerButtonBgRoundNumber +
          "px " +
          answerButtonBgRoundNumber +
          "px " +
          answerButtonBgRoundNumber +
          "px; width:100%; height:100%; position:absolute; top:" +
          value.offsetTop +
          "%;'></div>";
        $("#input" + n).append(clickHTML);

        buildInputEvent("#input" + n);
      }
    } else {
      if (value.type == "blank") {
        //input
        var inputWrapperHTML =
          "<input id='input" +
          n +
          "' class='input fontInput' type='text' style='font-size:" +
          value.fontSize +
          "px; line-height:" +
          value.lineHeight +
          "px; color:" +
          value.color +
          "; background:" +
          value.background +
          "; text-align:" +
          value.align +
          "; width:" +
          value.width +
          "%; height:" +
          value.height +
          "%; top:" +
          value.top +
          "%; left:" +
          value.left +
          "%;' placeholder='" +
          gameData.targetArray[gameData.sequenceNum].input[n].text +
          "'></input>";

        $("#inputHolder").append(inputWrapperHTML);
      }
    }

    $("#input" + n).attr("data-id", n);
    $("#input" + n).attr("data-type", value.type);
    $("#input" + n).attr("data-answer", value.correctAnswer);
  }
}

/*!
 *
 * INIT ANIMATE ANSWERS - This is the function that runs to animate answers
 *
 */
function initAnimateAnswers() {
  var animateDelayNum = 0.5;
  for (
    var n = 0;
    n < gameData.targetArray[gameData.sequenceNum].answer.length;
    n++
  ) {
    if (answerAnimationEnable) {
      $("#answer" + n).css("opacity", 0);
      TweenMax.to($("#answer" + n), 0, {
        delay: animateDelayNum,
        scaleX: 1,
        scaleY: 1,
        overwrite: true,
        ease: Elastic.easeOut,
        onComplete: animateAnswer,
        onCompleteParams: [n],
      });
      animateDelayNum += 0.3;
    }
  }
}

function animateAnswer(n) {
  var scaleNum = 0.7;
  var speedNum = 1.3;
  TweenMax.to($("#answer" + n), 0, {
    scaleX: 0.5,
    scaleY: 0.5,
    overwrite: true,
  });
  TweenMax.to($("#answer" + n), speedNum, {
    alpha: 1,
    scaleX: 1,
    scaleY: 1,
    overwrite: true,
    ease: Elastic.easeOut,
  });
}

/*!
 *
 * BUILD EXPLANATION - This is the function that runs to build explanation
 *
 */
function buildExplanation() {
  var value = getArrayValue("explanation");
  if (value.type == "image") {
    var explanationHTML =
      '<div class="explanation fontExplanation fitImg" style="top:' +
      value.top +
      "%; left:" +
      value.left +
      "%; width:" +
      value.width +
      '%; "><img src="' +
      gameData.targetArray[gameData.sequenceNum].explanation +
      '" /></div>';
  } else {
    var explanationHTML =
      '<div class="explanation fontExplanation resizeFont" data-fontSize="' +
      value.fontSize +
      '" data-lineHeight="' +
      value.lineHeight +
      '" style="font-size:' +
      value.fontSize +
      "px; line-height:" +
      value.lineHeight +
      "px; color:" +
      value.color +
      ";  text-align:" +
      value.align +
      "; top:" +
      value.top +
      "%; left:" +
      value.left +
      "%; width:" +
      value.width +
      "%; height:" +
      value.height +
      '%; ">' +
      gameData.targetArray[gameData.sequenceNum].explanation +
      "</div>";
  }
  $("#explanationHolder").append(explanationHTML);
}

/*!
 *
 * BUILD ANSWER EVENT - This is the function that runs to build answer event
 *
 */
function buildAnswerEvent(obj) {
  if (!$.editor.enable) {
    if ($(obj).hasClass("groupDrag")) {
      $(".groupDrag").droppable({
        accept: ".groupDrag",
        greedy: true,
        drop: function (event, ui) {
          var targetDrop = $("#groupDrop" + $(this).attr("data-drop-id"));
          updateGroupID(targetDrop, $(this), false);
          revertPosition($(this));
        },
      });

      $(".groupDrag").draggable({
        start: function (event, ui) {
          setDragIndex($(this));
        },
        stop: function () {
          setGroupPosition();
          revertPosition($(this));
        },
      });

      $(".groupDrop").droppable({
        accept: ".groupDrag",
        greedy: false,
        drop: function (event, ui) {
          updateGroupID($(this), $(ui.draggable), true);
        },
        out: function (event, ui) {
          updateGroupID($(this), $(ui.draggable), false);
        },
      });
    } else if ($(obj).hasClass("drag")) {
      $(".drag").draggable({
        start: function () {
          if ($(this).hasClass("occupied")) {
            if (dragDroppedAnswerAgain) {
              $(this).removeClass("occupied");
              playerData.correctAnswer.splice(1, 0);

              var currentID = $(this).attr("id");
              $(".drop").each(function (index, element) {
                if ($(this).attr("data-drag-id") == currentID) {
                  $(this).attr("data-drag-id", "");
                }
              });
            } else {
              return false;
            }
          } else {
            setDragIndex($(this));
          }

          setDragIndex($(this));
        },
        stop: function () {
          revertPosition($(this));
        },
      });

      $(".drop").droppable({
        accept: ".drag",
        drop: function (event, ui) {
          if ($(this).hasClass("occupied")) {
            var lastDrag = $("#" + $(this).attr("data-drag-id"));
            lastDrag.removeClass("occupied");
            revertPosition(lastDrag);
          } else {
            playerData.correctAnswer.push(0);
          }

          $(ui.draggable).addClass("occupied");
          $(ui.draggable).attr("data-top-drop", $(this).attr("data-top"));
          $(ui.draggable).attr("data-left-drop", $(this).attr("data-left"));

          $(this).attr("data-drag-id", ui.draggable.attr("id"));
          $(this).addClass("occupied");
        },
      });
    } else {
      $(obj).click(function () {
        if (
          playerData.answerType == "drag" &&
          $("#groupHolder .groupDrop").length
        ) {
          //group drag
          var totalGroup = 0;
          var totalDrop = 0;
          $("#groupHolder .groupDrop").each(function (index, element) {
            var groupArray = $(this).attr("data-group");
            var dropMax = Number($(this).attr("data-max"));

            if (dropMax > 0) {
              totalDrop++;
            }

            groupArray = groupArray == undefined ? [] : groupArray.split(",");
            if (groupArray.length > 0) {
              totalGroup++;
            }
          });

          //alert(totalGroup+' : '+totalDrop);
          if (totalGroup > 0) {
            $(".groupDrag").draggable("disable");
            $(".groupDrop").droppable("disable");
            focusTapAnswer(
              $(this).attr("data-id"),
              $(this).attr("data-type"),
              "true",
              true
            );
          }
        } else if (playerData.answerType == "drag") {
          //drag
          var totalDrop = $(".drop").length;
          var totalDrag = $(".dragActive").length;

          var proceedCon = false;
          if (totalDrag < totalDrop) {
            if (playerData.correctAnswer.length == $(".dragActive").length) {
              proceedCon = true;
            }
          } else {
            if (playerData.correctAnswer.length == $(".drop").length) {
              proceedCon = true;
            }
          }

          if (proceedCon) {
            $(".drag").draggable("disable");
            $(".drop").droppable("disable");
            focusTapAnswer(
              $(this).attr("data-id"),
              $(this).attr("data-type"),
              "true",
              true
            );
          }
        } else if (playerData.correctAnswer.length > 1) {
          focusTapAnswer(
            $(this).attr("data-id"),
            $(this).attr("data-type"),
            $(this).attr("data-submit"),
            true
          );
        } else {
          focusTapAnswer(
            $(this).attr("data-id"),
            $(this).attr("data-type"),
            "true",
            false
          );
        }
      });
    }
  }
}

function updateGroupID(obj, target, con) {
  var groupName =
    playerData.answered == true ? "data-groupanswered" : "data-group";
  var groupArray = obj.attr(groupName);
  groupArray = groupArray == undefined ? [] : groupArray.split(",");

  if (con) {
    /*if(groupArray.length >= Number(obj.attr('data-max'))){
			return;
		}*/

    target.attr("data-drop-id", obj.attr("data-id"));
    target.addClass("occupied");
    groupArray.push(target.attr("data-id"));
  } else {
    target.removeAttr("data-drop-id");
    target.removeClass("occupied");
    var removeIndex = groupArray.indexOf(target.attr("data-id"));
    if (removeIndex != -1) groupArray.splice(removeIndex, 1);
  }

  groupArray = unique(groupArray);
  if (groupArray.length == 0) {
    obj.removeAttr(groupName);
  } else {
    obj.attr(groupName, groupArray);
  }
}

function removeGroupID(index, target) {
  var groupName =
    playerData.answered == true ? "data-groupanswered" : "data-group";
  $("#groupHolder .groupDrop").each(function (dropIndex, dropElement) {
    if (index != dropIndex) {
      var groupArray = $(this).attr(groupName);
      groupArray = groupArray == undefined ? [] : groupArray.split(",");

      var removeIndex = groupArray.indexOf(target.attr("data-id"));
      if (removeIndex != -1) {
        groupArray.splice(removeIndex, 1);
      }

      if (groupArray.length == 0) {
        $(dropElement).removeAttr(groupName);
      } else {
        $(dropElement).attr(groupName, groupArray);
      }
    }
  });
}

function setGroupPosition() {
  var groupName =
    playerData.answered == true ? "data-groupanswered" : "data-group";
  $("#groupHolder .groupDrop").each(function (index, element) {
    var maxItem = Number($(this).attr("data-max"));
    var currentOffTop = Number($(this).attr("data-offtop").replace("%", ""));
    var currentOffLeft = Number($(this).attr("data-offleft").replace("%", ""));
    var currentTop = Number($(this).attr("data-top").replace("%", ""));
    var currentLeft = Number($(this).attr("data-left").replace("%", ""));
    var currentWidth = Number($(this).attr("data-width").replace("%", ""));
    var currentHeight = Number($(this).attr("data-height").replace("%", ""));

    var startTop = currentTop;
    var startLeft = currentLeft;

    var groupArray = $(this).attr(groupName);
    groupArray = groupArray == undefined ? [] : groupArray.split(",");

    for (var n = 0; n < groupArray.length; n++) {
      if (n < maxItem) {
        $("#answer" + groupArray[n]).attr("data-top-drop", startTop + "%");
        $("#answer" + groupArray[n]).attr("data-left-drop", startLeft + "%");
        revertPosition($("#answer" + groupArray[n]));

        startLeft += Number(
          (
            ($("#answer" + groupArray[n]).outerWidth() /
              $("#answerHolder").outerWidth()) *
            100
          ).toFixed()
        );
        startLeft += currentOffLeft;

        if (Number(startLeft + 10) >= Number(currentLeft + currentWidth)) {
          startLeft = currentLeft;
          startTop += Number(
            (
              ($("#answer" + groupArray[n]).outerHeight() /
                $("#answerHolder").outerHeight()) *
              100
            ).toFixed()
          );
          startTop += currentOffTop / 2;
        }
      } else {
        var targetDrop = $(
          "#groupDrop" + $("#answer" + groupArray[n]).attr("data-drop-id")
        );
        updateGroupID(targetDrop, $("#answer" + groupArray[n]), false);
      }
    }
  });
}

function setDragIndex(obj) {
  $(".answer").each(function (index, element) {
    $(this).css("z-index", 10);
  });

  if (obj != undefined) {
    obj.css("z-index", 11);
  }
}

function revertPosition(obj) {
  if (obj.hasClass("occupied")) {
    TweenMax.to(obj, dragRevertSpeed, {
      css: { left: obj.attr("data-left-drop"), top: obj.attr("data-top-drop") },
    });
  } else {
    TweenMax.to(obj, dragRevertSpeed, {
      css: { left: obj.attr("data-left"), top: obj.attr("data-top") },
    });
  }
}

/*!
 *
 * BUILD INPUT EVENT - This is the function that runs to build input event
 *
 */
function buildInputEvent(obj) {
  if (!$.editor.enable) {
    $(obj).click(function () {
      checkInputAnswer();
    });
  }
}

/*!
 *
 * FOCUS ANSWER ANIMATION - This is the function that runs to focus on answer animation
 *
 */

function focusTapAnswer(n, type, submit, hide) {
  if (!playerData.answered) {
    stopAudio();
    toggleAudioInterval(false);
    playSound("soundSelectAnswer");

    if (submit == "true") {
      //for draggable, input and multiple choice answers
      toggleGameTimer(false);
      playerData.answered = true;
      if (hide) {
        $("#answer" + n).hide();
      }
    }

    //reset animation
    $("#answerHolder .answer").each(function (index, element) {
      TweenMax.to($(this), 0, {
        scaleX: 1,
        scaleY: 1,
        alpha: 1,
        overwrite: true,
      });
    });

    //asnwer selected button colour
    var currentBgColor = answeredButtonBgColour;
    var currentBgShadowColor = answeredButtonBgShadowColour;
    var curScaleNum = 0.5;

    if ($("#answer" + n).hasClass("answerFocus")) {
      $("#answer" + n).removeClass("answerFocus");
      currentBgColor = answerButtonBgColour;
      currentBgShadowColor = answerButtonBgShadowColour;
    } else {
      $("#answer" + n).addClass("answerFocus");
    }

    $("#answer" + n)
      .find(".background")
      .css("background", currentBgColor);
    $("#answer" + n)
      .find(".shadow")
      .css("background", currentBgShadowColor);

    //answer selected image effect
    if (playerData.answerType != "drag") {
      $("#answerHolder .answer").each(function (index, element) {
        if ($(this).attr("data-type") == "image") {
          $(this).css("opacity", 0.5);
          if ($(this).hasClass("answerFocus")) {
            $(this).css("opacity", 1);
          }
        }
      });
    }

    //select animation
    TweenMax.to($("#answer" + n), 0, {
      scaleX: curScaleNum,
      scaleY: curScaleNum,
      overwrite: true,
    });
    TweenMax.to($("#answer" + n), 1, {
      scaleX: 1,
      scaleY: 1,
      overwrite: true,
      ease: Elastic.easeOut,
      onComplete: function () {
        if (playerData.answered) {
          playerData.answer_arr = [];
          if (playerData.answerType == "drag" && $(".groupDrop").length) {
            $("#answerHolder .answer").each(function (index, element) {
              if ($(this).attr("data-type") == "image") {
                $(this).css("opacity", 1);
              }
            });

            if (enableRevealAnswer && !checkAnswerCorrect()) {
              $("#groupHolder .groupDrop").each(function (
                dropIndex,
                dropElement
              ) {
                var groupArray = $(this).attr("data-group");
                if (groupArray != undefined) {
                  $(this).attr(
                    "data-groupanswered",
                    $(this).attr("data-group")
                  );
                }
              });

              var revertPos = [];
              $("#answerHolder .answer").each(function (index, element) {
                var answerOriID = $(this).attr("data-ori-id");
                var answerID = $(this).attr("data-id");
                var targetAnswer = $(this);

                if (answerOriID != undefined) {
                  //not submit button

                  var foundInGroup = false;
                  $("#groupHolder .groupDrop").each(function (
                    dropIndex,
                    dropElement
                  ) {
                    var groupAnswerArray = $(this)
                      .attr("data-answer")
                      .split(",");
                    var groupArray = $(this).attr("data-groupanswered");
                    groupArray =
                      groupArray == undefined ? [] : groupArray.split(",");

                    var answerInCorrectGroup = groupAnswerArray.indexOf(
                      answerOriID
                    );
                    var answerInGroup = groupArray.indexOf(String(answerID));

                    if (answerInCorrectGroup != -1 && !foundInGroup) {
                      foundInGroup = true;

                      //is in the  group
                      if (answerInGroup == -1) {
                        if (targetAnswer.attr("data-type") == "image") {
                          targetAnswer.css("opacity", 0.8);
                        }
                        targetAnswer.removeClass("answerFocus");
                        targetAnswer
                          .find(".background")
                          .css("background", wrongButtonBgColour);
                        targetAnswer
                          .find(".shadow")
                          .css("background", wrongButtonBgShadowColour);

                        targetAnswer.removeClass("occupied");
                        removeGroupID(dropIndex, targetAnswer);
                        updateGroupID($(dropElement), targetAnswer, true);
                      }
                    }
                  });

                  if (!foundInGroup) {
                    targetAnswer.removeClass("answerFocus");
                    targetAnswer
                      .find(".background")
                      .css("background", wrongButtonBgColour);
                    targetAnswer
                      .find(".shadow")
                      .css("background", wrongButtonBgShadowColour);

                    removeGroupID(-1, targetAnswer);
                    targetAnswer.removeClass("occupied");
                    revertPos.push(targetAnswer);
                  }

                  TweenMax.to(targetAnswer, 0, {
                    delay: 1,
                    overwrite: true,
                    onComplete: function () {
                      displayQuestionResult();
                    },
                  });
                }
              });

              setGroupPosition();
              for (var n = 0; n < revertPos.length; n++) {
                revertPosition(revertPos[n]);
              }
            } else {
              displayQuestionResult();
            }
          } else if (playerData.answerType == "drag") {
            //drag
            $("#answerHolder .answer").each(function (index, element) {
              if ($(this).attr("data-type") == "image") {
                $(this).css("opacity", 1);
              }
            });

            if (enableRevealAnswer && !checkAnswerCorrect()) {
              $("#answerHolder .answer").each(function (index, element) {
                var answerNum = $(this).attr("data-answer");
                if ($("#drop" + answerNum).length == 0) {
                  var targetAnswer = $(this);
                  if (targetAnswer.attr("data-type") == "image") {
                    targetAnswer.css("opacity", 0.8);
                  }
                  targetAnswer.removeClass("answerFocus");
                  targetAnswer
                    .find(".background")
                    .css("background", wrongButtonBgColour);
                  targetAnswer
                    .find(".shadow")
                    .css("background", wrongButtonBgShadowColour);
                }
              });

              $("#answerHolder .drop").each(function (index, element) {
                var dropID = $(this)
                  .attr("id")
                  .substring(4, $(this).attr("id").length);
                var dragID = $("#" + $(this).attr("data-drag-id")).attr(
                  "data-answer"
                );

                var targetAnswer = $("#" + $(this).attr("data-drag-id"));
                if (dropID != dragID) {
                  if (targetAnswer.attr("data-type") == "image") {
                    targetAnswer.css("opacity", 0.8);
                  }
                  targetAnswer.removeClass("answerFocus");
                  targetAnswer
                    .find(".background")
                    .css("background", wrongButtonBgColour);
                  targetAnswer
                    .find(".shadow")
                    .css("background", wrongButtonBgShadowColour);
                }

                TweenMax.to(targetAnswer, 0, {
                  delay: 1,
                  overwrite: true,
                  onComplete: function () {
                    displayQuestionResult();
                  },
                });
              });

              $("#answerHolder .answer").each(function (index, element) {
                var answerNum = $(this).attr("data-answer");
                if ($("#drop" + answerNum).length) {
                  $(this).addClass("occupied");
                  $(this).attr(
                    "data-top-drop",
                    $("#drop" + answerNum).attr("data-top")
                  );
                  $(this).attr(
                    "data-left-drop",
                    $("#drop" + answerNum).attr("data-left")
                  );
                } else {
                  $(this).removeClass("occupied");
                }
                revertPosition($(this));
              });
            } else {
              displayQuestionResult();
            }
          } else {
            //others
            $("#answerHolder .answer").each(function (index, element) {
              if ($(this).hasClass("answerFocus")) {
                if (
                  $(this).attr("data-submit") == undefined ||
                  $(this).attr("data-submit") == "false"
                ) {
                  playerData.answer_arr.push(Number($(this).attr("data-id")));
                }
              }
            });

            if (enableRevealAnswer && !checkAnswerCorrect()) {
              $("#answerHolder .answer").each(function (index, element) {
                if ($(this).attr("data-type") == "image") {
                  $(this).css("opacity", 0.5);
                }
              });

              for (var n = 0; n < playerData.answer_arr.length; n++) {
                var currentAnswer = playerData.answer_arr[n];
                $("#answer" + currentAnswer).removeClass("answerFocus");
                $("#answer" + currentAnswer)
                  .find(".background")
                  .css("background", wrongButtonBgColour);
                $("#answer" + currentAnswer)
                  .find(".shadow")
                  .css("background", wrongButtonBgShadowColour);
              }

              for (var n = 0; n < playerData.correctAnswer.length; n++) {
                var currentAnswer = playerData.correctAnswer[n] - 1;
                $("#answer" + currentAnswer).addClass("answerFocus");
                $("#answer" + currentAnswer)
                  .find(".background")
                  .css("background", answeredButtonBgColour);
                $("#answer" + currentAnswer)
                  .find(".shadow")
                  .css("background", answeredButtonBgShadowColour);

                TweenMax.to($("#answer" + currentAnswer), 0, {
                  scaleX: 0.5,
                  scaleY: 0.5,
                  overwrite: true,
                });
                TweenMax.to($("#answer" + currentAnswer), 1, {
                  scaleX: 1,
                  scaleY: 1,
                  alpha: 1,
                  overwrite: true,
                  ease: Elastic.easeOut,
                  onComplete: function () {
                    TweenMax.to($("#answer" + currentAnswer), 0, {
                      delay: 1,
                      overwrite: true,
                      onComplete: function () {
                        displayQuestionResult();
                      },
                    });
                  },
                });
              }
            } else {
              displayQuestionResult();
            }
          }
        }
      },
    });
  }
}

/*!
 *
 * CHECK RIGHT ANSWER - This is the function that runs to check right answer
 *
 */

function checkAnswerCorrect() {
  var correctAnswer = false;
  var correctAnswerCount = 0;

  stopVideoPlayer(true);

  if (playerData.answerType == "drag" && $("#groupHolder .groupDrop").length) {
    var totalAnswerCount = 0;
    var correctAnswerCount = 0;
    var totalDragCount = 0;

    $("#groupHolder .groupDrop").each(function (index, element) {
      var groupAnswerArray = $(this).attr("data-answer");
      groupAnswerArray =
        groupAnswerArray == "" ? [] : groupAnswerArray.split(",");
      totalAnswerCount += groupAnswerArray.length;

      var groupArray = $(this).attr("data-group");
      groupArray = groupArray == undefined ? [] : groupArray.split(",");

      for (var n = 0; n < groupArray.length; n++) {
        var answerOriID = $("#answer" + groupArray[n]).attr("data-ori-id");
        var answerInGroup = groupAnswerArray.indexOf(answerOriID);
        if (answerInGroup != -1) {
          correctAnswerCount++;
        }
        totalDragCount++;
      }
    });

    if (
      totalAnswerCount == correctAnswerCount &&
      totalAnswerCount == totalDragCount
    ) {
      correctAnswer = true;
    }
  } else if (playerData.answerType == "drag") {
    //drag and drop question
    var totalDrop = $("#answerHolder .drop").length;
    var totalDrag = $("#answerHolder .dragActive").length;

    $("#answerHolder .drop").each(function (index, element) {
      var dropID = $(this).attr("id").substring(4, $(this).attr("id").length);
      var dragID = $("#" + $(this).attr("data-drag-id")).attr("data-answer");

      if (dropID == dragID) {
        correctAnswerCount++;
      }
    });

    if (totalDrag < totalDrop) {
      if (correctAnswerCount == totalDrag) {
        correctAnswer = true;
      }
    } else {
      if (correctAnswerCount == totalDrop) {
        correctAnswer = true;
      }
    }
  } else if (playerData.answerType == "select") {
    //multiple choices select
    for (var n = 0; n < playerData.answer_arr.length; n++) {
      var currentAnswer = playerData.answer_arr[n] + 1;
      if (playerData.correctAnswer.indexOf(currentAnswer) != -1) {
        correctAnswerCount++;
      }
    }

    if (
      correctAnswerCount == playerData.correctAnswer.length &&
      playerData.answer_arr.length == playerData.correctAnswer.length
    ) {
      correctAnswer = true;
    }
  } else if (playerData.answerType == "input") {
    //input question
    var totalInput = $("#inputHolder input").length;
    $("#inputHolder input").each(function (index, element) {
      if ($(this).val() == $(this).attr("data-answer")) {
        correctAnswerCount++;
      }
    });

    if (correctAnswerCount == totalInput) {
      correctAnswer = true;
    }
  }

  return correctAnswer;
}

function checkInputAnswer() {
  if (!playerData.answered) {
    var proceedInput = false;
    var totalInput = $("#inputHolder input").length;
    var totalCount = 0;

    playerData.answer_arr = [];
    $("#inputHolder input").each(function (index, element) {
      if ($(this).val() != "") {
        playerData.answer_arr.push($(this).val());
        totalCount++;
      }
    });

    if (totalInput == totalCount) {
      proceedInput = true;
    }

    if (proceedInput) {
      playSound("soundClick");
      toggleGameTimer(false);
      stopAudio();
      toggleAudioInterval(false);
      playerData.answered = true;

      $("#inputHolder input").prop("disabled", true);
      displayQuestionResult();
    }
  }
}

/*!
 *
 * DISPLAY QUESTION RESULT - This is the function that runs to display question result
 *
 */
function displayQuestionResult() {
  if (checkAnswerCorrect()) {
    playSound("soundAnswerCorrect");
    playerData.score++;
    $(".questionResultText").html(correctDisplayText);
  } else {
    playSound("soundAnswerWrong");
    $(".questionResultText").html(wrongDisplayText);
  }

  TweenMax.killTweensOf($(".questionResultText"));
  TweenMax.to($(".questionResultText"), 0, {
    scaleX: 0.8,
    scaleY: 0.8,
    alpha: 0,
    overwrite: true,
  });
  TweenMax.to($(".questionResultText"), 1, {
    delay: 0.2,
    scaleX: 1,
    scaleY: 1,
    alpha: 1,
    ease: Elastic.easeOut,
    overwrite: true,
  });

  if (enableExplanation) {
    playAudioLoop("explanation");
    $("#explanationHolder").show();
  } else {
    $("#explanationHolder").hide();
  }

  $("#questionHolder").hide();
  $("#questionResultHolder").show();
  $("#questionResultHolder").css("opacity", 0);

  TweenMax.to($("#questionResultHolder"), 1, {
    alpha: 1,
    overwrite: true,
    onComplete: function () {},
  });
}

function presetAnswered() {
  TweenMax.killAll();

  stopVideoPlayer(true);

  TweenMax.to($(".questionResultText"), 0, {
    scaleX: 1,
    scaleY: 1,
    overwrite: true,
  });
  if (playerData.answerType == "select") {
    $("#answerHolder .answer").each(function (index, element) {
      if ($(this).attr("data-submit") == "true") {
        $(this).hide();
      }
    });

    $("#answerHolder .answer").each(function (index, element) {
      if ($(this).attr("data-type") == "image") {
        $(this).css("opacity", 0.5);
      }
    });

    for (var n = 0; n < playerData.answer_arr.length; n++) {
      var currentAnswer = playerData.answer_arr[n];
      $("#answer" + currentAnswer).removeClass("answerFocus");
      $("#answer" + currentAnswer)
        .find(".background")
        .css("background", wrongButtonBgColour);
      $("#answer" + currentAnswer)
        .find(".shadow")
        .css("background", wrongButtonBgShadowColour);
    }

    if (enableRevealAnswer) {
      for (var n = 0; n < playerData.correctAnswer.length; n++) {
        var currentAnswer = playerData.correctAnswer[n] - 1;
        $("#answer" + currentAnswer).addClass("answerFocus");
        $("#answer" + currentAnswer)
          .find(".background")
          .css("background", answeredButtonBgColour);
        $("#answer" + currentAnswer)
          .find(".shadow")
          .css("background", answeredButtonBgShadowColour);

        TweenMax.to($("#answer" + currentAnswer), 0, {
          scaleX: 0.5,
          scaleY: 0.5,
          overwrite: true,
        });
        TweenMax.to($("#answer" + currentAnswer), 1, {
          scaleX: 1,
          scaleY: 1,
          alpha: 1,
          overwrite: true,
          ease: Elastic.easeOut,
          onComplete: function () {
            TweenMax.to($("#answer" + currentAnswer), 0, {
              delay: 1,
              overwrite: true,
            });
          },
        });
      }
    }
  } else if (playerData.answerType == "input") {
    $("#inputHolder input").prop("disabled", true);
    $("#inputHolder input").each(function (index, element) {
      $(this).val(playerData.answered[index]);
    });
  }

  if (checkAnswerCorrect()) {
    $(".questionResultText").html(correctDisplayText);
  } else {
    $(".questionResultText").html(wrongDisplayText);
  }

  if (enableExplanation) {
    $("#explanationHolder").show();
  } else {
    $("#explanationHolder").hide();
  }

  $("#questionHolder").hide();
  $("#questionResultHolder").show();
  $("#questionResultHolder").css("opacity", 1);
}

function previewQuestion() {
  $("#questionResultHolder").hide();
  $("#questionHolder").show();
  $("#questionHolder").css("opacity", 0);

  playYoutubeVideo();
  TweenMax.to($("#questionHolder"), 1, {
    alpha: 1,
    overwrite: true,
    onComplete: function () {
      TweenMax.to($("#questionHolder"), 0, {
        delay: 2,
        overwrite: true,
        onComplete: function () {
          stopVideoPlayer(true);
          $("#questionHolder").hide();
          $("#questionResultHolder").show();
          $("#questionResultHolder").css("opacity", 0);

          TweenMax.to($("#questionResultHolder"), 1, {
            alpha: 1,
            overwrite: true,
            onComplete: function () {},
          });
        },
      });
    },
  });
}

function playYoutubeVideo() {
  $("#videoHolder iframe").attr(
    "src",
    $("#videoHolder iframe").attr("data-src")
  );
}

function stopVideoPlayer(con) {
  $("video").each(function () {
    $(this).get(0).pause();
  });

  if (con) {
    $("#videoHolder iframe").attr("src", "");
  }
}

/*!
 *
 * PREPARE NEXT QUESTION - This is the function that runs for next question
 *
 */
function prepareNextQuestion() {
  stopAudio();
  if (totalQuestions != 0) {
    gameData.questionNum++;

    var totalMax =
      totalQuestions > gameData.sequence_arr.length
        ? gameData.sequence_arr.length
        : totalQuestions;
    if (gameData.questionNum < totalMax) {
      loadQuestion();
    } else {
      playSound("soundComplete");
      goPage("result");
    }
  } else {
    if (gameData.questionNum < gameData.sequence_arr.length - 1) {
      gameData.questionNum++;
      loadQuestion();
    } else {
      playSound("soundComplete");
      goPage("result");
    }
  }
}

/*!
 *
 * TOGGLE QUESTION LOADER - This is the function that runs to display question loader
 *
 */
function toggleQuestionLoader(con) {
  if (con) {
    $("#questionLoaderHolder").show();
    $("#questionHolder").hide();
  } else {
    $("#questionLoaderHolder").hide();
    $("#questionHolder").show();
  }
}

/*!
 *
 * GAME TIMER - This is the function that runs for game timer
 *
 */
function toggleGameTimer(con) {
  if ($.editor.enable) {
    return;
  }

  if (!enableTimer) {
    return;
  }

  TweenMax.killTweensOf(timeData);
  if (con) {
    if (storeData.status) {
      timeData.startDate = storeData.timerDate;
    } else {
      timeData.startDate = storeData.timerDate = new Date();
    }
    loopTimer();
  } else {
    if (timerAllSession) {
      timeData.accumulate = timeData.timer;
      timeData.countdown = timeData.timer;
    }
  }
  timeData.enable = con;
}

function updateTimerDisplay(con) {
  var resetDisplay = true;

  if (!con) {
    if (timerAllSession) {
      resetDisplay = false;
    }
  }

  if (resetDisplay) {
    if (timerMode == "countdown") {
      $("#gameStatus .gameTimerStatus").html(
        millisecondsToTime(timeData.countdown)
      );
    } else {
      $("#gameStatus .gameTimerStatus").html("00:00");
    }
  }
}

function loopTimer() {
  TweenMax.to(timeData, 0.2, { overwrite: true, onComplete: updateTimer });
}

function updateTimer() {
  timeData.nowDate = new Date();
  timeData.elapsedTime = Math.floor(
    timeData.nowDate.getTime() - timeData.startDate.getTime()
  );

  if (timerMode == "default") {
    timeData.timer = timeData.elapsedTime + timeData.accumulate;
  } else if (timerMode == "countdown") {
    timeData.timer = Math.floor(timeData.countdown - timeData.elapsedTime);
  }

  $(".gameTimerStatus").html(millisecondsToTime(timeData.timer));

  if (timeData.timer <= 0) {
    toggleResult(false);
    goPage("result");
  } else {
    if (timeData.enable) {
      loopTimer();
    }
  }
}

function toggleResult(con) {
  if (con) {
    $(".itemWinnerCup img").attr("src", "assets/item_cup.svg");
  } else {
    $(".itemWinnerCup img").attr("src", "assets/item_cup_over.svg");
  }
}

/*!
 *
 * XML - This is the function that runs to load word from xml
 *
 */
function loadXML(src) {
  $(".preloadText").show();
  $("#buttonStart").hide();

  $.ajax({
    url: src,
    type: "GET",
    dataType: "xml",
    success: function (result) {
      if ($.editor.enable) {
        edit.xmlFile = result;
      }

      $(result)
        .find("thumb")
        .each(function (catIndex, catElement) {
          gameData.categoryThumb_arr.push({
            src: $(catElement).text(),
            name: $(catElement).attr("name"),
          });
        });

      $(result)
        .find("item")
        .each(function (questionIndex, questionElement) {
          pushDataArray(questionIndex, questionElement);
        });

      loadXMLComplete();
    },
  });
}

function pushDataArray(questionIndex, questionElement) {
  var curCategory = $(questionElement).find("category").text();
  if (curCategory != "") {
    gameData.category_arr.push($(questionElement).find("category").text());
  }

  //landscape
  $(questionElement)
    .find("landscape")
    .each(function (landscapeIndex, landscapeElement) {
      quesLandscape_arr.push({
        category: curCategory,
        question: $(landscapeElement).find("question").text(),
        fontSize: $(landscapeElement).find("question").attr("fontSize"),
        lineHeight: $(landscapeElement).find("question").attr("lineHeight"),
        color: $(landscapeElement).find("question").attr("color"),
        align: $(landscapeElement).find("question").attr("align"),
        top: $(landscapeElement).find("question").attr("top"),
        left: $(landscapeElement).find("question").attr("left"),
        width: $(landscapeElement).find("question").attr("width"),
        height: $(landscapeElement).find("question").attr("height"),
        type: $(landscapeElement).find("question").attr("type"),
        correctAnswer: $(landscapeElement)
          .find("answers")
          .attr("correctAnswer"),
        drag: $(landscapeElement).find("answers").attr("drag"),
        groups: [],
        videos: [],
        answer: [],
        input: [],
        audio: $(landscapeElement).find("question").attr("audio"),
        explanation: $(landscapeElement).find("explanation").text(),
        explanationFontSize: $(landscapeElement)
          .find("explanation")
          .attr("fontSize"),
        explanationLineHeight: $(landscapeElement)
          .find("explanation")
          .attr("lineHeight"),
        explanationColor: $(landscapeElement).find("explanation").attr("color"),
        explanationAlign: $(landscapeElement).find("explanation").attr("align"),
        explanationTop: $(landscapeElement).find("explanation").attr("top"),
        explanationLeft: $(landscapeElement).find("explanation").attr("left"),
        explanationWidth: $(landscapeElement).find("explanation").attr("width"),
        explanationHeight: $(landscapeElement)
          .find("explanation")
          .attr("height"),
        explanationType: $(landscapeElement).find("explanation").attr("type"),
        explanationAudio: $(landscapeElement).find("explanation").attr("audio"),
        background: $(landscapeElement).find("background").text(),
        backgroundTop: $(landscapeElement).find("background").attr("top"),
        backgroundLeft: $(landscapeElement).find("background").attr("left"),
        backgroundWidth: $(landscapeElement).find("background").attr("width"),
        backgroundHeight: $(landscapeElement).find("background").attr("height"),
      });

      $(landscapeElement)
        .find("videos")
        .each(function (videosIndex, videosElement) {
          quesLandscape_arr[questionIndex].videos.push({
            width: $(videosElement).attr("width"),
            height: $(videosElement).attr("height"),
            top: $(videosElement).attr("top"),
            left: $(videosElement).attr("left"),
            autoplay: $(videosElement).attr("autoplay"),
            controls: $(videosElement).attr("controls"),
            embed: $(videosElement).attr("embed"),
            types: [],
          });

          $(videosElement)
            .find("video")
            .each(function (videoIndex, videoElement) {
              quesLandscape_arr[questionIndex].videos[videosIndex].types.push({
                src: $(videoElement).text(),
                type: $(videoElement).attr("type"),
              });
            });
        });

      $(landscapeElement)
        .find("answers answer")
        .each(function (answerIndex, answerElement) {
          quesLandscape_arr[questionIndex].answer.push({
            text: $(answerElement).text(),
            submit: $(answerElement).attr("submit"),
            type: $(answerElement).attr("type"),
            width: $(answerElement).attr("width"),
            height: $(answerElement).attr("height"),
            top: $(answerElement).attr("top"),
            left: $(answerElement).attr("left"),
            fontSize: $(answerElement).attr("fontSize"),
            lineHeight: $(answerElement).attr("lineHeight"),
            color: $(answerElement).attr("color"),
            align: $(answerElement).attr("align"),
            audio: $(answerElement).attr("audio"),
            offsetTop: $(answerElement).attr("offsetTop"),

            dropLabelText: $(answerElement).attr("dropLabelText"),
            dropLabelType: $(answerElement).attr("dropLabelType"),
            dropLabelWidth: $(answerElement).attr("dropLabelWidth"),
            dropLabelHeight: $(answerElement).attr("dropLabelHeight"),
            dropLabelTop: $(answerElement).attr("dropLabelTop"),
            dropLabelLeft: $(answerElement).attr("dropLabelLeft"),
            dropLabelFontSize: $(answerElement).attr("dropLabelFontSize"),
            dropLabelLineHeight: $(answerElement).attr("dropLabelLineHeight"),
            dropLabelColor: $(answerElement).attr("dropLabelColor"),
            dropLabelAlign: $(answerElement).attr("dropLabelAlign"),
            dropLabelOffsetTop: $(answerElement).attr("dropLabelOffsetTop"),

            dragEnable: $(answerElement).attr("dragEnable"),
            dropEnable: $(answerElement).attr("dropEnable"),
            dropLeft: $(answerElement).attr("dropLeft"),
            dropTop: $(answerElement).attr("dropTop"),
            dropWidth: $(answerElement).attr("dropWidth"),
            dropHeight: $(answerElement).attr("dropHeight"),
            dropOffLeft: $(answerElement).attr("dropOffLeft"),
            dropOffTop: $(answerElement).attr("dropOffTop"),
          });
        });

      $(landscapeElement)
        .find("inputs input")
        .each(function (inputIndex, inputElement) {
          quesLandscape_arr[questionIndex].input.push({
            text: $(inputElement).text(),
            submit: $(inputElement).attr("submit"),
            type: $(inputElement).attr("type"),
            width: $(inputElement).attr("width"),
            height: $(inputElement).attr("height"),
            top: $(inputElement).attr("top"),
            left: $(inputElement).attr("left"),
            fontSize: $(inputElement).attr("fontSize"),
            lineHeight: $(inputElement).attr("lineHeight"),
            correctAnswer: $(inputElement).attr("correctAnswer"),
            color: $(inputElement).attr("color"),
            bacgkround: $(inputElement).attr("bacgkround"),
            align: $(inputElement).attr("align"),
            audio: $(inputElement).attr("audio"),
            offsetTop: $(inputElement).attr("offsetTop"),
          });
        });

      $(landscapeElement)
        .find("groups group")
        .each(function (groupIndex, groupElement) {
          quesLandscape_arr[questionIndex].groups.push({
            text: $(groupElement).text(),
            type: $(groupElement).attr("type"),
            width: $(groupElement).attr("width"),
            height: $(groupElement).attr("height"),
            top: $(groupElement).attr("top"),
            left: $(groupElement).attr("left"),
            fontSize: $(groupElement).attr("fontSize"),
            lineHeight: $(groupElement).attr("lineHeight"),
            color: $(groupElement).attr("color"),
            align: $(groupElement).attr("align"),
            offsetTop: $(groupElement).attr("offsetTop"),
            correctAnswer: $(groupElement).attr("correctAnswer"),
            dropMax: $(groupElement).attr("dropMax"),
            dropWidth: $(groupElement).attr("dropWidth"),
            dropHeight: $(groupElement).attr("dropHeight"),
            dropTop: $(groupElement).attr("dropTop"),
            dropLeft: $(groupElement).attr("dropLeft"),
            dropOffLeft: $(groupElement).attr("dropOffLeft"),
            dropOffTop: $(groupElement).attr("dropOffTop"),
            audio: $(groupElement).attr("audio"),
          });
        });
    });

  //portrait
  $(questionElement)
    .find("portrait")
    .each(function (portraitIndex, portraitElement) {
      quesPortrait_arr.push({
        category: curCategory,
        question: $(portraitElement).find("question").text(),
        fontSize: $(portraitElement).find("question").attr("fontSize"),
        lineHeight: $(portraitElement).find("question").attr("lineHeight"),
        align: $(portraitElement).find("question").attr("align"),
        top: $(portraitElement).find("question").attr("top"),
        left: $(portraitElement).find("question").attr("left"),
        width: $(portraitElement).find("question").attr("width"),
        height: $(portraitElement).find("question").attr("height"),
        type: $(portraitElement).find("question").attr("type"),
        correctAnswer: $(portraitElement).find("answers").attr("correctAnswer"),
        drag: $(portraitElement).find("answers").attr("drag"),
        color: $(portraitElement).find("answers").attr("color"),
        groups: [],
        videos: [],
        answer: [],
        input: [],
        audio: $(portraitElement).find("question").attr("audio"),
        explanation: $(portraitElement).find("explanation").text(),
        explanationFontSize: $(portraitElement)
          .find("explanation")
          .attr("fontSize"),
        explanationLineHeight: $(portraitElement)
          .find("explanation")
          .attr("lineHeight"),
        explanationColor: $(portraitElement).find("explanation").attr("color"),
        explanationAlign: $(portraitElement).find("explanation").attr("align"),
        explanationTop: $(portraitElement).find("explanation").attr("top"),
        explanationLeft: $(portraitElement).find("explanation").attr("left"),
        explanationWidth: $(portraitElement).find("explanation").attr("width"),
        explanationHeight: $(portraitElement)
          .find("explanation")
          .attr("height"),
        explanationType: $(portraitElement).find("explanation").attr("type"),
        explanationAudio: $(portraitElement).find("explanation").attr("audio"),
        background: $(portraitElement).find("background").text(),
        backgroundTop: $(portraitElement).find("background").attr("top"),
        backgroundLeft: $(portraitElement).find("background").attr("left"),
        backgroundWidth: $(portraitElement).find("background").attr("width"),
        backgroundHeight: $(portraitElement).find("background").attr("height"),
      });

      $(portraitElement)
        .find("videos")
        .each(function (videosIndex, videosElement) {
          quesPortrait_arr[questionIndex].videos.push({
            width: $(videosElement).attr("width"),
            height: $(videosElement).attr("height"),
            top: $(videosElement).attr("top"),
            left: $(videosElement).attr("left"),
            autoplay: $(videosElement).attr("autoplay"),
            controls: $(videosElement).attr("controls"),
            embed: $(videosElement).attr("embed"),
            types: [],
          });

          $(videosElement)
            .find("video")
            .each(function (videoIndex, videoElement) {
              quesPortrait_arr[questionIndex].videos[videosIndex].types.push({
                src: $(videoElement).text(),
                type: $(videoElement).attr("type"),
              });
            });
        });

      $(portraitElement)
        .find("answers answer")
        .each(function (answerIndex, answerElement) {
          quesPortrait_arr[questionIndex].answer.push({
            text: $(answerElement).text(),
            submit: $(answerElement).attr("submit"),
            type: $(answerElement).attr("type"),
            width: $(answerElement).attr("width"),
            height: $(answerElement).attr("height"),
            top: $(answerElement).attr("top"),
            left: $(answerElement).attr("left"),
            fontSize: $(answerElement).attr("fontSize"),
            lineHeight: $(answerElement).attr("lineHeight"),
            color: $(answerElement).attr("color"),
            align: $(answerElement).attr("align"),
            audio: $(answerElement).attr("audio"),
            offsetTop: $(answerElement).attr("offsetTop"),

            dropLabelText: $(answerElement).attr("dropLabelText"),
            dropLabelType: $(answerElement).attr("dropLabelType"),
            dropLabelWidth: $(answerElement).attr("dropLabelWidth"),
            dropLabelHeight: $(answerElement).attr("dropLabelHeight"),
            dropLabelTop: $(answerElement).attr("dropLabelTop"),
            dropLabelLeft: $(answerElement).attr("dropLabelLeft"),
            dropLabelFontSize: $(answerElement).attr("dropLabelFontSize"),
            dropLabelLineHeight: $(answerElement).attr("dropLabelLineHeight"),
            dropLabelColor: $(answerElement).attr("dropLabelColor"),
            dropLabelAlign: $(answerElement).attr("dropLabelAlign"),
            dropLabelOffsetTop: $(answerElement).attr("dropLabelOffsetTop"),

            dragEnable: $(answerElement).attr("dragEnable"),
            dropEnable: $(answerElement).attr("dropEnable"),
            dropLeft: $(answerElement).attr("dropLeft"),
            dropTop: $(answerElement).attr("dropTop"),
            dropWidth: $(answerElement).attr("dropWidth"),
            dropHeight: $(answerElement).attr("dropHeight"),
            dropOffLeft: $(answerElement).attr("dropOffLeft"),
            dropOffTop: $(answerElement).attr("dropOffTop"),
          });
        });

      $(portraitElement)
        .find("inputs input")
        .each(function (inputIndex, inputElement) {
          quesPortrait_arr[questionIndex].input.push({
            text: $(inputElement).text(),
            submit: $(inputElement).attr("submit"),
            type: $(inputElement).attr("type"),
            width: $(inputElement).attr("width"),
            height: $(inputElement).attr("height"),
            top: $(inputElement).attr("top"),
            left: $(inputElement).attr("left"),
            fontSize: $(inputElement).attr("fontSize"),
            lineHeight: $(inputElement).attr("lineHeight"),
            correctAnswer: $(inputElement).attr("correctAnswer"),
            color: $(inputElement).attr("color"),
            bacgkround: $(inputElement).attr("bacgkround"),
            align: $(inputElement).attr("align"),
            audio: $(inputElement).attr("audio"),
            offsetTop: $(inputElement).attr("offsetTop"),
          });
        });

      $(portraitElement)
        .find("groups group")
        .each(function (groupIndex, groupElement) {
          quesPortrait_arr[questionIndex].groups.push({
            text: $(groupElement).text(),
            type: $(groupElement).attr("type"),
            width: $(groupElement).attr("width"),
            height: $(groupElement).attr("height"),
            top: $(groupElement).attr("top"),
            left: $(groupElement).attr("left"),
            fontSize: $(groupElement).attr("fontSize"),
            lineHeight: $(groupElement).attr("lineHeight"),
            color: $(groupElement).attr("color"),
            align: $(groupElement).attr("align"),
            offsetTop: $(groupElement).attr("offsetTop"),
            correctAnswer: $(groupElement).attr("correctAnswer"),
            dropMax: $(groupElement).attr("dropMax"),
            dropWidth: $(groupElement).attr("dropWidth"),
            dropHeight: $(groupElement).attr("dropHeight"),
            dropTop: $(groupElement).attr("dropTop"),
            dropLeft: $(groupElement).attr("dropLeft"),
            dropOffLeft: $(groupElement).attr("dropOffLeft"),
            dropOffTop: $(groupElement).attr("dropOffTop"),
            audio: $(groupElement).attr("audio"),
          });
        });
    });
}

function checkBoolean(value) {
  if (value == undefined) {
    return true;
  } else {
    if (value == "true") {
      return true;
    } else {
      return false;
    }
  }
}

function loadXMLComplete() {
  $(".preloadText").hide();
  $("#buttonStart").show();

  gameData.targetArray = quesLandscape_arr;
  if (gameData.targetArray.length != 0) {
    gameData.category_arr = unique(gameData.category_arr);
    gameData.category_arr.sort();
    if (categoryAllOption) {
      gameData.category_arr.push(categoryAllText);
    }
  }

  if (categoryPage) {
    buildCategory();
  }

  if ($.editor.enable) {
    loadEditPage();
    goPage("game");
  } else {
    goPage("main");
  }
}

/*!
 *
 * QUESTION AND ANSWER IMAGE PRELOADER - This is the function that runs to preload question/answer image
 *
 */
var imageLoader, fileFest;
function loadQuestionAssets() {
  imageLoader = new createjs.LoadQueue(false);
  createjs.Sound.alternateExtensions = ["mp3"];
  imageLoader.installPlugin(createjs.Sound);

  imageLoader.addEventListener("complete", handleImageComplete);
  imageLoader.loadManifest(fileFest);
}

function handleImageComplete() {
  buildQuestion();
}

/*!
 *
 * RESIZE GAME - This is the function that runs to resize game
 *
 */
function resizeGameDetail() {
  if (gameData.mode != gameData.oldMode) {
    gameData.oldMode = gameData.mode;
    if (gameData.build && gameData.page == "game") {
      buildQuestion();
    }
  }

  var curHoldeW = $("#mainHolder").outerWidth();
  if (gameData.mode == "portrait") {
    resetCategory();
    $(".fontPreload").attr("data-fontSize", 50);
    $(".fontPreload").attr("data-lineHeight", 50);
    $(".fontCategory").attr("data-fontSize", 16);
    $(".fontCategory").attr("data-lineHeight", 16);

    $(".gameQuestionStatus").attr("data-fontSize", 20);
    $(".gameQuestionStatus").attr("data-lineHeight", 20);
    $(".gameTimerStatus").attr("data-fontSize", 20);
    $(".gameTimerStatus").attr("data-lineHeight", 20);

    $(".fontResultScore").attr("data-fontSize", 40);
    $(".fontResultScore").attr("data-lineHeight", 40);
    $(".fontShare").attr("data-fontSize", 25);
    $(".fontShare").attr("data-lineHeight", 25);

    $(".fontMessage").attr("data-fontSize", 25);
    $(".fontMessage").attr("data-lineHeight", 25);

    $(".fontScoreTitle").attr("data-fontSize", 25);
    $(".fontScoreTitle").attr("data-lineHeight", 25);
    $(".fontSubmitTitle").attr("data-fontSize", 25);
    $(".fontSubmitTitle").attr("data-lineHeight", 25);
    $(".fontScoreList").attr("data-fontSize", 15);
    $(".fontScoreList").attr("data-lineHeight", 15);

    $(".fontLabel").attr("data-fontSize", 20);
    $(".fontLabel").attr("data-lineHeight", 20);
    $(".fontInput").attr("data-fontSize", 20);
    $(".fontInput").attr("data-lineHeight", 20);
  } else {
    resetCategory();
    $(".fontPreload").attr("data-fontSize", 60);
    $(".fontPreload").attr("data-lineHeight", 60);
    $(".fontCategory").attr("data-fontSize", 20);
    $(".fontCategory").attr("data-lineHeight", 20);

    $(".gameQuestionStatus").attr("data-fontSize", 30);
    $(".gameQuestionStatus").attr("data-lineHeight", 30);
    $(".gameTimerStatus").attr("data-fontSize", 30);
    $(".gameTimerStatus").attr("data-lineHeight", 30);
    $(".fontResultScore").attr("data-fontSize", 50);
    $(".fontResultScore").attr("data-lineHeight", 50);
    $(".fontShare").attr("data-fontSize", 30);
    $(".fontShare").attr("data-lineHeight", 30);

    $(".fontMessage").attr("data-fontSize", 30);
    $(".fontMessage").attr("data-lineHeight", 30);

    $(".fontScoreTitle").attr("data-fontSize", 50);
    $(".fontScoreTitle").attr("data-lineHeight", 50);
    $(".fontSubmitTitle").attr("data-fontSize", 50);
    $(".fontSubmitTitle").attr("data-lineHeight", 50);
    $(".fontScoreList").attr("data-fontSize", 20);
    $(".fontScoreList").attr("data-lineHeight", 20);

    $(".fontLabel").attr("data-fontSize", 30);
    $(".fontLabel").attr("data-lineHeight", 30);
    $(".fontInput").attr("data-fontSize", 30);
    $(".fontInput").attr("data-lineHeight", 30);
  }

  $(".resizeFont").each(function (index, element) {
    $(this).css(
      "font-size",
      Math.round(Number($(this).attr("data-fontSize")) * scalePercent) + "px"
    );
    $(this).css(
      "line-height",
      Math.round(Number($(this).attr("data-lineHeight")) * scalePercent) + "px"
    );
  });

  $(".resizeBorder").each(function (index, element) {
    var borderNumber = Number($(this).attr("data-border"));
    var scaleNum = Number($("#questionHolder").outerWidth() / stageW);
    borderNumber = borderNumber * scaleNum;
    $(this).css(
      "border-radius",
      borderNumber +
        "px " +
        borderNumber +
        "px " +
        borderNumber +
        "px " +
        borderNumber +
        "px"
    );
    $(this).css(
      "-moz-border-radius",
      borderNumber +
        "px " +
        borderNumber +
        "px " +
        borderNumber +
        "px " +
        borderNumber +
        "px"
    );
    $(this).css(
      "-webkit-border-radius",
      borderNumber +
        "px " +
        borderNumber +
        "px " +
        borderNumber +
        "px " +
        borderNumber +
        "px"
    );
  });
}

/*!
 *
 * MILLISECONDS CONVERT - This is the function that runs to convert milliseconds to time
 *
 */
function millisecondsToTime(milli) {
  var milliseconds = milli % 1000;
  var seconds = Math.floor((milli / 1000) % 60);
  var minutes = Math.floor((milli / (60 * 1000)) % 60);

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  return minutes + ":" + seconds;
}

/*!
 *
 * TOGGLE CONFIRM - This is the function that runs to toggle confirm exit
 *
 */
function toggleConfirm(con) {
  if (con) {
    $("#confirmHolder").show();
  } else {
    $("#confirmHolder").hide();
  }
}

/*!
 *
 * OPTIONS - This is the function that runs to mute and fullscreen
 *
 */
function toggleGameOption() {
  if ($("#buttonOption").hasClass("buttonOptionOn")) {
    $("#buttonOption").removeClass("buttonOptionOn");
    $("#buttonOption").addClass("buttonOptionOff");
    $("#optionList").hide();
  } else {
    $("#buttonOption").removeClass("buttonOptionOff");
    $("#buttonOption").addClass("buttonOptionOn");
    $("#optionList").show();
  }
}

function toggleGameMute() {
  if ($("#buttonSound").hasClass("buttonSoundOn")) {
    $("#buttonSound").removeClass("buttonSoundOn");
    $("#buttonSound").addClass("buttonSoundOff");
    toggleMute(true);
  } else {
    $("#buttonSound").removeClass("buttonSoundOff");
    $("#buttonSound").addClass("buttonSoundOn");
    toggleMute(false);
  }
}

function toggleFullScreen() {
  if (
    !document.fullscreenElement && // alternative standard method
    !document.mozFullScreenElement &&
    !document.webkitFullscreenElement &&
    !document.msFullscreenElement
  ) {
    // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(
        Element.ALLOW_KEYBOARD_INPUT
      );
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

/*!
 *
 * SHARE - This is the function that runs to open share url
 *
 */
function share(action) {
  gtag("event", "click", { event_category: "share", event_label: action });

  var loc = location.href;
  loc = loc.substring(0, loc.lastIndexOf("/") + 1);

  var title = "";
  var text = "";

  if (scoreMode == "score") {
    title = shareTitle.replace("[SCORE]", playerData.score);
    text = shareMessage.replace("[SCORE]", playerData.score);
  } else if (scoreMode == "timer") {
    title = shareTitle.replace("[SCORE]", millisecondsToTime(playerData.timer));
    text = shareMessage.replace(
      "[SCORE]",
      millisecondsToTime(playerData.timer)
    );
  }

  var shareurl = "";

  if (action == "twitter") {
    shareurl = "https://twitter.com/intent/tweet?url=" + loc + "&text=" + text;
  } else if (action == "facebook") {
    shareurl =
      "https://www.facebook.com/sharer/sharer.php?u=" +
      encodeURIComponent(
        loc +
          "share.php?desc=" +
          text +
          "&title=" +
          title +
          "&url=" +
          loc +
          "&thumb=" +
          loc +
          "share.jpg&width=590&height=300"
      );
  } else if (action == "google") {
    shareurl = "https://plus.google.com/share?url=" + loc;
  } else if (action == "whatsapp") {
    shareurl =
      "whatsapp://send?text=" +
      encodeURIComponent(text) +
      " - " +
      encodeURIComponent(loc);
  }

  window.open(shareurl);
}
