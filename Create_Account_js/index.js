document.addEventListener('DOMContentLoaded', function() {
    fetch('https://randomuser.me/api/')
         .then(response => {
            return response.json();

         })
        .then(data => {
            const user = data.results[0];
            
            document.getElementById('fname').value = user.name.first;
            document.getElementById('lname').value=user.name.last;
            document.getElementById('email').value=user.email;
            document.getElementById('passwd').value=user.login.password;
            document.getElementById('cpasswd').value=user.login.password;
            document.getElementById('male').checked = true;
            // document.getElementById('hobbies1').checked = true;
            // document.getElementById('hobbies2').checked = true;
            document.getElementById('income').value = user.location.number;
            // document.getElementById('myfile').value = user.picture.large;
            document.getElementById('age').value = user.dob.age;  
        })
         .catch(error => {
            // Handle any errors that occurred during the fetch or data processing
            console.error('Error fetching data:', error);
          });
});

function getUserdata() {
    const selectedRadio = document.querySelector('input[name="gender"]:checked');
    const gender = selectedRadio ? selectedRadio.value : null;

    return {
        username: document.getElementById('fname').value,
        lname: document.getElementById('lname').value,
        email: document.getElementById('email').value,
        password: document.getElementById('passwd').value,
        gender: gender,
        income: document.getElementById('income').value,
        age: document.getElementById('age').value
    };
}
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('myForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        const data = getUserdata();
        fetch('https://reqres.in/api/users/2', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data) // Convert the data object to JSON string
        })
        .then(res => res.json())
        .then(console.log)
        .catch(error => console.error('Error:', error));
        
    });
});

