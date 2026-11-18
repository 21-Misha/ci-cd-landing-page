const deployButton = document.getElementById("deployButton");
const statusText = document.getElementById("deployStatus");
const steps = document.querySelectorAll(".deploy-step");

const messages = [
    "Mengirim source code ke repository GitHub...",
    "Simulasi SSH Handshake & Sync...",
    "Simulasi Nginx Reload..."
];

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

deployButton.addEventListener("click", async function () {

    deployButton.disabled = true;
    deployButton.textContent = "Deployment Berjalan...";

    steps.forEach(step => {
        step.classList.remove("active", "done");
        step.querySelector(".step-status").textContent = "WAITING";
    });

    for (let i = 0; i < steps.length; i++) {

        steps[i].classList.add("active");
        steps[i].querySelector(".step-status").textContent = "RUNNING";

        statusText.textContent = messages[i];

        await wait(2000);

        steps[i].classList.remove("active");
        steps[i].classList.add("done");

        steps[i].querySelector(".step-status").textContent = "SUCCESS";
    }

    statusText.textContent =
        "Simulasi deployment selesai! Periksa GitHub Actions untuk status deployment sebenarnya.";

    deployButton.disabled = false;
    deployButton.textContent = "Jalankan Simulasi Lagi";

});