

const apiURL = "http://127.0.0.1:3002"

export async function getCountries(countryCode) {

    const response = await fetch(
        apiURL + "/countries/" + countryCode
    );
    
    return response.json(); 

}

