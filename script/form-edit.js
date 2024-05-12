function addQuestion(questionType) {
  const questionBlock = $(questionType + ".template-question-block")
    .first()
    .clone()
    .removeClass("template-question-block")
    .addClass("question-block")
    .appendTo(".question-list")
    .show();

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
    questionBlock.find(".question-body").append(choiceDom);
  });

  // 刪除選項的功能
  questionBlock.on("click", ".btn-delete-choice", function () {
    $(this).closest(".choice").remove();
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
    addQuestion(".group-question");
  });

  $("#add-description-question").on("click", function () {
    addQuestion(".description-question");
  });

  $("#add-choice-question").on("click", function () {
    const questionBlock = addQuestion(".choice-question");
    dispatchChoiceListEvent(questionBlock);
  });

  $("#add-multiple-choice-question").on("click", function () {
    const questionBlock = addQuestion(".multiple-choice-question");
    dispatchChoiceListEvent(questionBlock);
  });

  $("#add-text-question").on("click", function () {
    addQuestion(".text-question");
  });
});
