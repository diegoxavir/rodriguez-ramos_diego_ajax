(() => {

    //variables
    const hotspots = document.querySelectorAll(".Hotspot");
    const materialTemplate = document.querySelector("#material-template");
    const materialList = document.querySelector("#material-list");
    const hotspotTemplate = document.querySelector("#hotspot-template");
    const loader = document.querySelector("#loader");
    const loader2 = document.querySelector("#loader2");
  
    //This information needs to be removed then pulled with an AJAX Call using the Fetch API
    //this is the api url https://swiftpixel.com/earbud/api/infoboxes"
  
  
  
    //functions
    function loadInfoBoxes() {
      loader.classList.toggle("hidden");
      
      fetch("https://swiftpixel.com/earbud/api/infoboxes")
      .then(response => response.json())
      .then(infoBoxes => {
      console.log(infoBoxes);
  
  
      infoBoxes.forEach((infoBox, index) => {
  
        const infoClone = hotspotTemplate.content.cloneNode(true);
  
        let selected = document.querySelector(`#hotspot-${index + 1}`);
  
        //console.log(infoBox.thumbnail);
        const hotspotImg = infoClone.querySelector(".hotspot-img");
        hotspotImg.src = `images/${infoBox.thumbnail}`;
  
        const hotspotHeader = infoClone.querySelector(".hotspot-h2");
        hotspotHeader.textContent = infoBox.heading;
  
        const hotspotText = infoClone.querySelector('.hotspot-p');
        hotspotText.textContent = infoBox.description;
  
        selected.appendChild(infoClone);
      });
      
      loader.classList.toggle("hidden");
      //some situations need to clear the content
      loader.innerHTML = "";
      
  })
  
    //catch error
    .catch(error => {
      console.log(error);
      const modelObj = document.querySelector(".model-obj");
      const errorMsg = document.createElement("p");
      errorMsg.textContent = "WHOOPS! Something went wrong when loading our site, please check your internet connection and try again.";
  
      modelObj.appendChild(errorMsg);
    })
  
  
  
  
    }
    loadInfoBoxes();
  
    function loadMaterialInfo() {
      loader2.classList.toggle("hidden");
      fetch("https://swiftpixel.com/earbud/api/materials")
      .then(response => response.json())
      .then(materials => {
        console.log(materials);
  
  
        materials.forEach(material => {
  
    
  
          // clone template
          const clone = materialTemplate.content.cloneNode(true);
          //populate with data
          const materialHeading = clone.querySelector(".material-heading");
          materialHeading.textContent = material.heading;
      
          const materialDesc = clone.querySelector(".material-desc");
          materialDesc.textContent = material.description;
      
          materialList.appendChild(clone);
      })
  
      loader2.classList.toggle("hidden");
      //some situations need to clear the content
      loader2.innerHTML = "";
      materialList.appendChild();
  
  
  
    })
    .catch(error => {
      console.log(error);
      const errorMsg2 = document.createElement("p");
      errorMsg2.textContent = "Oops, it looks like somthing went wrong, check your internet connection.";
  
      materialList.appendChild(errorMsg2);
  })
  
    }
    loadMaterialInfo();
  
  
    function showInfo() {
      let selected = document.querySelector(`#${this.slot}`);
      gsap.to(selected, 1, { autoAlpha: 1 });
    }
  
    function hideInfo() {
      let selected = document.querySelector(`#${this.slot}`);
      gsap.to(selected, 1, { autoAlpha: 0 });
    }
  
    //Event listeners
  
    hotspots.forEach(function (hotspot) {
      hotspot.addEventListener("mouseenter", showInfo);
      hotspot.addEventListener("mouseleave", hideInfo);
    });
  
  
  
  
  
  
  })();
  
  