const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  // console.log(phone)
  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  // console.log(phones)
    const phoneContainer = document.getElementById('phone-container');

    // clear phone container cards before adding new cards
    phoneContainer.textContent = '';

    // display show all button if there ar more than 12 items
    const showAllContainer = document.getElementById('Show-all-container');
    if ( phones.length >12 && !isShowAll){
      showAllContainer.classList.remove('hidden')
    }
    else{
      showAllContainer.classList.add('hidden')
    }

    console.log('is Show All', isShowAll)

    // display only first 12 phones if not show all
    if(!isShowAll){
      phones = phones.slice(0,12)
    }

  phones.forEach((phone) => {
    // console.log(phone);
    // 2. create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-gray-100 shadow-xl`;
    // 3. set inner html
    phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
          </div>
        </div>
        `;

        // 4. append child
        phoneContainer.appendChild(phoneCard)
  });

  toggleLoadingSpinner(false)
};

// search hendler button

const hendleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText)
    loadPhone(searchText, isShowAll)
}

//loading spinner
const toggleLoadingSpinner = (isloading) =>{
  loadingSpinner = document.getElementById('loading-spinner');
  if(isloading){
    loadingSpinner.classList.remove('hidden')
  }
  else{
    loadingSpinner.classList.add('hidden')
  }
}


// handle show all
const hendleShowAll = ()=>{
  hendleSearch(true)
}

loadPhone();
