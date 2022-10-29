//  get data from DataBase
async function GetData_From_DataBase() {
  // GetData_From_DataBase
  let responsse = await fetch(
    "https://635da72307076ac24f40bbf6.mockapi.io/Cars"
  );
  let data = await responsse.json();
  let heading = document.getElementById("heading");
  heading.textContent = `(${data.length}) المنتجات`;
  // console.log(data);
  // Handel Data To Html and css
  let final = await data.map((ele) => {
    let container = document.getElementById("container");
    // create div to add Car Details
    let carDiv = document.createElement("div");
    carDiv.setAttribute("class", "carDiv");
    carDiv.setAttribute("id", ele.id);
    // create h2 to put car name on it
    let name = document.createElement("h2");
    name.setAttribute("class", "name");
    name.textContent = ele.name;
    // create h5 to put car price on it
    let price = document.createElement("h5");
    price.setAttribute("class", "price");
    price.textContent = `${ele.price} $`;
    // create p to put car description on it
    let description = document.createElement("p");
    name.setAttribute("class", "description");
    description.textContent = ele.description;
    // create image to put car img on it
    let image = document.createElement("img");
    image.setAttribute("class", "image");
    image.src = ele.img;
    image.alt = ele.name;
    // create button to Delete car
    let DeleteBtn = document.createElement("button");
    DeleteBtn.setAttribute("class", "buttonStyle");
    DeleteBtn.textContent = `Delete`;
    // Add All elemnet in CarDive in Html
    carDiv.appendChild(image);
    carDiv.appendChild(name);
    carDiv.appendChild(price);
    carDiv.appendChild(description);
    carDiv.appendChild(DeleteBtn);
    container.appendChild(carDiv);
    // Delete car from DataBase by Car Id
    DeleteBtn.addEventListener("click", async function () {
      const response = await fetch(
        `https://635da72307076ac24f40bbf6.mockapi.io/Cars/${ele.id}`,
        {
          method: "DELETE", // DELETE From DataBase
        }
      ).then(() => window.location.reload());
    });
  });
}

window.onload = GetData_From_DataBase();

//  Send Car Information (name , price , imageUrl , Description) to DataBase
async function sendData() {
  const name = await document.getElementById("name").value;
  const price = await document.getElementById("price").value;
  const description = await document.getElementById("description").value;
  const img = await document.getElementById("img").value;
  const data = await {
    name,
    description,
    price,
    img,
  };
  // send data to api
  const response = await fetch(
    "https://635da72307076ac24f40bbf6.mockapi.io/Cars",
    {
      method: "POST", // !Important  Add To DataBase
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      redentials: "same-origin",
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data), // (name , price , imageUrl , Description)
    }
  ).then(() => window.location.reload());
  return response.json();
}
