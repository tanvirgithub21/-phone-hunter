// find url by Player 
const allPhones = () => {
    const searchInput = document.getElementById("searchInput").value;
    
    const playerUrl =`https://openapi.programming-hero.com/api/phones?search=${searchInput}`;

    fetch(playerUrl)
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
            addNewCard.classList.add('card', 'cardBox', 'col-lg-4', 'my-3');
    
            addNewCard.innerHTML = `
                <img src=${phone.image} class="card-img-top" id="phoneImg"  alt="iphone">
                <div class="card-body">
                    <h5 class="card-title PhoneName text-center">${phone.phone_name}</h5>
                    <p class="card-text PhoneBrand text-center">${phone.brand}</p>
    
                    <div class="cardBtnDiv">
                        <button class="button" id="detailsBtn">Details</button>
                    </div>
    
                </div>
            `;
    
            phoneContainer.appendChild(addNewCard);
            // console.log(phone)
        }
    }
    else{
        const noDataFound = document.getElementById("noDataFound").style.display = "flex"
    }
}

