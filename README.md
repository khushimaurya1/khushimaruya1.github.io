# Countdown Timer Web App

This project is a simple and interactive Countdown Timer web application built using HTML, CSS, and JavaScript. It allows users to set a target date and time, and then counts down to that moment, displaying the remaining days, hours, minutes, and seconds. When the countdown reaches zero, a notification sound is played and a message is displayed.

## Features

- **Set Target Date and Time:** Users can select any future date and time as the countdown target.
- **Live Countdown Display:** The timer updates every second, showing the remaining time in days, hours, minutes, and seconds.
- **Start, Stop, and Reset Controls:** Users can start, stop, or reset the countdown at any time using the provided buttons.
- **Animated Time Units:** Each time unit (days, hours, minutes, seconds) animates when it updates, providing a smooth visual experience.
- **Status Messages:** The app displays status messages for running, stopped, reset, and finished states.
- **Audio Notification:** When the countdown finishes, a beep sound is played using the Web Audio API (if supported by the browser).

## Files

- `index.html` — The main HTML file containing the structure of the web page.
- `style.css` — The CSS file for styling the countdown timer and its components.
- `new.js` — The JavaScript file containing the logic for the countdown timer, event handling, and audio notification.

## How to Use

1. **Open `index.html` in your web browser.**
2. **Set the target date and time** using the input fields provided.
3. **Click the "Start" button** to begin the countdown.
4. **Use the "Stop" button** to pause the countdown at any time.
5. **Click the "Reset" button** to reset the timer to the default (tomorrow's date and current time).
6. When the countdown reaches zero, a notification sound will play and a message will appear.

## Technical Details

- The timer uses JavaScript's `setInterval` to update the display every second.
- The Web Audio API is used to generate a simple beep sound when the countdown finishes.
- The app is fully client-side and does not require any backend or server.
- The code is organized in a `CountdownTimer` class for maintainability and clarity.

## Browser Compatibility

- The app works in all modern browsers that support ES6 JavaScript and the Web Audio API.
- If the browser does not support the Web Audio API, the app will gracefully skip the notification sound.

## Customization

- You can modify the styles in `style.css` to change the appearance of the timer.
- The JavaScript code in `new.js` can be extended to add more features, such as custom notification sounds or additional timer options.

## License

This project is open source and free to use for any purpose.
