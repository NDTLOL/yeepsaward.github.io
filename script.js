document.getElementById('votingForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission

    const votes = {
        bestPicture: document.getElementById('bestPicture').value,
        bestActor: document.getElementById('bestActor').value,
        bestDirector: document.getElementById('bestDirector').value
    };

    // Send votes to Discord Webhook
    sendToDiscord(votes);
});

function sendToDiscord(votes) {
    const webhookUrl = 'https://discord.com/api/webhooks/1313318293150371952/cmtnnC52DGkqlNEAH5quAkKo2Lxg-QIHgf7xcsckhPF46RV0EQRvnqLzO-HezMNmIQe_'; // Replace with your webhook URL

    const data = {
        content: `New Oscar Votes:\n` +
            `**Best Picture**: ${votes.bestPicture}\n` +
            `**Best Actor**: ${votes.bestActor}\n` +
            `**Best Director**: ${votes.bestDirector}\n`,
        username: "Oscars Voting Bot",
        avatar_url: "https://example.com/your-avatar.png" // Optional: Add your own avatar URL
    };

    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            document.getElementById('successMessage').classList.remove('hidden');
            setTimeout(() => {
                document.getElementById('successMessage').classList.add('hidden');
            }, 5000);
            document.getElementById('votingForm').reset(); // Reset form after success
        } else {
            alert('Failed to send votes to Discord!');
        }
    })
    .catch(error => {
        alert('Error sending votes to Discord: ' + error);
    });
}
