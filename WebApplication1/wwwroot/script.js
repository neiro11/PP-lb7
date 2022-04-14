// Получение всех песен
async function GetCar() {
    // отправляет запрос и получаем ответ
    const response = await fetch("/api/cars", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    // если запрос прошел нормально

    if (response.ok === true) {
        // получаем данные
        const cars = await response.json();
        let rows = document.querySelector("tbody");
        cars.forEach(car => {
            // добавляем полученные элементы в таблицу
            rows.append(row(car));
        });
    }
}
// Получение одной песни
async function GetCarById(id) {
    const response = await fetch("/api/cars/" + id, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const car = await response.json();
        const form = document.forms["carForm"];
        form.elements["id"].value = car.id;
        form.elements["name"].value = car.name;
        form.elements["model"].value = car.model;
        form.elements["count"].value = car.count;
    }
}

async function CreateCar(carName, carModel, carCount) {
    const response = await fetch("api/cars", {
        method: "POST",
        headers: {
            "Accept": "application/json", "Content-Type":
                "application/json"
        },
        body: JSON.stringify({
            name: carName,
            model: carModel,
            count: carCount
        })
    });
    if (response.ok === true) {
        const car = await response.json();
        reset();
        document.querySelector("tbody").append(row(car));
    }
}

async function EditCar(carId, carName, carModel, carCount) {
    const response = await fetch("/api/cars/" + carId, {
        method: "PUT",
        headers: {
            "Accept": "application/json", "Content-Type":
                "application/json"
        },
        body: JSON.stringify({
            id: parseInt(carId, 10),
            name: carName,
            model: carModel,
            count: carCount
        })
    });
    if (response.ok === true) {
        const car = await response.json();
        reset();
        document.querySelector("tr[data-rowid='" + car.id + "']").replaceWith(row(car));
    }
}
// Удаление машинки
async function DeleteCar(id) {
    const response = await fetch("/api/cars/" + id, {
        method: "DELETE",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const car = await response.json();
        document.querySelector("tr[data-rowid='" + car.id + "']").remove();
    }
}
// сброс формы
function reset() {
    const form = document.forms["carForm"];
    form.elements["id"].value = 0;

}
// создание строки для таблицы
function row(car) {
    const tr = document.createElement("tr");
    tr.setAttribute("data-rowid", car.id);
    const idTd = document.createElement("td");
    idTd.append(car.id);
    tr.append(idTd);

    const nameTd = document.createElement("td");
    nameTd.append(car.name);
    tr.append(nameTd);

    const modelTd = document.createElement("td");
    modelTd.append(car.model);
    tr.append(modelTd);

    const countTd = document.createElement("td");
    countTd.append(car.count);
    tr.append(countTd);

    const linksTd = document.createElement("td");
    const editLink = document.createElement("a");
    editLink.setAttribute("data-id", car.id);
    editLink.setAttribute("style", "cursor:pointer;padding:px;");
    editLink.append("Изменить");
    editLink.addEventListener("click", e => {
        e.preventDefault();
        GetCarById(car.id);
    });
    linksTd.append(editLink);
    const removeLink = document.createElement("a");
    removeLink.setAttribute("data-id", car.id);
    removeLink.setAttribute("style", "cursor:pointer;padding:px;");
    removeLink.append("Удалить");
    removeLink.addEventListener("click", e => {
        e.preventDefault();
        DeleteCar(car.id);
    });
    linksTd.append(removeLink);
    tr.appendChild(linksTd);
    return tr;
}
function reset() {
    const form = document.forms["carForm"];
    form.elements["id"].value = 0;
}
function InitialFunction() {
    // сброс значений формы
    document.getElementById("reset").click(function (e) {
        e.preventDefault();
        alert('hi');
        reset();
    })
    // отправка формы
    document.forms["carForm"].addEventListener("submit", e => {
        e.preventDefault();
        const form = document.forms["carForm"];
        const id = form.elements["id"].value;
        const name = form.elements["name"].value;
        const model = form.elements["model"].value;
        const count = form.elements["count"].value;
        if (id == 0)
            CreateCar(name, model, count);
        else
            EditCar(id, name, model, count);
    });
    
    GetCar();
}