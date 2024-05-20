const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

const heartButtonArray = document.querySelectorAll('.like-glyph');
const modal = document.getElementById('modal');

const hideModal = () => modal.classList.add('hidden');
const showModal = () => modal.classList.remove('hidden');

const toggleLike = (button) => {
  if (button.textContent === EMPTY_HEART) {
    addLike(button);
  } else {
    removeLike(button);
  }
};

const addLike = (button) => {
  button.classList.add('activated-heart');
  button.textContent = FULL_HEART;
};

const removeLike = (button) => {
  button.classList.remove('activated-heart');
  button.textContent = EMPTY_HEART;
};

const makeServerRequest = (button) => {
  return mimicServerCall()
    .then(toggleLike(button))
    .catch(() => {
      showModal();
      setTimeout(hideModal, 3000);
      toggleLike(button)
    });
};

const addLikeEventListenerAll = () => {
  hideModal()
  heartButtonArray.forEach(button => {
    button.addEventListener('click', () => makeServerRequest(button));
  });
};

addLikeEventListenerAll();

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
