const source = new EventSource('/data');

var divElement = document.createElement('div');
document.body.appendChild(divElement);

source.addEventListener('message', message => {
    divElement.innerHTML = message.data;
});