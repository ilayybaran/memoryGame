const section = document.querySelector("section");
const playerLivesCount =document.querySelector("span");
const startButton = document.getElementById("start");
const backroundMusic =new Audio('audio/Music/gamemusic.mp3');
let playerLives = 10;

playerLivesCount.textContent = playerLives;
const getData = () =>[
    
       { imgSrc: "./images/arcticmonkeys.jpg" ,name:"arcticmonkeys"},
       { imgSrc: "./images/beatles.jpg" ,name:"beatles"},
       { imgSrc: "./images/gunsnroses.jpg" ,name:"gunsnroses"},
       { imgSrc: "./images/kiss.jpg" ,name:"kiss"},
       { imgSrc: "./images/pinkfloyed.jpg" ,name:"pinkfloyed"},
       { imgSrc: "./images/queen.jpg" ,name:"queen"},
       { imgSrc: "./images/radiohead.jpg" ,name:"radiohead"},
       { imgSrc: "./images/twentyonepilots.jpg" ,name:"twentyonepilots"},
       { imgSrc: "./images/arcticmonkeys.jpg" ,name:"arcticmonkeys"},
       { imgSrc: "./images/beatles.jpg" ,name:"beatles"},
       { imgSrc: "./images/gunsnroses.jpg" ,name:"gunsnroses"},
       { imgSrc: "./images/kiss.jpg" ,name:"kiss"},
       { imgSrc: "./images/pinkfloyed.jpg" ,name:"pinkfloyed"},
       { imgSrc: "./images/queen.jpg" ,name:"queen"},
       { imgSrc: "./images/radiohead.jpg" ,name:"radiohead"},
       { imgSrc: "./images/twentyonepilots.jpg" ,name:"twentyonepilots"},

    ];

  startButton.addEventListener('click',startGame);

    function startGame() {
     toggleScreen("start", false);
     toggleScreen("section", true);
     backroundMusic.volume = 0.4;
     backroundMusic.play();
    }
    
    function toggleScreen (id,toggle) {
      let element = document.getElementById(id);
      let display = (toggle) ? "grid" : "none";
      element.style.display = display;
    }
   
    
    const randomize = () => {
        const cardData = getData();
        cardData.sort(() => Math.random()-0.5);
        console.log(cardData);
        return cardData;
    };
  const cardGenerator = () => {
  const cardData = randomize();
  
  cardData.forEach((item)=> {
  
  const card = document.createElement("div");
  const face = document.createElement("img");
  const back = document.createElement("div");
  card.classList = "card";
  face.classList = "face";
  back.classList = "back";

 face.src = item.imgSrc;
 card.setAttribute("name", item.name);

  section.appendChild(card);
  card.appendChild(face);
  card.appendChild(back);

  card.addEventListener("click",(e) => {
  card.classList.toggle("toggleCard");
  checkedCards(e);
  });
  }); 
  }

  const checkedCards = (e)=> {
    console.log(e);
  const clickCard = e.target;
  clickCard.classList.add("flipped"); // gonna use for the check
  const flippedCards=document.querySelectorAll('.flipped');
  
 if(flippedCards.length === 2){
  if(flippedCards[0].getAttribute("name")===flippedCards[1].getAttribute("name")){
   console.log("match");
   flippedCards.forEach((card) => {
    card.classList.remove("flipped"); //did not remove the toggle cause faces are gonna stay
    card.style.pointerEvents = "none"; // can not click on them when they are matched
   });

  }

  else {
  flippedCards.forEach(card=>{
    card.classList.remove('flipped');
    setTimeout(() =>card.classList.remove("toggleCard"),1000);
  });
  
  playerLives--;
  playerLivesCount.textContent = playerLives;

   setTimeout(() => { // to see the final card flip
   if(playerLives ===0){
     restart();
   }
  },1000);

  }
  }
  };


  //for restarting the game 
  const restart = () => {
    let cardData = randomize();
    let faces = document.querySelectorAll(".face");
    let cards = document.querySelectorAll(".card");
    section.style.pointerEvents ="none";
    cardData.forEach((item,index) => {
     cards[index].classList.remove("toggleCard"); // flips all the cards back when you lose 

     setTimeout(() => {
      location.reload(); //reloads the page
     },1000);
     

     setTimeout(() => {

     cards[index].style.pointerEvents = "all";
     faces[index].src = item.imgSrc; // shuffles the cards
     cards[index].setAttribute("name", item.name); // updates the names
     section.style.pointerEvents ="all";
    },1000);

    }); 
    playerLives = 10;
    playerLivesCount.textContent = playerLives;
    
    
  };

  cardGenerator();