const list = document.querySelector(".contacts__list")
const update = document.querySelector(".contacts__update")
const findButton = document.querySelector(".contacts__send")
const findInput = document.querySelector(".contacts__id")
const deleteButton = document.querySelector(".contacts__del")
const status = document.querySelector(".contacts__status")

const contactsName = document.querySelector(".contacts__add-name")
const contactsTel = document.querySelector(".contacts__add-tel")
const contactsCountry = document.querySelector(".contacts__add-country")
const addButton = document.querySelector(".contacts__add-button")

const API_URL = "http://localhost:1487/contacts"

const renderContacts = (data) => {
    list.innerHTML = ""

    if (!data || data.length === 0) {
        list.innerHTML = "<li>Список порожній</li>"
        return
    }

    data.forEach((element) => {
        const li = document.createElement("li")
        li.innerHTML = `
            <h4 class="contacts__name">${element.name}</h4>
            <p class="contacts__id">ID: ${element.id}</p>
            <p class="contacts__tel">Телефон: ${element.tel}</p>
            <p class="contacts__country">Страна: ${element.country}</p>
        `
        list.appendChild(li)
    })
}

const setStatus = (message) => {
    status.textContent = message
}

const getContacts = () => {
    setStatus("Завантажую...")
    fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {
            renderContacts(data)
            setStatus(`Контактів: ${data.length}`)
        })
        .catch(() => {
            setStatus("Не вдалося завантажити")
        })
}

const addContacts = () => {
    const name = contactsName.value.trim()
    const tel = contactsTel.value.trim()
    const country = contactsCountry.value.trim()

    if (!name || !tel || !country) {
        setStatus("Заповніть усі поля")
        return
    }

    setStatus("Додаю...")

    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            tel,
            country
        })
    })
        .then((response) => response.json())
        .then(() => {
            contactsName.value = ""
            contactsTel.value = ""
            contactsCountry.value = ""
            getContacts()
            setStatus("Додано")
        })
        .catch(() => {
            setStatus("Не вдалося додати")
        })
}

const findContacts = () => {
    const id = findInput.value.trim()

    if (!id) {
        setStatus("Введіть id")
        return
    }

    setStatus("Шукаю...")

    fetch(`${API_URL}/${id}`)
        .then((response) => response.json())
        .then((data) => {
            list.innerHTML = ""
            const li = document.createElement("li")
            li.innerHTML = `
                <h4 class="contacts__name">${data.name}</h4>
                <p class="contacts__id">ID: ${data.id}</p>
                <p class="contacts__tel">Телефон: ${data.tel}</p>
                <p class="contacts__country">Страна: ${data.country}</p>
            `
            list.appendChild(li)
            setStatus("Знайдено")
        })
        .catch(() => {
            setStatus("Не знайдено")
        })
}

const deleteContacts = () => {
    const id = findInput.value.trim()

    if (!id) {
        setStatus("Введіть id для видалення")
        return
    }

    setStatus("Видаляю...")

    fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    })
        .then(() => {
            getContacts()
            setStatus("Видалено")
        })
        .catch(() => {
            setStatus("Не вдалося видалити")
        })
}

addButton.addEventListener("click", addContacts)
deleteButton.addEventListener("click", deleteContacts)
findButton.addEventListener("click", findContacts)
update.addEventListener("click", getContacts)

getContacts()