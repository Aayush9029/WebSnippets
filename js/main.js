let snippets = [];

const saveSnippets = () => {
    localStorage.setItem('snippets', JSON.stringify(snippets));
}

const addNewSnippet = () => {
    const title = document.getElementById("add-snippet-text");
    const keywords = document.getElementById("add-snippet-keywords");
    // split the keywords into an array by comma
    const keywordsArray = keywords.value.trim().split(",");
    // remove whitespace from the keywords
    const keywordsArrayClean = keywordsArray.map(keyword => keyword.trim());
    // create a new snippet object

    const newSnippet = {
        title: title.value,
        keywords: keywordsArrayClean,
    };
    // add the new snippet to the array
    snippets.push(newSnippet);
    // save the new array to local storage
    saveSnippets();
    // clear the form
    title.value = "";
    keywords.value = "";
    // display the new snippet
    displaySnippets();
}

const displaySnippets = () => {
    const snippetsContainer = document.getElementById("snippets-container");
    snippetsContainer.innerHTML = "";
    snippets.forEach(snippet => {
        let singleSnippet = snippetRow(snippet);
        snippetsContainer.appendChild(singleSnippet);
    });
}



//  Helpers when craeting new snippets

const snippetRow = (snippet) => {
    // create a new div for each snippet
    const snippetDiv = document.createElement("div");
    // add the snippet title to the div
    const snippetTitle = document.createElement("h4");
    snippetTitle.innerHTML = snippet.title;
    snippetDiv.className = "single__snippet";

    snippetDiv.appendChild(deleteButton());
    snippetDiv.appendChild(snippetTitle);
    // add the snippet keywords to the div
    if (snippet.keywords.length > 0) {
        let snippetKeywordsDiv = keyWordsDiv(snippet);
        snippetDiv.appendChild(snippetKeywordsDiv);
    }
    // add the snippet div to the container
    return snippetDiv;
}

const deleteButton = () => {
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.className = "snippet__delete__button";
    // float the delete button to the right
    deleteButton.style.float = "right";
    // add the delete button to the snippet div
    return deleteButton;
}

const keyWordsDiv = (snippet) => {
    const snippetKeywordsDiv = document.createElement("div");
    snippetKeywordsDiv.className = "snippet__keywords__container";
    for (let i = 0; i < snippet.keywords.length; i++) {
        const keyword = document.createElement("span");
        keyword.innerHTML = snippet.keywords[i];
        keyword.className = "snippet__keyword";
        snippetKeywordsDiv.appendChild(keyword);
    }
    return snippetKeywordsDiv;
}


// onload
const loadSnippets = () => {
    const savedSnippets = localStorage.getItem('snippets');
    if (savedSnippets) {
        snippets = JSON.parse(savedSnippets);
    }
    displaySnippets();
}

document.addEventListener("DOMContentLoaded", loadSnippets);
