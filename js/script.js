// find url by Phone 
const allPhones = () => {
    const searchInput = document.getElementById("searchInput").value;
    
    const phoneUrl =`https://openapi.programming-hero.com/api/phones?search=${searchInput}`;

    fetch(phoneUrl)
    .then(res => res.json())
    .then(data => displayPhoneUI(data.data, data.status))
};

// display UI all phones 
const displayPhoneUI = (phones, availableData) => {
    const phoneContainer = document.getElementById("showPhoneCard");
    phoneContainer.innerText = "";

    if(availableData){
        for(phone of phones){
            const addNewCard = document.createElement("div");
            addNewCard.classList.add('card', 'cardBox', 'col-md-4', 'my-3');
    
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
            
            phoneContainer.appendChild(addNewCard);
        }
    }
    else{
        const noDataFound = document.getElementById("noDataFound").style.display = "flex"
    }
};

// find url by phone Details information 

const detailsUrl = (idNumber) => {
    const phoneDetailsUrl = `https://openapi.programming-hero.com/api/phone/${idNumber}`;

    fetch(phoneDetailsUrl)
    .then(res => res.json())
    .then(data => displayDetails(data.data))
};


const displayDetails = details => {
    console.log(details)
    
}