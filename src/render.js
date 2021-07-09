const { remote, clipboard } = require("electron");
const Toastify = require("toastify-js");
const fs = require("fs");
const path = require("path");
const electron = require("electron");

const win = remote.getCurrentWindow(); /* Note this is different to the
html global `window` variable */

const userDataPath = path.join(
  (electron.app || electron.remote.app).getPath("userData"),
  "data.json"
);

// When document has loaded, initialise
document.onreadystatechange = (event) => {
  if (document.readyState == "complete") {
    handleWindowControls();
  }
};

window.onbeforeunload = (event) => {
  /* If window is reloaded, remove win event listeners
    (DOM element listeners get auto garbage collected but not
    Electron win listeners as the win is not dereferenced unless closed) */
  win.removeAllListeners();
};

function handleWindowControls() {
  // Make minimise/maximise/restore/close buttons work when they are clicked
  document.getElementById("min-button").addEventListener("click", (event) => {
    win.minimize();
  });

  document.getElementById("max-button").addEventListener("click", (event) => {
    win.maximize();
  });

  document
    .getElementById("restore-button")
    .addEventListener("click", (event) => {
      win.unmaximize();
    });

  document.getElementById("close-button").addEventListener("click", (event) => {
    win.close();
  });

  // Toggle maximise/restore buttons when maximisation/unmaximisation occurs
  toggleMaxRestoreButtons();
  win.on("maximize", toggleMaxRestoreButtons);
  win.on("unmaximize", toggleMaxRestoreButtons);

  function toggleMaxRestoreButtons() {
    if (win.isMaximized()) {
      document.body.classList.add("maximized");
    } else {
      document.body.classList.remove("maximized");
    }
  }
}

window.onload = (event) => {
  let addModalOn = false;

  let cards = document.getElementsByClassName("card");

  const addModal = document.getElementById("add-modal");
  const offlineModal = document.getElementById("offline-modal");
  const mainApp = document.getElementById("main-app");
  const cancelModalButton = document.getElementById("cancel-button");
  const addButton = document.getElementById("add-button");
  const imageAddressInput = document.getElementById("image-address-url");
  const saveButton = document.getElementById("save-button");
  const emojiGrid = document.getElementById("emoji-grid");

  let imageAddressArray = [];

  console.log(fs.existsSync(userDataPath));

  if (fs.existsSync(userDataPath)) {
    const data = fs.readFileSync(userDataPath);
    var imageAddressArrayData = JSON.parse(data)["imageAddressArray"];
  } else {
    const data = { imageAddressArray: [] };
    var imageAddressArrayData = data["imageAddressArray"];
  }

  imageAddressArray = imageAddressArrayData;

  const loadImageAddressArray = () => {
    while (emojiGrid.firstChild) {
      emojiGrid.removeChild(emojiGrid.firstChild);
    }
    imageAddressArray.forEach((imageAddress) => {
      const card = document.createElement("div");
      const cardOverlay = document.createElement("div");
      const cardCopyText = document.createElement("h2");
      const cardButton = document.createElement("button");
      const cardIcon = document.createElement("i");
      const cardImage = document.createElement("img");

      card.classList.add("card");
      cardImage.classList.add("card-img");
      cardOverlay.classList.add("card-overlay");
      cardIcon.classList.add("bi");
      cardIcon.classList.add("bi-x");

      cardImage.setAttribute("src", imageAddress);
      cardImage.setAttribute("alt", "Image unavailable");

      cardCopyText.innerText = "Copy";

      cardButton.appendChild(cardIcon);

      cardOverlay.appendChild(cardCopyText);
      cardOverlay.appendChild(cardButton);

      card.appendChild(cardOverlay);
      card.appendChild(cardImage);

      emojiGrid.appendChild(card);
    });

    for (let i = 0; i < cards.length; i++) {
      document.getElementsByClassName("card-overlay")[i].onclick = (e) => {
        if (e.target.tagName === "I") {
          removeFromImageAddressArray(
            document.getElementsByClassName("card-img")[i].src
          );
        } else {
          const imageURL = document.getElementsByClassName("card-img")[i].src;
          clipboard.writeText(imageURL);
        }
      };
    }
  };

  const pushImageAddressArray = (newImageAddress) => {
    fetch(newImageAddress, { method: "HEAD" })
      .then((res) => {
        if (res.ok) {
          let exists = false;
          imageAddressArray.forEach((imageAddress) => {
            if (newImageAddress === imageAddress) exists = true;
          });

          if (!exists) {
            imageAddressArray.push(newImageAddress);
            const data = JSON.stringify({
              imageAddressArray: imageAddressArray,
            });
            fs.writeFileSync(userDataPath, data, (error) => {
              console.log(error);
            });
          } else {
            Toastify({
              text: "Image already exists",
            }).showToast();
          }

          loadImageAddressArray();
        } else {
          Toastify({
            text: "Image unavailable",
          }).showToast();
        }
      })
      .catch((error) => {
        console.log(error);
        Toastify({
          text: "Image unavailable",
        }).showToast();
      });
  };

  const removeFromImageAddressArray = (removedImageAddress) => {
    imageAddressArray = imageAddressArray.filter(
      (imageAddress) => imageAddress !== removedImageAddress
    );

    const data = JSON.stringify({ imageAddressArray: imageAddressArray });
    fs.writeFileSync(userDataPath, data, (error) => {
      console.log(error);
    });

    loadImageAddressArray();
  };

  loadImageAddressArray();

  saveButton.onclick = () => {
    pushImageAddressArray(imageAddressInput.value);
    addModalOn = !addModalOn;
    addModal.style.opacity = addModalOn ? 1 : 0;
    addModal.style.visibility = addModalOn ? "visible" : "hidden";
  };

  cancelModalButton.onclick = () => {
    addModalOn = !addModalOn;
    addModal.style.opacity = addModalOn ? 1 : 0;
    addModal.style.visibility = addModalOn ? "visible" : "hidden";
  };

  addButton.onclick = () => {
    addModalOn = !addModalOn;
    addModal.style.opacity = addModalOn ? 1 : 0;
    addModal.style.visibility = addModalOn ? "visible" : "hidden";
    imageAddressInput.value = "";
  };

  const updateOnlineStatus = () => {
    mainApp.style.display = navigator.onLine ? "flex" : "none";
    offlineModal.style.display = navigator.onLine ? "none" : "block";
  };

  updateOnlineStatus();

  window.ononline = updateOnlineStatus;
  window.onoffline = updateOnlineStatus;
};

/* "https://live.staticflickr.com/3161/2900293573_bf195dd566_c.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png",
    "https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg",
    "https://tinypng.com/images/social/website.jpg",
    "https://cdn.vox-cdn.com/thumbor/w_NRTaIXZrEriB39pGua86jFAOY=/0x0:1981x2000/1200x800/filters:focal(833x842:1149x1158)/cdn.vox-cdn.com/uploads/chorus_image/image/69021490/m87_lo_april11_polarimetric_average_image_ml_deband_cc_8bit_srgb.0.jpeg",
    "https://emoji.gg/assets/emoji/3493_dread.png" */
