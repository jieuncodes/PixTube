import { format } from 'timeago.js';

const createdAt = document.querySelector(".date");

console.log(createdAt);
const updatedTimeago = format(createdAt, "ko_KR");
console.log('', updatedTimeago);
