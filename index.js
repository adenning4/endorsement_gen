import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";

import {
  getDatabase,
  ref,
  push,
  onValue,
  update,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

const endorsementInputEl = document.getElementById("endorsement-input");
const fromInputEl = document.getElementById("from-input");
const toInputEl = document.getElementById("to-input");
const publishButtonEl = document.getElementById("publish-button");
const endorsementsContainerEl = document.getElementById(
  "endorsements-container"
);

const firebaseConfig = {
  databaseURL: "https://endorsementscrim-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const dbEndorsementsRef = ref(database, "endorsements");

let dbLocalCopy;
onValue(dbEndorsementsRef, (snapshot) => {
  if (snapshot.exists()) {
    const dbEndorsements = Object.entries(snapshot.val());
    dbLocalCopy = snapshot.val();
    console.log(dbLocalCopy);

    endorsementsContainerEl.innerHTML = "";

    for (let entry of dbEndorsements) {
      const entryData = {
        id: entry[0],
        ...entry[1],
      };

      endorsementsContainerEl.innerHTML += getEndorsementHtml(entryData);
    }
  }
});

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
      isLiked: false,
      likes: 0,
    };

    push(dbEndorsementsRef, newEndorsement);
  }
});

document.addEventListener("click", (e) => {
  if (e.target.dataset.id) {
    handleLikeClick(e.target.dataset.id);
  }
  if (e.target.parentElement.dataset.id) {
    handleLikeClick(e.target.parentElement.dataset.id);
  }
});

// Assuming only one user in this small project case
function handleLikeClick(id) {
  const isAlreadyLiked = dbLocalCopy[id].isLiked;
  const numberOfLikes = isAlreadyLiked
    ? dbLocalCopy[id].likes - 1
    : dbLocalCopy[id].likes + 1;

  const updateRef = ref(database, `endorsements/${id}`);
  update(updateRef, {
    ...dbLocalCopy[id],
    isLiked: !dbLocalCopy[id].isLiked,
    likes: numberOfLikes,
  });
}

function isAllInputsFilled() {
  return !!endorsementInputEl.value && !!toInputEl.value && !!fromInputEl.value;
}

function clearAllInputs() {
  endorsementInputEl.value = "";
  toInputEl.value = "";
  fromInputEl.value = "";
}

function getEndorsementHtml({
  toText,
  endorsementText,
  fromText,
  id,
  isLiked,
  likes,
}) {
  return `
        <div class="endorsement">
            <div class="from-tag top">To ${toText}</div>
            <div class="endorsement-text middle">
            ${endorsementText}
            </div>
            <div class="bottom">
            <div class=ds"to-tag">From ${fromText}</div>
            <div class="likes" data-id='${id}'><i class="fa-${
    isLiked ? "solid" : "regular"
  } fa-heart"></i> ${likes}</div>
            </div>
        </div>
    `;
}
