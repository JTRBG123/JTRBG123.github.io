const zipCodeInput = document.querySelector("#zipCodeInput");
const cityDisplay = document.querySelector("#cityDisplay");
const latitudeDisplay = document.querySelector("#latitudeDisplay");
const longitudeDisplay = document.querySelector("#longitudeDisplay");
const zipMessage = document.querySelector("#zipMessage");

const stateSelect = document.querySelector("#stateSelect");
const countySelect = document.querySelector("#countySelect");

const usernameInput = document.querySelector("#usernameInput");
const usernameMessage = document.querySelector("#usernameMessage");

const passwordInput = document.querySelector("#passwordInput");
const retypePasswordInput = document.querySelector("#retypePasswordInput");
const passwordSuggestion = document.querySelector("#passwordSuggestion");

const signupForm = document.querySelector("#signupForm");
const submitMessage = document.querySelector("#submitMessage");

let usernameCheckTimer = null;

function showMessage(element, text, type) {
    element.textContent = text;
    element.classList.remove("ok", "error", "neutral");
    element.classList.add(type);
}

function resetZipFields() {
    cityDisplay.textContent = "—";
    latitudeDisplay.textContent = "—";
    longitudeDisplay.textContent = "—";
}

async function loadStates() {
    try {
        const response = await fetch("https://csumb.space/api/allStatesAPI.php");
        if (!response.ok) {
            throw new Error("Could not load states.");
        }

        const states = await response.json();
        states.forEach((state) => {
            const option = document.createElement("option");
            option.value = state.usps;
            option.textContent = state.state;
            stateSelect.appendChild(option);
        });
    } catch (error) {
        showMessage(submitMessage, "Unable to load states from API.", "error");
    }
}

async function loadCounties(stateCode) {
    countySelect.innerHTML = '<option value="">Select a County</option>';

    if (!stateCode) {
        countySelect.disabled = true;
        return;
    }

    countySelect.disabled = false;
    try {
        const response = await fetch(`https://csumb.space/api/countyListAPI.php?state=${stateCode}`);
        if (!response.ok) {
            throw new Error("Could not load counties.");
        }

        const counties = await response.json();
        counties.forEach((countyObj) => {
            const option = document.createElement("option");
            option.value = countyObj.county;
            option.textContent = countyObj.county;
            countySelect.appendChild(option);
        });
    } catch (error) {
        countySelect.disabled = true;
        showMessage(submitMessage, "Unable to load counties for selected state.", "error");
    }
}

async function updateZipInfo() {
    const zip = zipCodeInput.value.trim();

    if (zip.length === 0) {
        resetZipFields();
        showMessage(zipMessage, "", "neutral");
        return;
    }

    if (!/^\d{5}$/.test(zip)) {
        resetZipFields();
        showMessage(zipMessage, "Enter a valid 5-digit zip code.", "error");
        return;
    }

    try {
        const response = await fetch(`https://csumb.space/api/cityInfoAPI.php?zip=${zip}`);
        if (!response.ok) {
            throw new Error("Error accessing city API");
        }

        const data = await response.json();

        if (!data || data === false || !data.city) {
            resetZipFields();
            showMessage(zipMessage, "Zip code not found", "error");
            return;
        }

        cityDisplay.textContent = data.city;
        latitudeDisplay.textContent = data.latitude ?? "—";
        longitudeDisplay.textContent = data.longitude ?? "—";
        showMessage(zipMessage, "Zip code found", "ok");
    } catch (error) {
        resetZipFields();
        showMessage(zipMessage, "Unable to look up zip code right now.", "error");
    }
}

async function checkUsernameAvailability() {
    const username = usernameInput.value.trim();

    if (username.length === 0) {
        showMessage(usernameMessage, "", "neutral");
        return;
    }

    if (username.length < 3) {
        showMessage(usernameMessage, "Username must have at least 3 characters.", "error");
        return;
    }

    try {
        const response = await fetch(`https://csumb.space/api/usernamesAPI.php?username=${encodeURIComponent(username)}`);
        if (!response.ok) {
            throw new Error("Error checking username availability");
        }

        const data = await response.json();
        if (data.available) {
            showMessage(usernameMessage, "Username is available", "ok");
        } else {
            showMessage(usernameMessage, "Username is not available", "error");
        }
    } catch (error) {
        showMessage(usernameMessage, "Unable to verify username right now.", "error");
    }
}

async function suggestPassword() {
    try {
        const response = await fetch("https://csumb.space/api/suggestedPassword.php?length=10");
        if (!response.ok) {
            throw new Error("Error fetching suggested password");
        }

        const data = await response.json();
        if (data.password) {
            showMessage(passwordSuggestion, `Suggested password: ${data.password}`, "neutral");
        }
    } catch (error) {
        showMessage(passwordSuggestion, "Unable to fetch suggested password right now.", "error");
    }
}

function validateForm() {
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    const retypePassword = retypePasswordInput.value;

    if (username.length < 3) {
        showMessage(submitMessage, "Username must be at least 3 characters.", "error");
        return false;
    }

    if (password.length < 6) {
        showMessage(submitMessage, "Password must be at least 6 characters.", "error");
        return false;
    }

    if (password !== retypePassword) {
        showMessage(submitMessage, "Passwords do not match.", "error");
        return false;
    }

    showMessage(submitMessage, "Form validated successfully!", "ok");
    return true;
}

function pageLoad() {
    loadStates();

    zipCodeInput.addEventListener("input", updateZipInfo);

    stateSelect.addEventListener("change", (event) => {
        loadCounties(event.target.value);
    });

    usernameInput.addEventListener("input", () => {
        clearTimeout(usernameCheckTimer);
        usernameCheckTimer = setTimeout(checkUsernameAvailability, 350);
    });

    passwordInput.addEventListener("focus", suggestPassword, { once: true });

    signupForm.addEventListener("submit", (event) => {
        event.preventDefault();
        validateForm();
    });
}

pageLoad();