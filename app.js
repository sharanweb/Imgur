let arr = [];
let searchQuery = "nature";
let pageNumber = 1;
let flag = true;
let search = document.getElementById("search");
search.addEventListener("keypress", onChangeHandler);
let url = `https://api.pexels.com/v1/search?query=${searchQuery}&page=${pageNumber}`;

let navbar = document.getElementsByTagName("nav")[0];
window.addEventListener("resize", () => {
  console.log(1);
});
window.addEventListener("scroll", () => {
  const { scrollHeight, scrollTop, clientHeight } = document.documentElement;

  if (scrollTop > 300) {
    navbar.style.backgroundColor = "#171644";
  } else {
    navbar.style.backgroundColor = "transparent";
  }
  flag = true;

  if (scrollTop + clientHeight >= scrollHeight) {
    pageNumber++;
    getImages();
  }
});

const getImages = () => {
  return fetch(
    `https://api.pexels.com/v1/search?query=${searchQuery}&page=${pageNumber}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "563492ad6f917000010000015aed55cbc97846b98a69c6b83d02f33e",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => displayCard(data.photos, flag))
    .catch((error) => console.log("error", error));
};
let time;
function onChangeHandler(e) {
  flag = false;
  clearTimeout(time);
  time = setTimeout(() => {
    searchValue = e.target.value || "";
    searchQuery = searchValue || "nature";
    url = `https://api.pexels.com/v1/search?query=${searchQuery}&page=${pageNumber}`;
    getImages(url);
  }, 600);
}
getImages(url);

function displayCard(arr) {
  let display = document.getElementById("display");
  let html = ``;
  arr?.map((item) => {
    html += `
            <div class="card">
            <div>
                <img src=${item.src.medium} alt=${item.src.original}/>
            </div>
            <div>
                <p>${item.photographer}</p>
            </div>
            </div>
        `;
  });
  if (flag) {
    display.innerHTML += html;
  } else {
    display.innerHTML = html;
  }
}
