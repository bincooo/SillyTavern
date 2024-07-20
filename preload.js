window.addEventListener('DOMContentLoaded', () => {
    console.log('----- DOMContentLoaded -----');
    try {
        if (!localStorage.getItem('TavernAI_chat_display')) {
            location.reload();
        }
    } catch(err) {
        console.error(err);
        location.reload();
    }
});