document.addEventListener('DOMContentLoaded', () => {
  const playButton = document.getElementById('playButton');

  playButton.addEventListener('click', () => {
    playButton.disabled = true;

    const logoPlaceholder = document.getElementById('logo-placeholder');
    if (logoPlaceholder) {
      logoPlaceholder.style.display = 'none';
    }

    const juegoDiv = document.getElementById('juego');
    juegoDiv.style.display = 'block';

    import('../src/game.js')
      .then(() => {
        console.log('Juego iniciado');
      })
      .catch(err => {
        console.error('Error al cargar game.js:', err);
      });
  });
});
