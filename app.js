//Fetch the data

// Loop through the data, create a card for each data item, create update and delete button for each card 

///////////////////////////
// Get Html Elements
///////////////////////////

const mainDiv = document.querySelector(".container")

//New Contact Form & inputs
const createForm = document.querySelector('#newContact')
const createName = document.querySelector('input[name="name"]')
const createAge = document.querySelector('input[name="age"]')
const createStreet = document.querySelector('input[name="street"]')
const createPhone = document.querySelector('input[name="telephone"]')
const createEmail = document.querySelector('input[name="email"]')
const createButton = document.querySelector("button#createItem")

//Update Contact Form
const updateForm = document.getElementById('update-contact')
const updateName = document.querySelector('input[name="updatename"]')
const updateAge = document.querySelector('input[name="updateage"]')
const updateStreet = document.querySelector('input[name="updatestreet"')
const updatePhone = document.querySelector('input[name="updatephone"')
const updateEmail = document.querySelector('input[name="updateemail"')
const updateSubmitButton = document.querySelector("button#updateitem") 

const overlay = document.querySelector('.overlay');



fetch('contacts.json')
    .then(response => response.json())
    .then(contacts => {
        console.log(contacts)
       
        ///////////////////////////
        // CRUD Functions
        ///////////////////////////

        const renderContacts = () => {
            //empty current contents 
            mainDiv.innerHTML = ""

            //Loop through contacts and generate a card for each contact containing the values
            contacts.forEach((contact, index) => {
                const card = document.createElement('div')
                card.className = "card"
                card.id = "card" + index
                console.log(contact)

                const contactDetails = document.createElement('div')
                contactDetails.id = 'Contact' + index

                const buttonContainer = document.createElement('div')
                buttonContainer.className = 'card-buttons'
                
                //Generate Delete button
                const deleteButton = document.createElement('button')
                deleteButton.innerHTML = `Delete <span class="material-symbols-outlined">
                                          delete
                                          </span>`
                deleteButton.id = 'delete' + index
                
                //**When delete button is clicked, splice contact position index**//
                deleteButton.addEventListener("click", event => {
                    contacts.splice(index, 1)
                    renderContacts()
                })


                //Generate Update Button
                const updateButton = document.createElement(`button`);
                updateButton.id = 'update' + index;   
                updateButton.innerHTML = `Update <span class="material-symbols-outlined">update</span>`;

                //**When update button is clicked, show update details form, get the value of the form inputs, create custom attribute to use for passing data on the submit event**//
                updateButton.addEventListener('click', event => {
                    overlay.style.display = "block"
                    updateForm.style.cssText = `display: flex;`;
                    //Prefill existing details
                    updateName.value = contact.name
                    updateAge.value = contact.age
                    updateStreet.value = contact.street
                    updatePhone.value = contact.phone
                    updateEmail.value = contact.email

                    //Custom attribute
                    updateSubmitButton.setAttribute("data-contact-id", index)
                })

                buttonContainer.appendChild(deleteButton)
                buttonContainer.appendChild(updateButton)

                //Output the contact cards
                contactDetails.innerHTML = 
                    `
                        <h3> Name: ${contact.name}</h3>
                        <p> Age: ${contact.age}</p>
                        <p>Address: ${contact.street}</p>
                        <a href="tel:${contact.phone}" style="display: block">Tel: ${contact.phone}</a>
                        <a href="mailto:${contact.email}"> Email: ${contact.email}</a>
                    `
                card.appendChild(contactDetails)
                card.appendChild(buttonContainer)
                mainDiv.appendChild(card)

            })
        } //End renderContacts


        //Create contact
        const createData = () => {
            const name = createName.value
            const age = createAge.value
            const street = createStreet.value
            const email = createEmail.value
            const phone = createPhone.value

            const newContact = { name, age, street, email, phone }
            contacts.push(newContact)
            overlay.style.display = "none"
            createForm.style.display = "none";
            renderContacts()

        }

        //Update contact 
        const updateData = event => {
            const index = event.target.getAttribute("data-contact-id")
            console.log(index)
            const name = updateName.value
            const age = updateAge.value
            const street = updateStreet.value
            const email = updateEmail.value
            const phone = updatePhone.value

            contacts[index] = { name, age, street, phone, email }
            overlay.style.display = "none"
            updateForm.style.display = "none"
            renderContacts()
        }

        ///////////////////
        //Main render
        //////////////////

        renderContacts()

        ///////////////////
        // Event Listeners 
        ///////////////////
        createButton.addEventListener("click", createData) //trigger create data function whenever createButton is clicked
        updateSubmitButton.addEventListener("click", updateData) //trigger update data function when updateButton is clicked

        const addNew = document.getElementById('addNew')

        addNew.addEventListener("click", function () {
            overlay.style.display = "block"
            createForm.style.display = "block"
        })
    

        
    })

      

        