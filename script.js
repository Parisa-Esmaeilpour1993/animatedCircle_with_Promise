const circle = document.getElementById("circle");
const message = document.getElementById("message");

function go() {
  showCircle(150, 150, 100)
    .then(() => {
      message.classList.remove("hidden");
    })
    .catch((error) => {
      console.error("Error occurred:", error.message);
    });
}

function showCircle(cx, cy, r) {
  circle.classList.remove("hidden");

  circle.style.left = cx + "px";
  circle.style.top = cy + "px";

  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      circle.style.width = r * 2 + "px";
      circle.style.height = r * 2 + "px";

      setTimeout(() => {
        message.classList.add("hidden");
        setTimeout(() => {
          message.classList.remove("hidden");
        }, 500);
      }, 100);

      setTimeout(() => {
        reject(new Error("Animation timed out!"));
      }, 2000);

      circle.addEventListener("transitionend", function handler() {
        circle.removeEventListener("transitionend", handler);
        resolve();
      });
    }, 0);
  });
}
