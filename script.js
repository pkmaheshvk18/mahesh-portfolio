const text = ["DevOps Engineer", "AWS Specialist", "Kubernetes Expert"];
let i = 0, j = 0, current = "", deleting = false;

function type() {
  current = text[i];
  if (!deleting) {
    document.getElementById("typing").innerHTML = current.substring(0, j++);
    if (j > current.length) {
      deleting = true;
      setTimeout(type, 1000);
      return;
    }
  } else {
    document.getElementById("typing").innerHTML = current.substring(0, j--);
    if (j === 0) {
      deleting = false;
      i = (i + 1) % text.length;
    }
  }
  setTimeout(type, deleting ? 50 : 100);
}
type();
