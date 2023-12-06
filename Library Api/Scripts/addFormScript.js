const responseContainer = document.getElementById('form-data');
responseContainer.addEventListener("submit",addData)
const dataForm = document.getElementById('data-form');

async function addData (event) {
    
    
    
    console.log("sonal")
    event.preventDefault();
    var inputData = {
        "name": document.getElementById('name').value,
        "RollNo": document.getElementById('RollNo').value,
        "Email": document.getElementById('Email').value,
        "DateOfBirth": document.getElementById('DateOfBirth').value,
        "Score": document.getElementById('Score').value
    }
    console.log("sonal" + inputData)
    const formData = new FormData();
    formData.append('data', inputData);

    try {
        const response = await fetch('/student', {
            method: 'POST',
            body: formData
        });

        const responseData = await response.json();
        responseContainer.innerHTML = JSON.stringify(responseData, null, 2);
    } catch (error) {
        console.error('POST request failed:', error);
    }
};