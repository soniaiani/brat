'use strict';

// Înconjurăm tot codul într-un ascultător 'DOMContentLoaded' pentru a ne asigura
// că toate elementele HTML (audio, butonul) au fost încărcate înainte de a încerca să le accesăm.
document.addEventListener('DOMContentLoaded', function() {
    
    let intervalID = null;
    let isRunning = false;

    const audioElement = document.getElementById('theme-audio');
    const toggleBratButton = document.getElementById('brat-toggle-btn');

    // --- VERIFICARE CRITICĂ ---
    // Ne asigurăm că ambele elemente există înainte de a continua
    if (!audioElement || !toggleBratButton) {
        console.error("Eroare de configurare: Elementul 'theme-audio' sau 'brat-toggle-btn' lipsește din HTML.");
        // Oprim execuția pentru a preveni erorile de tip 'null'
        return; 
    }

    // Setăm volumul doar dacă elementul audio există
    audioElement.volume = 0.1;

    // Atașăm evenimentul doar dacă butonul există
    toggleBratButton.addEventListener('click', function() {
        if (!isRunning) {
            isRunning = true;
            this.textContent = 'BRAT'; // Sugestie: schimbă textul pentru a indica starea

            // Setarea și redarea audio
            audioElement.currentTime = 0;
            audioElement.play().catch(e => console.error("Redarea audio a eșuat:", e));

            // Pornirea schimbării de temă la interval
            intervalID = setInterval(() => {
                document.body.classList.toggle('dark-theme');
                document.body.classList.toggle('light-theme');
                // const className = document.body.className; // Această linie nu era folosită, am lăsat-o comentată
            }, 200);

        } else {
            isRunning = false;
            this.textContent = 'Brat'; // Revine la textul inițial

            // Oprirea și resetarea audio
            audioElement.pause();
            audioElement.currentTime = 0;
            
            // Oprirea intervalului de schimbare a temei
            clearInterval(intervalID);
            
            // Sugestie: Asigură-te că corpul revine la o temă implicită la oprire (ex: light-theme)
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
        }
    });
});
