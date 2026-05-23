# Part 0 - Fundamentals of Web Apps

Exercises 0.4 - 0.6. Exercises 0.1 - 0.3 are reading only and not submitted.

## 0.4: New note diagram

Sequence of events when a user creates a new note on the traditional page
`https://studies.cs.helsinki.fi/exampleapp/notes`.

```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: User types a note and clicks Save

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note (body: note content + date)
    activate server
    server-->>browser: 302 redirect -> Location: /notes
    deactivate server

    Note right of browser: The 302 tells the browser to reload the notes page

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes (now including the new one)
```

## 0.5: Single page app diagram

Sequence of events when a user opens the single page app at
`https://studies.cs.helsinki.fi/exampleapp/spa`.

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
```

## 0.6: New note in Single page app diagram

Sequence of events when a user creates a new note in the single page app.
The page is already loaded (see 0.5) and never reloads, so this is a single POST.

```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: User types a note and clicks Save. JS calls e.preventDefault(), adds the note to the list, and re-renders it with the DOM (no reload)

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa (JSON body: content + date, Content-Type: application/json)
    activate server
    server-->>browser: 201 created
    deactivate server

    Note right of browser: No redirect, no reload, no further requests
```
