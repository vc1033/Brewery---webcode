// Function to create and append HTML elements
function createElement(tag, parent, text) {
    const element = document.createElement(tag);
    if (text) {
      element.textContent = text;
    }
    parent.appendChild(element);
    return element;
  }
  
  // Function to display breweries data
  function displayBreweries(breweries) {
    const breweriesTableBody = document.querySelector('#breweriesTable tbody');
    breweriesTableBody.innerHTML = '';
  
    breweries.forEach(brewery => {
      const row = createElement('tr', breweriesTableBody);
      createElement('td', row, brewery.name);
      createElement('td', row, brewery.brewery_type);
      createElement('td', row, `${brewery.street}, ${brewery.city}, ${brewery.state}`);
      createElement('td', row, brewery.website_url);
      createElement('td', row, brewery.phone);
    });
  }
  
  // Function to fetch breweries data
  async function fetchBreweries(searchText = '') {
    try {
      const response = await fetch(`https://api.openbrewerydb.org/breweries?by_name=${searchText}`);
      if (!response.ok) {
        throw new Error('Failed to fetch breweries');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  // Function to handle search input
  async function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchText = searchInput.value.trim();
    try {
      const breweries = await fetchBreweries(searchText);
      displayBreweries(breweries);
    } catch (error) {
      console.log(error)
    }
  }
  
  // Event listener for search input
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', handleSearch);
  