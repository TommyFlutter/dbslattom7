//const mockData = [
//    { id:1,
//        name: "Dan Abramov",
//        phoneNumber: 12567902854,
//        isFavorited: false },
//    { id: 2, name: "Kent C.Dodds", phoneNumber: 19084550823, isFavorited: true },
//    { id: 3, name: "Wahyu Galon", phoneNumber: 81369042000, isFavorited: false},
//];

let contactsData = [];
const STORAGE_KEY = "contact-app";

const contactStorage = {
    get() {
        return localStorage.getItem(STORAGE_KEY);
    },
    save(contacts) {
        localStorage.setItem (STORAGE_KEY, JSON.stringify(contacts));
    },
};


const RENDER_EVENT = "render-event";

document.addEventListener("DOMContentLoaded", () => {
    contactsData = contactStorage.get() ? JSON.parse(contactStorage.get()) : [
        { id:1,
            name: "Dan Abramov",
            phoneNumber: 12567902854,
            isFavorited: false },
    ];
    document.dispatchEvent(new Event(RENDER_EVENT));

});


const createContactitem = (contactData) => {
    const {id, name, phoneNumber, isFavorited} = contactData;
    
    const containerEl = document.createElement("li");
    containerEl.classList.add("contacts__item");

    const nameEl = document.createElement("h3");
    nameEl.classList.add("contacts__name");
    nameEl.textContent = name;

    const phoneNumberEl = document.createElement("div");
    phoneNumberEl.classList.add("contacts__phone");
    phoneNumberEl.textContent = phoneNumber;

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("contacts__delete");
    deleteButton.textContent = "Delete";

    const favoriteButton = document.createElement("button");
    favoriteButton.classList.add("contacts__toggle");
    favoriteButton.textContent = isFavorited ? "Unfavorite" : "favorite";
    
    favoriteButton.addEventListener("click", (e) =>{
        
// 1. cari index element di array
// 2. cari atau ambil kontact yang di modif
// 3. modifikasi datanya
// 4. re-render

const contactIdx= contactsData.findIndex((contact)=> contact.id === id);
contactsData[contactIdx].isFavorited = !isFavorited;
document.dispatchEvent(new Event(RENDER_EVENT));

contactStorage.save()

    })

    deleteButton.addEventListener("click", (e) =>{
        const contactIdx= contactsData.findIndex((contact)=> contact.id === id);
        contactsData.splice(contactIdx, 1);

        document.dispatchEvent(new Event(RENDER_EVENT));

    })

    containerEl.append(nameEl, phoneNumberEl, favoriteButton, deleteButton);

    return containerEl;
};

const formEl= document.querySelector(".form");
formEl.addEventListener("submit", (e) => {
    e.preventDefault();

const formData = new FormData(e.currentTarget);
const name = formData.get("name");
const phoneNumber = formData.get("phone");
const isFavorited = formData.get("favorite") === "on"

contactData.push({
    id:+ new Date(),
    name,
    phoneNumber,
    isFavorited});

document.dispatchEvent(new Event(RENDER_EVENT));
})


document.addEventListener(RENDER_EVENT, () => {
    const favoriteContactsEl = document.querySelector(".contacts__list--favorite");
    const defaultContactsEl = document.querySelector(".contacts__list--default");

    favoriteContactsEl.innerHTML = "";
    defaultContactsEl.innerHTML = "";

contacstData.forEach((contact) => {
if (contact.isFavorited) {
    favoriteContactsEl.appendChild(createContactitem(contact));
} else {
    defaultContactsEl.appendChild(createContactitem(contact));
}
});

});

