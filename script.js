const list = document.querySelector(".contacts__list")
const update = document.querySelector(".contacts__update")
const findbutton = document.querySelector(".contacts__send")
const findInput = document.querySelector(".contacts__id")
const deleteButton = document.querySelector(".contacts__del")

const contactsName = document.querySelector(".contacts__add-name")
const contactsTel = document.querySelector(".contacts__add-tel")
const contactsCountry = document.querySelector(".contacts__add-country")
const addButton = document.querySelector(".contacts__add-button")



const getContacts = () => {
    list.innerHTML = ""
    fetch("http://localhost:1487/contacts").then(responce => responce.json()).then(data => {
        data.forEach(element => {
            console.log(element)
            const li = document.createElement("li")
            li.innerHTML = `<h4 class="contacts__name">${element.name}</h4>
             <p class="contacts__id">${element.id}</p>
          <p class="contacts__tel">${element.tel}</p>
           <p class="contacts__country">${element.country}</p>`
           list.appendChild(li)
        });
    })
}


const addContacts = () => {
     list.innerHTML = ""
     
    fetch("http://localhost:1487/contacts", {
        method: "POST",
        body: {
            id: 1,
            name: contactsName,
            tel: contactsTel,
            country: contactsCountry
        }
    }).then(responce => responce.json()).then(data => {
       console.log(data)
    })
}


const findContacts = () => {
    list.innerHTML = ""
    const id = findInput.value
    console.log(id)
    fetch(`http://localhost:1487/contacts/${id}`).then(responce => responce.json()).then(data => {
         const li = document.createElement("li")
            li.innerHTML = `<h4 class="contacts__name">${data.name}</h4>
          <p class="contacts__tel">${data.tel}</p>
           <p class="contacts__country">${data.country}</p>`
           list.appendChild(li)
    
    })
}

const deleteContacts = () => {
    list.innerHTML = ""
    const id = findInput.value
    console.log(id)
    fetch(`http://localhost:1487/contacts/${id}`, {
        method: "DELETE"
    }).then(responce => responce.json()).then(data => {
        updateHandler()
    
    })
}

const addHandler = () => {
    addContacts()
}

addButton.addEventListener("click", () => {
    addHandler()
})

const deleteHandler = () => {
    deleteContacts()
}

deleteButton.addEventListener("click", () => {
    deleteHandler()
})

const findHandler = () => {
    findContacts()
}

findbutton.addEventListener("click", () => {
    findHandler()
})

const updateHandler = () => {
    getContacts()
}

update.addEventListener("click", () => {
    updateHandler()
})

console.log(list)