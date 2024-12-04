document.addEventListener('DOMContentLoaded', () => {
    let selectedValue = null; // Store the selected value globally

    const searchContainer = document.querySelector("#search-bar");
    const textInput = document.querySelector('.text-input');
    const search = document.querySelector('.search-button');
    const clear = document.querySelector('.clear-button');
    const radioButtons = document.querySelectorAll('input[name="selection"]');

    // Function to handle the input value length and add a star
    const handleInputLength = () => {
        let userInput = textInput.value; // Get input value as a string
        let number = userInput.length; // Get the length of the input
        console.log(number); // Log the number
        return number; // Return the length of the input
    };

    // Make handleInputLength globally accessible
    window.handleInputLength = handleInputLength;

    // Update the selected value globally
    radioButtons.forEach(radio => {
        radio.addEventListener('change', () => {
            selectedValue = radio.value; // Update the global variable
            console.log(`Selected radio value: ${selectedValue}`);
        });
    });

    // Make the selected value globally accessible
    window.getSelectedValue = () => selectedValue;

    search.addEventListener('click', () => {
        handleInputLength(); 
        addStar(); 

        if (selectedValue) {
            console.log(`Selected radio value: ${selectedValue}`);
        } else {
            console.log('No radio button is selected');
        }

        textInput.value = ""; // Clear the input field
    });

    // Add keypress event listener to the input
    textInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') { // Check if the key pressed is "Enter"
            handleInputLength(); // Log the input length (optional)
            addStar(); 

            if (selectedValue) {
                console.log(`Selected radio value: ${selectedValue}`);
            } else {
                console.log('No radio button is selected');
            }
        }
    });

    clear.addEventListener('click', () => {
        stars = []; // Clear all stars from the array
        background(200); // Reset the canvas background
        console.log("Sketch reset");
    });

    // Append to DOM
    searchContainer.appendChild(textInput); // Append input to the page
});
