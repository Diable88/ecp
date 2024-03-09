document.addEventListener("DOMContentLoaded", function() {
  const imageUploadInput = document.getElementById("imageUpload");
  const newBackgroundImageInput = document.getElementById("newBackgroundImage");
  const backgroundImgElement = document.getElementById("background");
  const uploadSubmitButton = document.querySelector(".upload-submit");

  function handleImageUpload(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
      backgroundImgElement.src = event.target.result;
    }

    reader.readAsDataURL(file);
  }

  function handleNewBackgroundImageUpload(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
      const processedImgElement = document.createElement("img");
      processedImgElement.src = event.target.result;
      processedImgElement.onload = function() {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = backgroundImgElement.width;
        canvas.height = backgroundImgElement.height;

        ctx.drawImage(backgroundImgElement, 0, 0);
        ctx.drawImage(processedImgElement, 100, 100, 200, 200);

        backgroundImgElement.src = canvas.toDataURL();

        URL.revokeObjectURL(processedImgElement.src);
        processedImgElement.remove();
      };
    }

    reader.readAsDataURL(file);
  }

  imageUploadInput.addEventListener("change", handleImageUpload);
  newBackgroundImageInput.addEventListener("change", handleNewBackgroundImageUpload);

  uploadSubmitButton.addEventListener("click", function() {
    const formData = new FormData();
    formData.append("file", imageUploadInput.files[0]);

    axios.post("your-upload-url", formData)
      .then(response => {
        const processedImageUrl = response.data.processedUrl;

        const processedImgElement = document.createElement("img");
        processedImgElement.src = processedImageUrl;
        processedImgElement.onload = function() {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          canvas.width = backgroundImgElement.width;
          canvas.height = backgroundImgElement.height;

          ctx.drawImage(backgroundImgElement, 0, 0);
          ctx.drawImage(processedImgElement, 100, 100, 200, 200);

          backgroundImgElement.src = canvas.toDataURL();

          URL.revokeObjectURL(processedImgElement.src);
          processedImgElement.remove();
        };
      })
      .catch(error => {
        console.error(error);
      });
  });
});
