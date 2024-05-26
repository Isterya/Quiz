document.addEventListener('DOMContentLoaded', () => {
   const questions = [
      {
         text: 'Какое животное может видеть ультрафиолетовый свет?',
         answers: ['Кошка', 'Пчела', 'Собака', 'Лошадь'],
         rightIndex: 1,
         imgSrc: 'assets/img/cat.jpg',
      },
      {
         text: 'Какая книга была первой напечатанной на печатном станке Иоганна Гутенберга?',
         answers: ['Война и мир', 'Библия', 'Гамлет', 'Дон Кихот'],
         rightIndex: 1,
         imgSrc: 'assets/img/book.jpg',
      },
      {
         text: 'Какой предмет считается символом мира?',
         answers: ['Голубь', 'Меч', 'Золотая медаль', 'Орел'],
         rightIndex: 0,
         imgSrc: 'assets/img/world.jpg',
      },
      {
         text: 'Какой инструмент используется для измерения атмосферного давления?',
         answers: ['Гигрометр', 'Термометр', 'Барометр', 'Сейсмометр'],
         rightIndex: 2,
         imgSrc: 'assets/img/pressure.jpg',
      },
      {
         text: 'Какой художник создал знаменитую картину "Звездная ночь"?',
         answers: ['Пабло Пикассо', 'Клод Моне', 'Винсент Ван Гог', 'Леонардо да Винчи'],
         rightIndex: 2,
         imgSrc: 'assets/img/painting.jpg',
      },
      {
         text: 'Какой из этих котов знаменит своими огромными лапами?',
         answers: ['Британская короткошёрстная', 'Мейн-кун', 'Сиамская', 'Абиссинская'],
         rightIndex: 1,
         imgSrc: 'assets/img/big_cat.jpg',
      },
   ];

   const screens = document.querySelectorAll('.screen'),
      answers = document.querySelectorAll('.answer'),
      triggers = document.querySelectorAll('.start-game'),
      points = document.querySelectorAll('.points'),
      img = document.querySelector('.screen img'),
      highlightTimeout = 1500,
      bounty = 5;

   let activeIndex = 0,
      pointsIndex = 0;

   triggers.forEach((btn) => btn.addEventListener('click', startNewGame));

   function startNewGame() {
      showScreen(1);
      setActiveQuestion(0);
      updatePoints(0);
   }

   function showScreen(index) {
      screens.forEach((screen, i) => screen.classList.toggle('visible', i === index));
   }

   function updatePoints(newPoints) {
      pointsIndex = newPoints;
      points.forEach((point) => (point.textContent = pointsIndex));
   }

   function setActiveQuestion(index) {
      activeIndex = index;
      const question = document.querySelector('.question'),
         activeQuestion = questions[index];

      question.textContent = activeQuestion.text;
      img.src = activeQuestion.imgSrc;
      img.style.width = '300px';

      if (window.innerWidth <= 600) {
         img.style.width = '200px';
      }

      activeQuestion.isChecking = false;
      setupAnswers(activeQuestion);
   }

   function setupAnswers(question) {
      const letters = ['A', 'B', 'C', 'D'];

      answers.forEach((answer, i) => {
         answer.textContent = `${letters[i]}. ${question.answers[i]}`;
         answer.removeEventListener('click', handleAnswerClick);
         answer.addEventListener('click', () => handleAnswerClick(answer, question));
      });
   }

   async function handleAnswerClick(answer, question) {
      if (question.isChecking) return;

      question.isChecking = true;
      highlightAnswer(answer, 'active');

      const rightAnswer = answers[question.rightIndex],
         isRightAnswer = rightAnswer.textContent === answer.textContent;

      await highlightAnswer(rightAnswer, 'right');

      if (!isRightAnswer) {
         showScreen(2);
         return;
      }

      const isLastQuestion = activeIndex === questions.length - 1;

      if (isLastQuestion) {
         showScreen(3);
      } else {
         setActiveQuestion(activeIndex + 1);
      }

      updatePoints(pointsIndex + bounty);
   }

   async function highlightAnswer(answer, type) {
      answer.classList.add(type);
      await timeout(highlightTimeout);
      clearClassFromQuestion(answer);
   }

   function clearClassFromQuestion(answer) {
      ['active', 'right'].forEach((className) => answer.classList.remove(className));
   }

   function timeout(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
   }
});
