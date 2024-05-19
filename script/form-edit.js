var sectionIndex = 1;

function addQuestion(questionType) {
  const questionBlock = $(questionType + ".template-question-block")
    .first()
    .clone()
    .removeClass("template-question-block")
    .addClass("question-block")
    .appendTo(".question-list")
    .show();

  if (questionType === ".group-question") {
    questionBlock.find(".header-title h2").text("第 " + sectionIndex + " 題");
    sectionIndex++;
  }

  questionBlock.find(".btn-delete").on("click", function () {
    questionBlock.remove();
  });

  return questionBlock;
}

function dispatchChoiceListEvent(questionBlock) {
  questionBlock.find(".template-choice").hide();
  questionBlock.appendTo(".question-list").show();

  // 新增單選或多選選項
  questionBlock.find(".btn-add-choice").on("click", function () {
    const choiceDom = questionBlock
      .find(".template-choice")
      .first()
      .clone()
      .removeClass("template-choice")
      .addClass("choice")
      .show();
    questionBlock.find(".question-body").prepend(choiceDom);
  });

  // 新增單選或多選選項
  questionBlock.find(".btn-add-other-choice").on("click", function () {
    const choiceDom = questionBlock
      .find(".template-other-choice")
      .first()
      .clone()
      .removeClass("template-other-choice")
      .removeClass("template-choice")
      .addClass("choice")
      .addClass("other-choice")
      .show();
    questionBlock.find(".question-body").append(choiceDom);
    questionBlock.find(".btn-add-other-choice").hide();
  });

  // 刪除選項的功能
  questionBlock.on("click", ".btn-delete-choice", function () {
    $(this).closest(".choice").remove();
    if (questionBlock.find(".other-choice").length === 0) {
      questionBlock.find(".btn-add-other-choice").show();
    }
  });
}

function dispatchMoveQuestionEvent(questionBlock) {
  questionBlock.find(".btn-up").on("click", function () {
    const prevQuestion = questionBlock.prev();
    if (prevQuestion.length > 0) {
      questionBlock.insertBefore(prevQuestion);
    }
  });

  questionBlock.find(".btn-down").on("click", function () {
    const nextQuestion = questionBlock.next();
    if (nextQuestion.length > 0) {
      questionBlock.insertAfter(nextQuestion);
    }
  });
}

function dispatchDescriptionEvent(questionBlock) {
  questionBlock.find(".question-mark").hide();

  // 刪除選項的功能
  questionBlock.on("click", ".btn-add-description", function () {
    questionBlock.find(".question-mark").show();
    questionBlock.find(".btn-add-description").hide();
  });
}

function dispatchCreateGroupEvent(questionBlock) {
  questionBlock.on("click", ".btn-add-group", function () {
    const questionBlock = addQuestion(".group-question");
    dispatchCreateGroupEvent(questionBlock);
  });
}

$(document).ready(function () {
  $("#save-form").on("click", function () {
    alert("Form saved!");
  });

  // 隱藏所有問題模板
  $(".template-question-block").hide();

  // 設置按鈕的點擊事件
  $("#add-group-question").on("click", function () {
    const questionBlock = addQuestion(".group-question");
    dispatchCreateGroupEvent(questionBlock);
    dispatchMoveQuestionEvent(questionBlock);
  });

  // 設置按鈕的點擊事件
  $("#add-description-question").on("click", function () {
    const questionBlock = addQuestion(".description-question");
    dispatchDescriptionEvent(questionBlock);
    dispatchMoveQuestionEvent(questionBlock);
  });

  $("#add-choice-question").on("click", function () {
    const questionBlock = addQuestion(".choice-question");
    dispatchChoiceListEvent(questionBlock);
    dispatchMoveQuestionEvent(questionBlock);
  });

  $("#add-multiple-choice-question").on("click", function () {
    const questionBlock = addQuestion(".multiple-choice-question");
    dispatchChoiceListEvent(questionBlock);
    dispatchMoveQuestionEvent(questionBlock);
  });

  $("#add-text-question").on("click", function () {
    const questionBlock = addQuestion(".text-question");
    dispatchChoiceListEvent(questionBlock);
    dispatchMoveQuestionEvent(questionBlock);
  });
});
