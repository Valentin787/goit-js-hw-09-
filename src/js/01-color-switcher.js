const formRef = {
  body: document.querySelector("body"),
  btnStart: document.querySelector("[data-start]"),
  btnStop: document.querySelector("[data-stop]")
}
function getRandomHexColor() {
return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
let timeId = null;


const handlerStart = () => {
  timeId = setInterval(() => {
    formRef.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  formRef.btnStop.removeAttribute("disabled", false);
  formRef.btnStart.setAttribute("disabled", true);
  

}

const handlerStop = () => {
  clearInterval(timeId);
  formRef.btnStart.removeAttribute("disabled", false);
  formRef.btnStop.setAttribute("disabled", true);

}
console.log(formRef.body)
console.log(formRef.btnStart)
console.log(formRef.btnStop)

formRef.btnStart.addEventListener('click', handlerStart);
formRef.btnStop.addEventListener('click', handlerStop);


