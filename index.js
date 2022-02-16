const images = ['fox1', 'fox2', 'fox3', 'fox4'];
const imgElem = document.querySelector('img');

function randomValueFromArray(array) {
  const randomNo = Math.floor(Math.random() * array.length);
  return array[randomNo];
}

setInterval(() => {
  const randomChoice = randomValueFromArray(images);
  imgElem.src = `images/${randomChoice}.jpg`;
}, 2000);

// Registre el trabajador del servicio para controlar que el sitio funcione sin conexión

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/pwa-examples/a2hs/sw.js')
    .then(() => { console.log('Service Worker Registered'); });
}

// Código para manejar el aviso de instalación en el escritorio

let deferredPrompt;
const addBtn = document.querySelector('.add-button');
addBtn.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
  // Evite que Chrome 67 y versiones anteriores muestren automáticamente el mensaje
  e.preventDefault();
  // Guarde el evento para que pueda activarse más tarde.
  deferredPrompt = e;
  // Actualice la interfaz de usuario para notificar al usuario que puede agregar a la pantalla de inicio
  addBtn.style.display = 'block';

  addBtn.addEventListener('click', () => {
    // ocultar nuestra interfaz de usuario que muestra nuestro botón 
    addBtn.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Espere a que el usuario responda al mensaje
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
  });
});
