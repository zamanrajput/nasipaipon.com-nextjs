import bgImg1 from "../../assets/assets/bg/1.jpg";
import bgImg2 from "../../assets/assets/bg/2.jpg";
import bgImg3 from "../../assets/assets/bg/3.jpg";
import bgImg4 from "../../assets/assets/bg/4.jpg";
import bgImg5 from "../../assets/assets/bg/5.jpg";
import bgImg6 from "../../assets/assets/bg/6.jpg";
import bgImg7 from "../../assets/assets/bg/7.jpg";
import bgImg8 from "../../assets/assets/bg/8.jpg";
import bgImg9 from "../../assets/assets/bg/9.jpg";
import bgImg10 from "../../assets/assets/bg/10.jpg";
import bgImg11 from "../../assets/assets/bg/11.jpg";

var images = [bgImg1,
     bgImg2,
      bgImg3, bgImg4, bgImg5, bgImg6, bgImg7, bgImg8,bgImg9,bgImg10,bgImg11];

export function randomBgImage() {
  const randomIndex = Math.floor(Math.random() * images.length); // Generate a random index
  return images[randomIndex]; // Return the image at that index
}

//about us

//timings

//contact us
