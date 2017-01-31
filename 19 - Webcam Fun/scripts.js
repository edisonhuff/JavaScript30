const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
  navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then(localMediaStream => {
      video.src = window.URL.createObjectURL(localMediaStream);
      video.play();
    })
    .catch(err => console.error('An error occured while trying to access your webcam', err));
}

function paintToCanvas() {
  const {
    videoHeight: height,
    videoWidth: width,
  } = video;

  canvas.width = width;
  canvas.height = height;

  const drawAndUpdate = () => {
    ctx.drawImage(video, 0, 0, width, height);
    const pixels = ctx.getImageData(0, 0, width, height);
    ctx.putImageData(rgbEffect(pixels), 0, 0);
    requestAnimationFrame(drawAndUpdate);
  };

  requestAnimationFrame(drawAndUpdate);
}

function takePhoto() {
  snap.currentTime = 0;
  snap.play();

  console.log('herp');
  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'good Lookin');
  link.innerHTML = `<img src="${data}" alt="Good Lookin" />`;
  strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4 ){
    pixels.data[i + 0] = pixels.data[i + 0] + 100;
    pixels.data[i + 1] = pixels.data[i + 1] - 100;
    pixels.data[i + 2] = pixels.data[i + 2] - 100;
  }
  return pixels;
}

function rgbEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4 ){
    pixels.data[i - 4] = pixels.data[i + 0];
    pixels.data[i + 500] = pixels.data[i + 1];
    pixels.data[i - 510] = pixels.data[i + 2];
  }
  return pixels;
}

video.addEventListener('canplay', paintToCanvas);
getVideo();