const endorsementInputEl = document.getElementById("endorsement-input");
const fromInputEl = document.getElementById("from-input");
const toInputEl = document.getElementById("to-input");
const publishButtonEl = document.getElementById("publish-button");

publishButtonEl.addEventListener("click", () => {
  if (isAllInputsFilled()) {
    clearAllInputs();
  }
});

function isAllInputsFilled() {
  return !!endorsementInputEl.value && !!toInputEl.value && !!fromInputEl.value;
}

function clearAllInputs() {
  endorsementInputEl.value = "";
  toInputEl.value = "";
  fromInputEl.value = "";
}

const endorsementTemplateHtml = "";
