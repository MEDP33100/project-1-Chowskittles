// image and sound info for each stage
const stages = [
  { image: "assets/images/egg.png", text: "The egg stage.", sound: null },
  { image: "assets/images/caterpillar.png", text: "The caterpillar grows.", sound: null },
  { image: "assets/images/cocoon.png", text: "The cocoon is formed.", sound: null },
  { image: "assets/images/butterfly.png", text: "The butterfly emerges.", sound: "butterfly-flap" },
];

// this will change depending if next or previous buttons are clicked
let currentStage = 0;

// get elements
const stageImage = document.getElementById("stageImage");
const description = document.getElementById("description");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
const nextSound = document.getElementById("nextSound");
const butterflyFlap = document.getElementById("butterfly-flap");

// move the caterpillar left to right
function animateCaterpillar() {
  gsap.to(stageImage, {
    x: 100,
    duration: 2,
    ease: "power1.inOut",
    repeat: -1,
    yoyo: true,
  });
}

// move the butterfly up and down
function animateButterfly() {
  gsap.to(stageImage, {
    y: -50,
    duration: 2,
    ease: "power1.inOut",
    repeat: -1,
    yoyo: true,
  });
}

// update stage
function updateStage() {
  const stage = stages[currentStage];
  stageImage.src = stage.image; // update image
  description.textContent = stage.text; // update text

  // play the sound associated with the stage
  if (stage.sound) {
    const soundElement = document.getElementById(stage.sound);
    soundElement.play();
  }

  // stops animation; GSAP naming convention (weird one though)
  gsap.killTweensOf(stageImage);

  // apply animations
  if (currentStage === 1) {
    // caterpillar moves left to right
    animateCaterpillar();
  } else if (currentStage === 3) {
    // butterfly moves up and down
    animateButterfly();
  } else {
    // reset position for all other stages
    gsap.set(stageImage, { x: 0, y: 0 });
  }

  // fade-in for image and description - from 0 opacity to full
  gsap.fromTo(stageImage, { opacity: 0 }, { opacity: 1, duration: 1 });
  gsap.fromTo(description, { opacity: 0 }, { opacity: 1, duration: 1 });
}

// go to the next stage
nextButton.addEventListener("click", () => {
  if (currentStage < stages.length - 1) {
    currentStage++; // move to the next stage
    updateStage(); // update display
    nextSound.play(); // play the 'next' sound - thanks, pokemon!
  }
});

// go to the previous stage if 'previous' button clicked
previousButton.addEventListener("click", () => {
  if (currentStage > 0) {
    currentStage--; // move to the previous stage
    updateStage(); // update display
  }
});

// initialize the first stage (egg stage)
window.addEventListener("load", () => {
  updateStage(); 
});
