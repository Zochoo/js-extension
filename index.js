let saveInputBtn = document.getElementById("input_btn");
let tabBtn = document.getElementById("tab_btn");
let deleteBtn = document.getElementById("delete_btn");
const inputEl = document.getElementById("input_el");
let myLeads = [];
let ulEl = document.getElementById("ulEl");


const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

deleteBtn.addEventListener("dblclick", () => {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
});

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}


saveInputBtn.addEventListener("click", () => {
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
});

tabBtn.addEventListener("click", () => {

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    });
});

function render(leads) {
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
        // listItems += "<li><a target='_blank' href='" + myLeads[i] + "'>" + myLeads[i] + "</a></li>";
        listItems += `
        <li>
            <a target='_blank' href='${leads[i]}'>${leads[i]}</a>
        </li>`;

    }
    ulEl.innerHTML = listItems;
}

