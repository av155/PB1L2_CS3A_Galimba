// Stores the name of the current user
let currentUser = "";

// Ask the user for their name one time
function setUser() {
    const nameInput = document.getElementById("userName");
    const name = nameInput.value.trim();

    if (name === "") {
        alert("Please enter your name.");
        return;
    }

    currentUser = name;

    document.getElementById("displayName").textContent = currentUser;

    document.getElementById("userSection").classList.add("hidden");
    document.getElementById("postSection").classList.remove("hidden");
}

// Add a new post
function addPost() {
    const captionInput = document.getElementById("caption");
    const caption = captionInput.value.trim();

    if (caption === "") {
        alert("Please enter a caption.");
        return;
    }

    // Get the current date and time
    const date = new Date().toLocaleString();

    // Combine username, post, and date
    const postData = currentUser + caption + date;

    // Encrypt the combined information using AES
    const encryptedPost = CryptoJS.AES.encrypt(
        JSON.stringify(postData),
        "PostItKey"
    ).toString();

    // Create the post container
    const postDiv = document.createElement("div");
    postDiv.className = "post";

    // Create the ORIGINAL POST section
    const originalTitle = document.createElement("div");
    originalTitle.className = "post-title";
    originalTitle.textContent = "ORIGINAL POST";

    // Display the original caption
    const originalPost = document.createElement("div");
    originalPost.className = "original";
    originalPost.textContent = caption;

    // Create the ENCRYPTED section
    const encryptedTitle = document.createElement("div");
    encryptedTitle.className = "post-title";
    encryptedTitle.textContent = "ENCRYPTED";

    // Display the encrypted value
    const encryptedValue = document.createElement("div");
    encryptedValue.className = "encrypted";
    encryptedValue.textContent = encryptedPost;

    // Add everything to the post
    postDiv.appendChild(originalTitle);
    postDiv.appendChild(originalPost);
    postDiv.appendChild(encryptedTitle);
    postDiv.appendChild(encryptedValue);

    // Add the post to the thread
    document.getElementById("postThread").prepend(postDiv);

    // Clear the caption box
    captionInput.value = "";
}