const movies = [
    "Barfi",
    "Aawargi",
    "Dum Laga Ke Haisha",
    "Meri Pyaari Bindu",
    "Chup Chup Ke",
    "Haider"
  ];
  
  const canvas = document.getElementById("wheelCanvas");
  const ctx = canvas.getContext("2d");
  const spinButton = document.getElementById("spinButton");
  const movieResult = document.getElementById("movieResult");
  
  const numSegments = movies.length;
  const arcSize = 360 / numSegments; // Angle size for each segment in degrees
  let currentRotation = 0;  // Track the current rotation angle
  
  // Draw the wheel
  function drawWheel() {
    const startAngle = -90; // Start from the top
    for (let i = 0; i < numSegments; i++) {
      const angleStart = (startAngle + i * arcSize) * (Math.PI / 180);
      const angleEnd = (startAngle + (i + 1) * arcSize) * (Math.PI / 180);
  
      // Draw segment
      ctx.beginPath();
      ctx.moveTo(200, 200);
      ctx.arc(200, 200, 200, angleStart, angleEnd);
      ctx.fillStyle = i % 2 === 0 ? "#ffcccb" : "#add8e6"; // Alternate colors
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.save();
  
      // Add text
      const angleMiddle = angleStart + (angleEnd - angleStart) / 2;
      ctx.translate(200 + Math.cos(angleMiddle) * 150, 200 + Math.sin(angleMiddle) * 150);
      ctx.rotate(angleMiddle + Math.PI / 2);
      ctx.fillStyle = "#000000";
      ctx.font = "bold 14px Arial";
      ctx.fillText(movies[i], -ctx.measureText(movies[i]).width / 2, 0);
      ctx.restore();
    }
  }
  
  // Spin the wheel
  function spinWheel() {
    spinButton.disabled = true; // Disable button during spin
  
    // Generate a random number between 0 and numSegments
    const selectedSegment = Math.floor(Math.random() * numSegments);
  
    // Calculate the degrees to land on the top for the selected segment
    const targetAngle = (selectedSegment * arcSize) - 90; // Target angle to bring the selected segment to the top (0 degrees)
    
    // Calculate the random degree rotation (similar to your rotateFunction)
    const min = 1024;
    const max = 9999;
    const deg = Math.floor(Math.random() * (max - min)) + min; // Random degree between 1024 and 9999
  
    // Final rotation to ensure the selected segment ends up at the top
    const totalRotation = deg + targetAngle;
  
    const spinDuration = 5000; // Spin duration in milliseconds
    const spinStart = Date.now();
    let rotation = 0;
  
    const spinInterval = setInterval(() => {
      const elapsed = Date.now() - spinStart;
      if (elapsed >= spinDuration) {
        clearInterval(spinInterval);
  
        // Set the final rotation angle
        currentRotation = totalRotation % 360; // Ensure the angle stays within 360 degrees
  
        // Display the result
        movieResult.textContent = `🎥 ${movies[selectedSegment]}!`;
        spinButton.disabled = false; // Re-enable button after spin
        return;
      }
  
      // Ease-out effect for smooth spinning
      const easing = Math.sin((elapsed / spinDuration) * (Math.PI / 2));
      rotation = currentRotation + (totalRotation - currentRotation) * easing;
      canvas.style.transform = `rotate(${rotation}deg)`;
    }, 16); // 60fps for smooth spinning
  }
  
  // Initial setup
  drawWheel();
  
  // Event listener for the spin button
  spinButton.addEventListener("click", spinWheel);
  