async function pageLoad() {
    //any code that happens when the page loads goes here
}
pageLoad();
let zipCodeInput = document.querySelector("#zipCodeInput");
zipCodeInput.addEventListener("input", async function () {
    let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCodeInput.value}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error accessing API endpoint")
        }
        const data = await response.json();
        console.log(data);
        document.querySelector("#cityDisplay").textContent = data.city;
    } catch (err) {
        if (err instanceof TypeError) {
            alert("Error accessing API endpoint (network failure)");
        } else {
            alert(err.message);
        }
    } //catch
});