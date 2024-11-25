// Fonction pour extraire le texte du site
function extraireTexte() {
    let texte = document.body.innerText; // Récupérer le texte de la page
    return texte;
}

// Envoyer le texte extrait au script de fond
chrome.runtime.sendMessage({ texte: extraireTexte() });
