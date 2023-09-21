document.addEventListener("DOMContentLoaded", function () {
    // Recupera i dati dei vinili dal localStorage o crea un array vuoto se non ci sono dati salvati
    let vinyls = JSON.parse(localStorage.getItem("vinyls")) || [];

    const vinylList = document.getElementById("vinyl-list");
    const addVinylButton = document.getElementById("add-vinyl-button");
    const vinylForm = document.getElementById("vinyl-form");
    const editFormContainer = document.getElementById("edit-form-container");
    const saveEditButton = document.getElementById("save-edit-button");

    // Funzione per aggiungere un nuovo vinile
    addVinylButton.addEventListener("click", function () {
        // Ottieni i dati dal modulo di aggiunta
        const artist = document.getElementById("artist").value;
        const title = document.getElementById("title").value;
        const year = document.getElementById("year").value;
        const condition = document.getElementById("condition").value;
        const image = document.getElementById("image").value;
        const codex = document.getElementById("codex").value;

        // Crea un nuovo vinile
        const newVinyl = {
            artist: artist,
            title: title,
            year: parseInt(year),
            condition: condition,
            image: image,
            codex: codex
        };

        // Aggiungi il nuovo vinile all'array
        vinyls.push(newVinyl);

        // Salva i vinili nel localStorage
        localStorage.setItem("vinyls", JSON.stringify(vinyls));

        // Aggiorna l'elenco dei vinili
        updateVinylList();
        
        // Resetta il modulo di aggiunta
        vinylForm.reset();
    });

    // Funzione per aggiornare l'elenco dei vinili
    function updateVinylList() {
        // Svuota l'elenco attuale dei vinili
        vinylList.innerHTML = "";

        // Popola l'elenco dei vinili con i dati salvati
        vinyls.forEach((vinyl, index) => {
            const vinylItem = document.createElement("div");
            vinylItem.classList.add("vinyl-item");

            // Altri dettagli del vinile
            vinylItem.innerHTML += `
                <h3>${vinyl.artist} - ${vinyl.title}</h3>
                <p>Anno di Uscita: ${vinyl.year}</p>
                <p>Condizione: ${vinyl.condition}</p>
                <p>Label: ${vinyl.codex}</p>
            `;

            // Crea un elemento <img> per l'immagine e imposta le dimensioni a 300x300px tramite CSS
            const image = document.createElement("img");
            image.src = vinyl.image;
            image.alt = "Copertina Vinile";
            image.style.width = "300px";
            image.style.height = "300px";

            // Aggiungi l'elemento <img> all'elemento "vinylItem"
            vinylItem.appendChild(image);

            // Aggiungi il pulsante "Modifica" con un gestore di eventi
            const editButton = document.createElement("button");
            editButton.textContent = "Modifica";
            editButton.addEventListener("click", function () {
                // Gestisci l'evento di modifica qui, ad esempio, aprendo il modulo di modifica
                openEditForm(index);
            });

            // Aggiungi il pulsante "Elimina" con un gestore di eventi
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Elimina";
            deleteButton.addEventListener("click", function () {
                // Gestisci l'evento di eliminazione qui
                deleteVinyl(index);
            });

            vinylItem.appendChild(editButton);
            vinylItem.appendChild(deleteButton);

            vinylList.appendChild(vinylItem);
        });
    }

    // Funzione per aprire il modulo di modifica
    function openEditForm(index) {
        // Recupera il vinile selezionato dall'array
        const selectedVinyl = vinyls[index];

        // Popola il modulo di modifica con i dati del vinile selezionato
        document.getElementById("edit-artist").value = selectedVinyl.artist;
        document.getElementById("edit-title").value = selectedVinyl.title;
        document.getElementById("edit-year").value = selectedVinyl.year;
        document.getElementById("edit-condition").value = selectedVinyl.condition;
        document.getElementById("edit-image").value = selectedVinyl.image;
        document.getElementById("edit-codex").value = selectedVinyl.codex;

        // Visualizza il modulo di modifica
        editFormContainer.style.display = "block";

        // Aggiungi un gestore di eventi per il pulsante "Salva Modifiche" nel modulo di modifica
        saveEditButton.addEventListener("click", function () {
            // Ottieni i dati dal modulo di modifica
            const editedArtist = document.getElementById("edit-artist").value;
            const editedTitle = document.getElementById("edit-title").value;
            const editedYear = document.getElementById("edit-year").value;
            const editedCondition = document.getElementById("edit-condition").value;
            const editedImage = document.getElementById("edit-image").value;
            const editedCodex = document.getElementById("edit-codex").value;

            // Modifica il vinile selezionato nell'array "vinyls"
            selectedVinyl.artist = editedArtist;
            selectedVinyl.title = editedTitle;
            selectedVinyl.year = parseInt(editedYear);
            selectedVinyl.condition = editedCondition;
            selectedVinyl.image = editedImage;
            selectedVinyl.codex = editedCodex;

            // Aggiorna l'elenco dei vinili
            updateVinylList();

            // Nascondi il modulo di modifica
            editFormContainer.style.display = "none";
        });
    }

    // Funzione per eliminare un vinile
    function deleteVinyl(index) {
        // Rimuovi il vinile dall'array "vinyls" utilizzando l'indice
        vinyls.splice(index, 1);

        // Salva l'array dei vinili aggiornato nel localStorage
        localStorage.setItem("vinyls", JSON.stringify(vinyls));

        // Aggiorna l'elenco dei vinili
        updateVinylList();
    }

    // Inizializza l'elenco dei vinili all'avvio
    updateVinylList();
});
