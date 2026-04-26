const foregroundImage = document.getElementById("foreground-image");
const positionNote = document.getElementById("position-note");

if (foregroundImage) {
  const randomPosition = Math.floor(Math.random() * 7);

  foregroundImage.style.top = "auto";
  foregroundImage.style.right = "auto";
  foregroundImage.style.bottom = "auto";
  foregroundImage.style.left = "auto";
  foregroundImage.style.transform = "none";

  if (randomPosition === 0) {
    foregroundImage.style.top = "180px";
    foregroundImage.style.left = "24px";
    positionNote.textContent = "This time the cutout drifted toward the upper-left side of the frame.";
  } else if (randomPosition === 1) {
    foregroundImage.style.top = "120px";
    foregroundImage.style.right = "32px";
    positionNote.textContent = "This time the cutout landed near the upper-right corner.";
  } else if (randomPosition === 2) {
    foregroundImage.style.top = "50%";
    foregroundImage.style.left = "50%";
    foregroundImage.style.transform = "translate(-50%, -50%)";
    positionNote.textContent = "This time the cutout floated into the center of the composition.";
  } else if (randomPosition === 3) {
    foregroundImage.style.bottom = "24px";
    foregroundImage.style.left = "24px";
    positionNote.textContent = "This time the cutout settled into the lower-left corner.";
  } else if (randomPosition === 4) {
    foregroundImage.style.bottom = "24px";
    foregroundImage.style.right = "24px";
    positionNote.textContent = "This time the cutout returned to the lower-right corner.";
  } else if (randomPosition === 5) {
    foregroundImage.style.bottom = "24px";
    foregroundImage.style.left = "50%";
    foregroundImage.style.transform = "translateX(-50%)";
    positionNote.textContent = "This time the cutout dropped near the bottom center of the scene.";
  } else {
    foregroundImage.style.top = "52%";
    foregroundImage.style.right = "28px";
    foregroundImage.style.transform = "translateY(-50%)";
    positionNote.textContent = "This time the cutout hovered along the right side of the image.";
  }
}
