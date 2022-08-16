const source = new EventSource('/memes');

var image = new Image();
document.body.appendChild(image);

source.addEventListener('message', message => {
    image.src = message.data;
});