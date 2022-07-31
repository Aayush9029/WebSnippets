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
    const keywordsArrayClean = keywordsArray.map((keyword) => {
        // remove blank keywords
        if (keyword.trim() === "") {
            return null;
        }
        return keyword.trim();
     }
    );  
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
    const snippetDiv = document.createElement("div");
    const snippetTitle = document.createElement("h4");
    
    snippetTitle.innerHTML = snippet.title;
    snippetDiv.className = "single__snippet";
    snippetDiv.addEventListener("click", copySnippet);
    snippetDiv.appendChild(snippetTitle);
    
    let snippetKeywordsDiv = keyWordsDiv(snippet);

    if (snippet.keywords.length > 0) {
        snippetDiv.appendChild(snippetKeywordsDiv);
    }

    snippetDiv.appendChild(actionContainer());   
    return snippetDiv;
}

const actionContainer = () => {
    const actionContainer = document.createElement("div");
    actionContainer.className = "snippet__action__container";

    const deleteButton = document.createElement("span");
    deleteButton.innerHTML = "Delete";
    deleteButton.className = "snippet__delete__button";
    deleteButton.addEventListener("click", deleteSnippet);
    
    actionContainer.appendChild(deleteButton);


    return actionContainer;
}

const keyWordsDiv = (snippet) => {
    const snippetKeywordsDiv = document.createElement("div");
    snippetKeywordsDiv.className = "snippet__keywords__container";
    for (let i = 0; i < snippet.keywords.length; i++) {
        const keyword = snippet.keywords[i];
        if (keyword) {
            const keywordDiv = document.createElement("div");
            keywordDiv.className = "snippet__keyword";
            keywordDiv.innerHTML = keyword;
            snippetKeywordsDiv.appendChild(keywordDiv);
        }
    }
    return snippetKeywordsDiv;
}

const copySnippet = (e) => {
    const snippet = e.target.parentElement;
    // only coppy the snippet if it has keywords
    if (snippet.children[1].children.length > 0) {
        const snippetText = snippet.children[0].innerHTML;
        const snippetKeywords = snippet.children[1].innerHTML;
        const snippetTextToCopy = snippetText + " " + snippetKeywords;
        copyToClipboard(snippetTextToCopy);
    }

    // copy the snippet text to the clipboard
    const copyToClipboard = (text) => {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
    }

    // display a message that the snippet was copied
    const message = document.createElement("div");
    message.className = "snippet__message";
    message.innerHTML = "Snippet copied to clipboard";
    snippet.appendChild(message);
    setTimeout(() => {
        snippet.removeChild(message);
    }
    , 2000);

    

}

const deleteSnippet = (e) => {
    const snippetDiv = e.target.parentElement.parentElement;
    const snippetIndex = snippets.findIndex(snippet => snippet.title === snippetDiv.children[0].innerHTML);
    snippets.splice(snippetIndex, 1);
    saveSnippets();
    displaySnippets();
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
