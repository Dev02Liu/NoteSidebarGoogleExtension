// Function to save notes automatically when the textarea changes
function autoSaveNotes() {
    const notes = document.getElementById('noteArea').value;
    chrome.storage.local.set({'notes': notes}, function() {
        console.log('Notes are saved automatically');
    });
}

// Load notes when the document is ready
function loadNotes() {
    chrome.storage.local.get('notes', function(data) {
        document.getElementById('noteArea').value = data.notes || ''; // Load saved notes or initialize empty
    });
}

// Clear the notes
function clearNotes() {  
    document.getElementById('noteArea').value = '';
    chrome.storage.local.remove('notes', function () {  
        console.log('Notes have been cleared from storage')
    })
}

// Download the notes
function downloadNotes(notes) {
    const blob = new Blob([notes], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'notes.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Event listener for loading the notes when the DOM content is loaded
document.addEventListener('DOMContentLoaded', loadNotes);

// Event listener to auto-save the notes when text changes
document.getElementById('noteArea').addEventListener('input', autoSaveNotes);

// Event listener to clear the notes
document.getElementById('clearNotes').addEventListener('click',clearNotes);

// Event listener to download the notes
document.getElementById('downloadButton').addEventListener('click', function() {
    const notes = document.getElementById('noteArea').value;
    if (notes) {
        downloadNotes(notes);
    } else {
        alert('There is nothing to download!');
    }
});


