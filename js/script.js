// loading on off function
const loadingOnOff = (placeName, onOrOff, position) => {
    const getDiv = document.getElementById(placeName);
    const removedPhoneData = document.getElementById("mobileDataInfoBox");
        removedPhoneData.innerText = "";


    const div = document.createElement("div");
    div.classList.add(position);
    div.innerHTML = `
        <div class="loading" id="loading">
            <div class="spinner-border" role="status">
                <span class="sr-only"></span>
            </div>
        </div>
    `;
    getDiv.appendChild(div);

    const showOrNot = document.getElementById("loading").style.display = onOrOff;
}

// find url by Phone 
const allPhones = () => {
    // call loading function 
    loadingOnOff("showPhoneCard", "flex", "nothing");

    const searchInput = document.getElementById("searchInput").value;
    
    const phoneUrl =`https://openapi.programming-hero.com/api/phones?search=${searchInput}`;

    fetch(phoneUrl)
    .then(res => res.json())
    .then(data => displayPhoneUI(data.data, data.status))
};

// display UI all phones 
const displayPhoneUI = (phones, availableData) => {
    const searchInputValue = document.getElementById("searchInput").value;
    const phoneContainer = document.getElementById("showPhoneCard");
    phoneContainer.innerText = "";

    const fast20phone = phones.slice(0, 20);

    if(availableData){
        for(phone of fast20phone){
            const addNewCard = document.createElement("div");
            addNewCard.classList.add('card', 'cardBox', 'col-md-3', 'my-3');
    
            addNewCard.innerHTML = `
                <img src=${phone.image} class="card-img-top" id="phoneImg"  alt="iphone">
                <div class="card-body">
                    <h5 class="card-title PhoneName text-center">${phone.phone_name}</h5>
                    <p class="card-text PhoneBrand text-center">${phone.brand}</p>
    
                    <div class="cardBtnDiv">
                        <button onclick="detailsUrl('${phone.slug}')" class="button" id="detailsBtn">Details</button>
                    </div>
    
                </div>
            `;

            // clear input value
            const searchInput = document.getElementById("searchInput");
            searchInput.value = "";

            document.getElementById("noDataFound").style.display = "none";

            // call loading function 
            loadingOnOff("mobileDataInfoBox", "none", "nothing");

            phoneContainer.appendChild(addNewCard);

        }
    }
    
    else{
        const removedPhoneData = document.getElementById("mobileDataInfoBox");
        removedPhoneData.innerText = "";
        loadingOnOff("showPhoneCard", "none", "nothing");
        document.getElementById("noDataFound").style.display = "flex";
    }
};

// find url by phone Details information 
const detailsUrl = (idNumber) => {
    // call loading function 
    loadingOnOff("showPhoneCard", "flex", "position");

    const phoneDetailsUrl = `https://openapi.programming-hero.com/api/phone/${idNumber}`;

    fetch(phoneDetailsUrl)
    .then(res => res.json())
    .then(data => displayDetails(data.data))
};

//Release Date function
const showReleaseDate = releaseDate => {
    let result = "";
    if(releaseDate){
        result = releaseDate;
    }
    else{
        result = "No Release Date Found"
    }
    return result;
};


// display phone detail information UI
    const displayDetails = details => {

    const mainFea = details.mainFeatures; //main features details
    const sensorsDetails = details.mainFeatures.sensors; //main features details
    const others = details.others; //others details


    const mobileDataInfoBox = document.getElementById("mobileDataInfoBox");
    
    mobileDataInfoBox.innerText = ""; // Clear Prevues Data

    const div = document.createElement("div");

    div.classList.add("container")

    div.innerHTML = `
            <div class="row my-4">

                <div class="mobileImg col-12 col-sm-12 col-md-3"><!--Mobile Image-->
                    <div class="imgWrap">
                        <img src=${details.image}>
                    </div>
                </div>
                <div class="mobileImg col-12 col-sm-12 col-md-9"><!--Mobile Features-->
                    <div class="row">

                        <div class="col-12 col-sm-12 col-md-7 border pt-3 pb-3 ps-3">
                            <h5>${details.name}</h5>
                            <p>${showReleaseDate(details.releaseDate)}</p>

                            <!-- Main Features markup start -->
                            <div class="mainFeatures">
                                <h5>Main Features</h5>
                                <p>Storage: ${mainFea.storage}</p>
                                <p>Display Size: ${mainFea.displaySize}</p>
                                <p>ChipSet: ${mainFea.chipSet}</p>
                                <p>Memory: ${mainFea.memory}</p>
                            </div>
                            <!-- Main Features markup end -->


                        </div>

                        <!-- Others Information markup start -->
                        <div class="col-12 col-sm-12 col-md-5 border pt-3 pb-3 ps-3">
                            <h5>Others</h5>
                            <p>WLAN: ${others.WLAN}</p>
                            <p>Bluetooth: ${others.Bluetooth}</p>
                            <p>GPS: ${others.GPS}</p>
                            <p>NFC: ${others.NFC}</p>
                            <p>Radio: ${others.Radio}</p>
                            <p>USB: ${others.USB}</p>
                        </div>
                        <!-- Others Information markup end  -->


                        <!-- Sensors Information markup start -->
                        <div id="addSensors" class="col-12 col-sm-12 col-md-12 border pt-3 ps-3">
                            <h5>Sensors</h5>

                                
                                <p>${(sensorsDetails[0] !== undefined) ? sensorsDetails[0] : 'No Data'}</p>
                                <p>${(sensorsDetails[1] !== undefined) ? sensorsDetails[1] : 'No Data'}</p>
                                <p>${(sensorsDetails[2] !== undefined) ? sensorsDetails[2] : 'No Data'}</p>
                                <p>${(sensorsDetails[3] !== undefined) ? sensorsDetails[3] : 'No Data'}</p>
                                <p>${(sensorsDetails[4] !== undefined) ? sensorsDetails[4] : 'No Data'}</p>
                                <p>${(sensorsDetails[5] !== undefined) ? sensorsDetails[5] : 'No Data'}</p>


                        </div>
                        <!-- Sensors Information markup end  -->

                    </div>
                </div>

            </div>
        `;


console.log(sensorsDetails[5])

        // call loading function 
        loadingOnOff("showPhoneCard", "none", "position");
        mobileDataInfoBox.appendChild(div);

};



