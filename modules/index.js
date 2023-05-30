const buttonElement = document.getElementById('add-button');
const listElement = document.getElementById('list');
const nameElement = document.getElementById('name');
let commentsElement = document.getElementById('comments');
let comments = [];

// document.addEventListener("DOMContentLoaded", function () {
//   checkInputs();
// });

// function checkInputs() {
//   if (nameElement.value === "" || commentsElement.value === "") {
//     buttonElement.classList.add("errorColorButton");
//   } else {
//     buttonElement.classList.remove("errorColorButton");
//   }
// }
// nameElement.addEventListener("input", checkInputs);
// commentsElement.addEventListener("input", checkInputs);
// buttonElement.addEventListener("click", () => {
//   if (nameElement.value === "" || commentsElement.value === "") {
//     return;
//   }
// })

import { receivedComments, updateComments } from "./API.js";

// Обработчики лайка
export function isLikedElements() {
  const isLikedButtonsElements = document.querySelectorAll('.like-button');

  for (const isLikedButtonsElement of isLikedButtonsElements) {
    isLikedButtonsElement.addEventListener('click', () => {
      const index = isLikedButtonsElement.dataset.index;
      if (comments[index].isLiked) {
        comments[index].likes -= 1;
        comments[index]['isLiked'] = false;
      } else {
        comments[index].likes += 1;
        comments[index]['isLiked'] = true;
      }
      renderComments();
    });
  };

  const likeButtons = document.querySelectorAll('.like-button');
  for (const button of likeButtons) {
    button.addEventListener('click', function (event) {
      event.stopPropagation();
    });
  }
};

// Сценарий ответа на комментарий пользователя
export function answerElements() {
  const commentElements = document.querySelectorAll(".comment");
  for (const commentElement of commentElements) {
    commentElement.addEventListener("click", (event) => {
      const nameAuthor = commentElement.querySelector(".comment-header div:first-child").textContent;
      const textAuthor = commentElement.querySelector(".comment-text").textContent;
      commentsElement.value = `>${textAuthor.trim()}\n${nameAuthor}, `;
      commentsElement.focus();
    });
  }
};

// Сценарий показа уведомления при запуске приложения 
const messageElement = document.createElement('div');
messageElement.classList.add('message');
messageElement.textContent = 'Пожалуйста, подождите, комментарии загружаются...';
listElement.append(messageElement);

// Обработчик события при нажатии кнопки
buttonElement.addEventListener("click", () => {
  nameElement.classList.remove("errorColorInput");
  nameElement.classList.remove("errorBoxShadowInput");
  commentsElement.classList.remove("errorColorInput");
  commentsElement.classList.remove("errorBoxShadowInput");
  if (nameElement.value === "" || commentsElement.value === "") {
    if (nameElement.value === "") {
      nameElement.classList.add("errorColorInput");
      nameElement.classList.add("errorBoxShadowInput");
    }
    if (commentsElement.value === "") {
      commentsElement.classList.add("errorColorInput");
      commentsElement.classList.add("errorBoxShadowInput");
    }
    return;
  }

  buttonElement.disabled = true;
  buttonElement.textContent = "Комментарий добавляется...";

  updateComments();
  receivedComments();

})
