import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";

import {
  getDatabase,
  ref,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

const endorsementInputEl = document.getElementById("endorsement-input");
const fromInputEl = document.getElementById("from-input");
const toInputEl = document.getElementById("to-input");
const publishButtonEl = document.getElementById("publish-button");

const firebaseConfig = {
  databaseURL: "https://endorsementscrim-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const dbEndorsementsRef = ref(database, "endorsements");

publishButtonEl.addEventListener("click", () => {
  if (isAllInputsFilled()) {
    const fromText = fromInputEl.value;
    const endorsementText = endorsementInputEl.value;
    const toText = toInputEl.value;

    clearAllInputs();

    const newEndorsement = {
      fromText,
      endorsementText,
      toText,
    };

    push(dbEndorsementsRef, newEndorsement);
  }
});

onValue(dbEndorsementsRef, (snapshot) => {
  console.log(snapshot);
});

function isAllInputsFilled() {
  return !!endorsementInputEl.value && !!toInputEl.value && !!fromInputEl.value;
}

function clearAllInputs() {
  endorsementInputEl.value = "";
  toInputEl.value = "";
  fromInputEl.value = "";
}

const endorsementTemplateHtml = `
    <div class="endorsement">
        <div class="from-tag top">To PLACEHOLDER</div>
        <div class="endorsement-text middle">
        PLACEHOLDER
        </div>
        <div class="bottom">
        <div class="to-tag">From PLACEHOLDER</div>
        <div class="likes"><i class="fa-solid fa-heart"></i> PLACEHOLDER</div>
        </div>
    </div>
`;
