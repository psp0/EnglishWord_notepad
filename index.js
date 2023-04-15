window.onload = function () {
  const korCard = document.querySelectorAll(".kor-card-box .card")[0];
  const engCard = document.querySelectorAll(".eng-card-box .card")[0];
  const korWord = document.querySelectorAll(".kor-card-box .card-inner")[0];
  const engWord = document.querySelectorAll(".eng-card-box .card-inner")[0];
  let randomWordKey = Math.round(Math.random() * (localStorage.length - 1));
  if (engWord.innerHTML === "영단어" && localStorage.length !== 0) {
    engWord.innerHTML = localStorage.key(0);
  }

  korCard.addEventListener("click", (e) => {
    if (localStorage.getItem(engWord.innerHTML) !== korWord.innerHTML) {
      korWord.innerHTML = localStorage.getItem(engWord.innerHTML);
    } else {
      korWord.innerHTML = "클릭!";
    }
  });

  engCard.addEventListener("click", (e) => {
    while (
      localStorage.key(randomWordKey) === engWord.innerHTML &&
      localStorage.length !== 1
    ) {
      randomWordKey = Math.round(Math.random() * (localStorage.length - 1));
    }
    engWord.innerHTML = localStorage.key(randomWordKey);
    korWord.innerHTML = "클릭!";
  });

  //-------------------

  const addButton = document.querySelectorAll(".add-box button")[0];
  addButton.addEventListener("click", (e) => {
    let engInput = document.querySelectorAll(".english-word-input")[0];
    let korInput = document.querySelectorAll(".korean-word-input")[0];

    if (engInput.value !== undefined && korInput.value !== undefined) {
      alert("단어가 추가 되었습니다.");
      localStorage.setItem(engInput.value, korInput.value);
      document.querySelectorAll(".english-word-input")[0].value = "";
      document.querySelectorAll(".korean-word-input")[0].value = "";
    } else {
      alert("단어를 입력해주십시오.");
    }
  });
  //-------------------

  const speechButton = document.querySelectorAll(".display-box  button")[0];
  speechButton.addEventListener("click", () => {
    speech(engWord.innerHTML);
  });
  //-------------------
  const deleteButton = document.querySelectorAll(".delete-box  button")[0];
  deleteButton.addEventListener("click", () => {
    alert("삭제 완료");
    localStorage.removeItem(engWord.innerHTML);
    while (
      localStorage.key(randomWordKey) === engWord.innerHTML &&
      localStorage.length !== 1
    ) {
      randomWordKey = Math.round(Math.random() * (localStorage.length - 1));
    }
    engWord.innerHTML = localStorage.key(randomWordKey);
    korWord.innerHTML = "클릭!";
  });
};

var voices = [];
function setVoiceList() {
  voices = window.speechSynthesis.getVoices();
}

setVoiceList();

if (window.speechSynthesis.onvoiceschanged !== undefined) {
  window.speechSynthesis.onvoiceschanged = setVoiceList;
}

function speech(txt) {
  if (!window.speechSynthesis) {
    alert(
      "음성 재생을 지원하지 않는 브라우저입니다. 크롬, 파이어폭스 등의 최신 브라우저를 이용하세요"
    );
    return;
  }

  var lang = "en-US";
  var utterThis = new SpeechSynthesisUtterance(txt);

  utterThis.onend = function (event) {
    console.log("end");
  };

  utterThis.onerror = function (event) {
    console.log("error", event);
  };

  var voiceFound = false;

  for (var i = 0; i < voices.length; i++) {
    if (
      voices[i].lang.indexOf(lang) >= 0 ||
      voices[i].lang.indexOf(lang.replace("-", "_")) >= 0
    ) {
      utterThis.voice = voices[i];
      voiceFound = true;
    }
  }
  if (!voiceFound) {
    alert("voice not found");
    return;
  }

  utterThis.lang = lang;
  utterThis.pitch = 1;
  utterThis.rate = 1; //속도

  window.speechSynthesis.speak(utterThis);
}
