  // array is created to hold all the cards
  let card = document.getElementsByClassName("card");
  let cards = [...card];
  
  // deck variable created to hold all of the cards
  const deck = document.getElementById("card-deck");
  
  //counter variable is created to hold the number of moves
  let counter = document.querySelector(".moves");
  // star variable is created to store the stars in
  const stars = document.querySelectorAll(".fa-star");
  // matchedCard variable is created
  let matchedCard = document.getElementsByClassName("match");

  let starsList = document.querySelectorAll(".stars li");

  let closeIcon = document.querySelector(".close");
   // popup message is created
  let modal = document.getElementById("popup")
   // array for opened cards
  var openedCards = [];
  // move variables is created
  var moves = 0;
  
  // Shuffle function from http://stackoverflow.com/a/2450976
  function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
      }
      return array;
  }
  //startGame function is activated as soon as window is loaded across  browser
  window.onload = startGame();
  // startGame function created to start and play the game
  function startGame() {
  //deck of cards is shuffled
    var shuffleCards = shuffle(cards);
    for (var i = 0; i < shuffleCards.length; i++) {
      //deck.innerHTML = "";
      [].forEach.call(cards, function(item){
        deck.appendChild(item);
      });
      cards[i].classList.remove("show", "open", "match", "disabled");
    }
  // moves is set to 0
    moves = 0;
    counter.innerHTML = moves;
    for (var i = 0; i < stars.length; i++) {
      stars[i].style.color = "FFD700";
      stars[i].style.visibility = "visible";
    }
  //timer is set to 0
    sec = 0;
    min = 0;
    hour = 0;
    let timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
  }
  // moveCounter function counts the number of moves a player takes
  function moveCounter(){
    moves++;
    counter.innerHTML = moves;
    if(moves == 1){
      sec = 0;
      min = 0;
      hour = 0;
      startTimer();
    }
  // star rating changes depending on the number of moves it took to complete the game
    if(moves>9 && moves <14){
      for (var i = 0; i < 3; i++) {
        if(i>1){
          stars[i].style.visibility = "collapse";
        }
      }
    }
    else if (moves> 16) {
      for (var i = 0; i < 3; i++) {
        if (i>0){
          stars[i].style.visibility = "collapse";
        }
      }
    }
  }
  //timer parameters are set for the game
  var sec = 0, min = 0; hour = 0;
  var timer = document.querySelector(".timer");
  var interval;
  function startTimer(){
    interval = setInterval(function(){
      timer.innerHTML = min + " mins " + sec + " secs";
      sec++;
      if(sec == 60){
        min++;
        sec = 0;
      }
      if(min ==60){
        hour++;
        min = 0;
      }
    },1000);
  }
  // toggle between open and show class to display open Cards
  var displayCard = function(){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
  };
  // cardsFlipped function adds the selected cards to openCards array and checks if the cards are matched or not
  function cardFlipped(){
    openedCards.push(this);
    var flips = openedCards.length;
    if(flips === 2 ){
      moveCounter();
      if(openedCards[0].type === openedCards[1].type){
        matched();
      } else {
        unmatched();
      }
    }
  };
  //matched function created when 2 cards are a match
  function matched(){
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open", "no-event");
    openedCards[1].classList.remove("show", "open", "no-event");
    openedCards = [];
  }
  //unmatched function created when 2 cards don't match
  function unmatched(){
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disabled();
    setTimeout(function(){
    openedCards[0].classList.remove("show", "open", "no-event", "unmatched");
    openedCards[1].classList.remove("show", "open", "no-event", "unmatched");
    enable();
    openedCards = [];
    },1100);
  }
  //cards are disabled temporarily
  function disabled(){
    Array.prototype.filter.call(cards, function(card){
      card.classList.add("disabled");
    });
  }
  //cards are enabled and matched cards are disabled
  function enable(){
    Array.prototype.filter.call(cards, function(card){
      card.classList.remove("disabled");
      for (var i = 0; i < matchedCard.length; i++) {
        matchedCard[i].classList.add("disabled");
      }
    });
  }
  //function closeModal is created so the modal can be closed and the game reset
  function closeModal(){
    closeIcon.addEventListener("click", function(){
      modal.classList.remove("show");
      startGame();
    });
  }
  // Congratulation function is created when all the cards are flipped with the correct pairing
  function Congratulation(){
    if(matchedCard.length == 16){
      clearInterval(interval);
      finalTime = timer.innerHTML;
  // Congratulations modal is shown
      modal.classList.add("show");
  // a varible starRating is created
      var starRating = document.querySelector(".stars").innerHTML;
      document.getElementById("finalMove").innerHTML = moves;
      document.getElementById("starRating").innerHTML = starRating;
      document.getElementById("totalTime").innerHTML = finalTime;
      closeModal();
    };
  }
  // play again function is created to reset play
  function playAgain(){
    modal.classList.remove("show");
    startGame();
  }
  // event listener is looped so each card has an event listener
  for (var i = 0; i < cards.length; i++) {
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardFlipped);
    card.addEventListener("click", Congratulation);
  };
