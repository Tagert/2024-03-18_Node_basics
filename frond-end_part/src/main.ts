const addButton = document.getElementById("submit-btn") as HTMLButtonElement;
const checkButton = document.getElementById("check-btn") as HTMLButtonElement;

type recommendationType = {
  title: string;
  rating: number;
  description: string;
  moreInfo: string;
};

class Recommendation implements recommendationType {
  title: string;
  rating: number;
  description: string;
  moreInfo: string;

  constructor({ title, rating, description, moreInfo }: recommendationType) {
    this.title = title;
    this.rating = rating;
    this.description = description;
    this.moreInfo = moreInfo;
  }
}

const postRecommendation = async (data: recommendationType) => {
  try {
    const response = await fetch("http://localhost:3000/addMovie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const recommendation = await response.json();

    console.log("Success:", recommendation);
  } catch (error) {
    console.error("Error:", error);
  }
};

const fetchRecommendations = async () => {
  try {
    const response = await fetch("http://localhost:3000/getAllMovies");
    const recommendations = await response.json();

    console.log("Success:", recommendations);
  } catch (error) {
    console.error("Error:", error);
  }
};

const addRecommendation = () => {
  const title = document.getElementById("rec-title") as HTMLInputElement;
  const rating = document.getElementById("rec-rating") as HTMLInputElement;
  const description = document.getElementById(
    "rec-description",
  ) as HTMLInputElement;
  const moreInfo = document.getElementById("rec-more-info") as HTMLInputElement;

  const movieNo1 = new Recommendation({
    title: title.value,
    rating: +rating.value,
    description: description.value,
    moreInfo: moreInfo.value,
  });

  return movieNo1;
};

addButton.addEventListener("click", () => {
  const addFunc = addRecommendation();

  postRecommendation(addFunc);
});

checkButton.addEventListener("click", fetchRecommendations);
