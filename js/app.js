let listBtn = document.querySelectorAll("button");
let tabContent = document.querySelectorAll(".tab-content"); // NodeList
let tabBody = document.querySelector(".tab-body");

async function getImages(query) {
  let response = await fetch(`https://api.pexels.com/v1/search?query=${query}`,
    {
      headers: {
        Authorization:
          "Em3o19UegJwEba5Yst4X7PTbIRk6v14TwSkxxqvuaNIm474noiUzyM2a",
      },
    }
  );

    let data = await response.json();
    console.log(data);
    
  let images = data.photos.map((photo) => photo.src.medium); // Get image URL (medium size)
  return images;
}

async function addImagesToTab(query) {
  showLoader();
  let images = await getImages(query); // Wait for images to load
  hideLoader();

    tabContent.forEach((tab, index) => {
    tab.innerHTML = ""; // Clear existing content

    if (images[index]) {
      let imgTag = document.createElement("img");
      imgTag.src = images[index];
        imgTag.alt = "Image";
        imgTag.loading = "lazy"; 
      tab.appendChild(imgTag);
    }
  });
}

listBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    listBtn.forEach((button) => button.classList.remove("active"));
    btn.classList.add("active");

    let query = btn.textContent.trim(); // Dynamic query based on button text
    console.log("Button Clicked with Query:", query); // <-- Add this line

    addImagesToTab(query); // Load images on button click
  });
});

// Optional: Initial load
addImagesToTab("books");

function showLoader() {
    document.getElementById("loader").style.display = "block";
    tabBody.style.display = "none"; // Hide tab body while loading
}

function hideLoader() {
  document.getElementById("loader").style.display = "none";
  tabBody.style.display = "flex"; // Show tab body after loading
}

