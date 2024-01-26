document.addEventListener('DOMContentLoaded', function () {
  const boxTable = document.getElementById('boxTable');
  const startButton = document.getElementById('startButton');
  const timerSound = document.getElementById('timerSound');

  startButton.addEventListener('click', startAnimation);

  function startAnimation() {
      // Disable the spin button
      startButton.disabled = true;

      // Reset all boxes to default style
      resetBoxes();

      // Play the timer sound
      playTimerSound();

      // Randomly blink all boxes
      blinkAllBoxes();

      // After 10 seconds, find the unblinking box as the winner
      setTimeout(() => {
          const winnerBox = findUnblinkingBox();
          celebrateWinner(winnerBox.innerText);

          // Enable the spin button after winner is declared
          startButton.disabled = false;
      }, 10000);
  }

  function resetBoxes() {
      const allBoxes = boxTable.querySelectorAll('.box');
      allBoxes.forEach(box => {
          box.style.backgroundColor = '#3498db'; // Default background color
          box.style.color = '#fff'; // Default text color
          box.classList.remove('blinking', 'winner');
      });
  }

  function playTimerSound() {
      // Pause and rewind the audio to play from the beginning
      timerSound.pause();
      timerSound.currentTime = 0;
      timerSound.play();
  }

  function blinkAllBoxes() {
      const allBoxes = Array.from(boxTable.querySelectorAll('.box'));
      const blinkingBoxes = getRandomBoxes(allBoxes, 6);

      blinkingBoxes.forEach(box => {
          box.classList.add('blinking');
      });
  }

  function findUnblinkingBox() {
      const allBoxes = boxTable.querySelectorAll('.box');
      const blinkingBoxes = Array.from(allBoxes).filter(box => box.classList.contains('blinking'));

      if (blinkingBoxes.length > 0) {
          const randomIndex = Math.floor(Math.random() * blinkingBoxes.length);
          const unblinkingBox = blinkingBoxes[randomIndex];
          unblinkingBox.classList.remove('blinking');
          unblinkingBox.classList.add('winner');
          return unblinkingBox;
      }

      // If no unblinking box found, select a random box as the winner
      const randomBox = getRandomBoxes(allBoxes, 1)[0];
      randomBox.classList.add('winner');
      return randomBox;
  }

  function celebrateWinner(winnerName) {
      const confettiContainer = document.createElement('div');
      confettiContainer.className = 'confetti-container';
      document.body.appendChild(confettiContainer);

      const confettiColors = ['#ffcc00', '#ff6600', '#ff3399', '#99ff33', '#3399ff'];

      for (let i = 0; i < 100; i++) {
          const confetti = document.createElement('div');
          confetti.className = 'confetti';
          confetti.style.backgroundColor = confettiColors[i % confettiColors.length];
          confettiContainer.appendChild(confetti);
      }

      setTimeout(() => {
          // Remove confetti container
          document.body.removeChild(confettiContainer);

          // Show result in celebration style
          showResultCelebration(winnerName);
      }, 5000); // Wait for 5 seconds before removing confetti and showing result
  }

  function showResultCelebration(winnerName) {
      const resultContainer = document.createElement('div');
      resultContainer.className = 'result-container';
      document.body.appendChild(resultContainer);

      const winnerText = document.createElement('div');
      winnerText.className = 'winner-text';
      winnerText.innerText = `${winnerName} is the Winner! 🎉`;
      resultContainer.appendChild(winnerText);

      const crackers = document.createElement('div');
      crackers.className = 'crackers';
      resultContainer.appendChild(crackers);

      setTimeout(() => {
          // Remove result container
          document.body.removeChild(resultContainer);
          resetBoxes(); // Reset for the next round
      }, 10000); // Wait for 10 seconds before removing result container
  }

  function getRandomBoxes(boxes, count) {
      const shuffledBoxes = shuffleArray(boxes);
      return shuffledBoxes.slice(0, count);
  }

  function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
  }
});
