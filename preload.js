window.addEventListener('DOMContentLoaded', () => {
    console.log('----- DOMContentLoaded -----');
    if (!document.body.innerHTML) {
        location.reload();
    }
});