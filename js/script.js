
let data = [];

function loadContent(period = "weekly") {
  data.forEach(activity => {
    const title = activity.title.toLowerCase().replace(" ", "-");
    const current = activity.timeframes[period].current;
    const previous = activity.timeframes[period].previous;
    const card = document.querySelector(`.${title}`);
    if (card) {
      card.querySelector(".current-hours").textContent = `${current}hrs`;
      card.querySelector(".previous-hours").textContent = 
        period === "daily"
          ? `Yesterday - ${previous}hrs`
          : period === "weekly"
          ? `Last Week - ${previous}hrs`
          : `Last Month - ${previous}hrs`;
    }
  });
}

function setActiveButton(period) {
  document.querySelectorAll(".period-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.period === period);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  fetch("./data.json")
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then(json => {
      data = json;
      loadContent("weekly");
    })
    .catch(error => {
      console.error('Error loading the data:', error);
    });

  document.querySelectorAll(".period-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const period = btn.dataset.period;
      setActiveButton(period);
      loadContent(period);
    });
  });
});