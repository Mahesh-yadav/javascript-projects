const secondHand = document.getElementsByClassName('hand-sec')[0];
const minuteHand = document.getElementsByClassName('hand-min')[0];
const hourHand = document.getElementsByClassName('hand-hour')[0];

function setDate(){
    let date = new Date();

    const seconds = date.getSeconds(); 
    const secondsDeg = (seconds * 6) + 90;
    secondHand.style.transform = `rotate(${secondsDeg}deg)`;

    const minutes = date.getMinutes();
    const minutesDeg = (minutes * 6) + (seconds / 60 * 6) + 90;
    minuteHand.style.transform = `rotate(${minutesDeg}deg)`;

    const hours = date.getHours();
    const hoursDeg = (hours * 30) + (minutes / 60 * 30) + 90;
    hourHand.style.transform = `rotate(${hoursDeg}deg)`;
}

setDate();

setInterval(setDate, 1000);