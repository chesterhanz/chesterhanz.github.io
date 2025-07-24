function updateClock(){

    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    const ampm = hours >= 12 ? 'PM': 'AM';

    hours = hours % 12 || 12;

    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');
    seconds = seconds.toString().padStart(2, '0');

    const timeString = `${hours}:${minutes}:${seconds} ${ampm}`;

    const clockElement = document.getElementById('clock');
    clockElement.textContent = timeString;

    clockElement.style.color = hours < 6 || hours >=18 ? '#6B5B95' : '#4ECDC4';
}

setInterval(updateClock, 1000);

updateClock();