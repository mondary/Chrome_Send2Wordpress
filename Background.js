chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.texte) {
        let resume = genererResume(request.texte); // Fonction pour générer un résumé
        envoyerVersWordPress(resume);
    }
});

// Fonction pour générer un résumé (simple exemple)
function genererResume(texte) {
    return texte.split('.').slice(0, 3).join('.') + '.'; // Prendre les 3 premières phrases
}

// Fonction pour envoyer le résumé à WordPress
function envoyerVersWordPress(contenu) {
    const post_data = {
        title: "Résumé de la page",
        content: contenu,
        status: "draft"
    };

    fetch('https://mondary.design/wp-json/wp/v2/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa('PK_chrome2wordpress:HKGP eZwt fAm5 u7m1 qWpJ rzbk')
        },
        body: JSON.stringify(post_data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la création du post : ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Post créé :', data);
    })
    .catch(error => {
        console.error('Erreur :', error);
    });
}
