const API_NAME = "Nova";
const API_KEY = "hNk5sVoMrWRYGPserpvrsqwM";

async function handleUpload() {
  const fileInput = document.getElementById('imageUpload');
  const uploadButton = document.querySelector('.upload-submit');
  const backgroundImage = document.getElementById("background");

  uploadButton.disabled = true;
  uploadButton.textContent = 'Đang xử lý...';

  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append('size', 'auto');
  formData.append('image_file', file);

  try {
    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': API_KEY
      },
      body: formData
    });

    const processedImageURL = URL.createObjectURL(await response.blob());
    const processedImage = new Image();

    processedImage.onload = function () {
      var processedImageWidth = 170;
      var processedImageHeight = 250;
      var processedImageX = 1140;
      var processedImageY = 175;

      const canvas = document.createElement('canvas');
      canvas.width = backgroundImage.naturalWidth;
      canvas.height = backgroundImage.naturalHeight;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(backgroundImage, 0, 0);
      ctx.drawImage(processedImage, processedImageX, processedImageY, processedImageWidth, processedImageHeight);

      backgroundImage.src = canvas.toDataURL('image/jpeg');

      URL.revokeObjectURL(processedImageURL);

      uploadButton.disabled = false;
      uploadButton.textContent = 'UPLOAD';
    };

    processedImage.src = processedImageURL;
  } catch (error) {
    console.error(error);
  }
}

const setBackgroundImageButton = document.getElementById('changeBackground');
const newBackgroundImageInput = document.getElementById('newBackgroundImage');

setBackgroundImageButton.addEventListener('click', function () {
  newBackgroundImageInput.click();
});

newBackgroundImageInput.addEventListener('change', function () {
  const file = this.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const backgroundImage = document.getElementById("background");
    backgroundImage.src = e.target.result;
  }

  reader.readAsDataURL(file);
});
