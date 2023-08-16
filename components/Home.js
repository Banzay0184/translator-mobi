class Home {
    render() {
        const htmlTop = `
            <div class="container">
                <div class="mode">
                     <label class="toggle" for="dark-mode-btn">
        <div class="toggle-track">
          <input type="checkbox" class="toggle-checkbox" id="dark-mode-btn" />
          <span class="toggle-thumb"></span>
          <img src="img/sun-svgrepo-com.svg" alt="" />
          <img src="img/moon-svgrepo-com.svg" alt="" />
        </div>
      </label>
    </div>
    <div class="container">
      <div class="card input-wrapper">
        <div class="from">
          <span class="heading">From :</span>
          <div class="dropdown-container" id="input-language">
            <div class="dropdown-toggle">
              <img class="img-glob" src="img/global-svgrepo-com.svg">
              <span class="selected" data-value="auto">Auto Detect</span>
              <ion-icon name="chevron-down-outline"></ion-icon>
            </div>
            <ul class="dropdown-menu">
              <li class="option active">DropDown Menu Item 1</li>
              <li class="option">DropDown Menu Item 2</li>
            </ul>
          </div>
        </div>
        <div class="text-area">
          <textarea
            id="input-text"
            cols="30"
            rows="10"
            placeholder="Enter your text here"
          ></textarea>
          <div class="chars"><span id="input-chars">0</span> / 5000</div>
        </div>
        <div class="card-bottom">
          <p>Or choose your document!</p>
          <label for="upload-document">
            <span id="upload-title">Choose File</span>
            <ion-icon name="cloud-upload-outline"></ion-icon>
            <input type="file" id="upload-document" hidden />
          </label>
        </div>
      </div>

      <div class="center">
        <div class="swap-position">
          <img src="img/repeat-svgrepo-com.svg">
        </div>
      </div>

      <div class="card output-wrapper">
        <div class="to">
          <span class="heading">To :</span>
          <div class="dropdown-container" id="output-language">
            <div class="dropdown-toggle">
              <img class="img-glob" src="img/global-svgrepo-com.svg">
              <span class="selected" data-value="en">Englsih</span>
              <ion-icon name="chevron-down-outline"></ion-icon>
            </div>
            <ul class="dropdown-menu">
              <li class="option active">DropDown Menu Item 1</li>
              <li class="option">DropDown Menu Item 2</li>
            </ul>
          </div>
        </div>
        <textarea
          id="output-text"
          cols="30"
          rows="10"
          placeholder="Translated text will appear here"
          disabled
        ></textarea>
        <div class="card-bottom">
          <p>Download as a document!</p>
          <button id="download-btn">
            <span>Download</span>
            <ion-icon name="cloud-download-outline"></ion-icon>
          </button>
        </div>
      </div>
    </div>
            </div>
        `;

        ROOT_home.innerHTML = htmlTop;
    }
}

const homePage = new Home();
homePage.render();

const dropdowns = document.querySelectorAll(".dropdown-container"),
    inputLanguageDropdown = document.querySelector("#input-language"),
    outputLanguageDropdown = document.querySelector("#output-language");

function populateDropdown(dropdown, options) {
    dropdown.querySelector("ul").innerHTML = "";
    options.forEach((option) => {
        const li = document.createElement("li");
        const title = option.name + " (" + option.native + ")";
        li.innerHTML = title;
        li.dataset.value = option.code;
        li.classList.add("option");
        dropdown.querySelector("ul").appendChild(li);
    });
}

populateDropdown(inputLanguageDropdown, languages);
populateDropdown(outputLanguageDropdown, languages);

dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("click", (e) => {
        dropdown.classList.toggle("active");
    });

    dropdown.querySelectorAll(".option").forEach((item) => {
        item.addEventListener("click", (e) => {
            //remove active class from current dropdowns
            dropdown.querySelectorAll(".option").forEach((item) => {
                item.classList.remove("active");
            });
            item.classList.add("active");
            const selected = dropdown.querySelector(".selected");
            selected.innerHTML = item.innerHTML;
            selected.dataset.value = item.dataset.value;
            translate();
        });
    });
});
document.addEventListener("click", (e) => {
    dropdowns.forEach((dropdown) => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove("active");
        }
    });
});

const swapBtn = document.querySelector(".swap-position"),
    inputLanguage = inputLanguageDropdown.querySelector(".selected"),
    outputLanguage = outputLanguageDropdown.querySelector(".selected"),
    inputTextElem = document.querySelector("#input-text"),
    outputTextElem = document.querySelector("#output-text");

swapBtn.addEventListener("click", (e) => {
    const temp = inputLanguage.innerHTML;
    inputLanguage.innerHTML = outputLanguage.innerHTML;
    outputLanguage.innerHTML = temp;

    const tempValue = inputLanguage.dataset.value;
    inputLanguage.dataset.value = outputLanguage.dataset.value;
    outputLanguage.dataset.value = tempValue;

    //swap text
    const tempInputText = inputTextElem.value;
    inputTextElem.value = outputTextElem.value;
    outputTextElem.value = tempInputText;

    translate();
});

function translate() {
    const inputText = inputTextElem.value;
    const inputLanguage =
        inputLanguageDropdown.querySelector(".selected").dataset.value;
    const outputLanguage =
        outputLanguageDropdown.querySelector(".selected").dataset.value;
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${inputLanguage}&tl=${outputLanguage}&dt=t&q=${encodeURI(
        inputText
    )}`;
    fetch(url)
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            outputTextElem.value = json[0].map((item) => item[0]).join("");
        })
        .catch((error) => {
            console.log(error);
        });
}

inputTextElem.addEventListener("input", (e) => {
    //limit input to 5000 characters
    if (inputTextElem.value.length > 5000) {
        inputTextElem.value = inputTextElem.value.slice(0, 5000);
    }
    translate();
});

const uploadDocument = document.querySelector("#upload-document"),
    uploadTitle = document.querySelector("#upload-title");

uploadDocument.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (
        file.type === "application/pdf" ||
        file.type === "text/plain" ||
        file.type === "application/msword" ||
        file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
        uploadTitle.innerHTML = file.name;
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = (e) => {
            inputTextElem.value = e.target.result;
            translate();
        };
    } else {
        alert("Please upload a valid file");
    }
});

const downloadBtn = document.querySelector("#download-btn");

downloadBtn.addEventListener("click", (e) => {
    const outputText = outputTextElem.value;
    const outputLanguage =
        outputLanguageDropdown.querySelector(".selected").dataset.value;
    if (outputText) {
        const blob = new Blob([outputText], {type: "text/plain"});
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.download = `translated-to-${outputLanguage}.txt`;
        a.href = url;
        a.click();
    }
});

const darkModeCheckbox = document.getElementById("dark-mode-btn");

darkModeCheckbox.addEventListener("change", () => {
    document.body.classList.toggle("dark");
});

const inputChars = document.querySelector("#input-chars");

inputTextElem.addEventListener("input", (e) => {
    inputChars.innerHTML = inputTextElem.value.length;
});