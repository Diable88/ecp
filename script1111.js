const API_NAME = 'Nova';
const API_KEY = 'hNk5sVoMrWRYGPserpvrsqwM';

async function handleUpload() {
  const fileInput = document.getElementById('imageUpload');
  const uploadButton = document.querySelector('.upload-button');
  const imageContainer = document.querySelector('.image-container');

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
        'X-Api-Key': API_KEY,
      },
      body: formData,
    });

    const processedImageURL = URL.createObjectURL(await response.blob());
    const processedImage = new Image();

    processedImage.onload = function () {
      const originalImage = document.querySelector('.image-container img');
      originalImage.style.display = 'none';

      imageContainer.innerHTML = '';
      imageContainer.appendChild(processedImage);

      URL.revokeObjectURL(processedImageURL);

      uploadButton.disabled = false;
      uploadButton.textContent = 'UPLOAD';
    };

    processedImage.src = processedImageURL;
  } catch (error) {
    console.error(error);

    uploadButton.disabled = false;
    uploadButton.textContent = 'UPLOAD';
  }
}

const button = document.getElementById('changeBackground');
const fileInput = document.getElementById('newBackgroundImage');

button.addEventListener('click', function () {
  fileInput.click();
});

fileInput.addEventListener('change', function () {
  const file = this.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const backgroundImage = document.getElementById('background');
    backgroundImage.src = e.target.result;
  };

  reader.readAsDataURL(file);
});
