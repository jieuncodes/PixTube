import { format } from "timeago.js";

const AllCreatedAt = document.querySelectorAll(".date");

export const paintDates = () => {
  AllCreatedAt.forEach((date) => {
    if (!date) {
      date.innerHTML = "a few seconds ago";
    } else {
      const createdTimeAgo = format(date.innerHTML, "ko_KR");
      date.innerHTML = createdTimeAgo;
    }
  });
};

paintDates();
