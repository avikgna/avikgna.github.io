let adjustedCount = 0;

function adjustPart(id) {
    const part = document.getElementById(id);
    if (!part.classList.contains("adjusted")) {
        part.classList.add("adjusted");
        part.classList.remove("misaligned", "left", "right");
        adjustedCount++;

        checkAllAdjusted();
    }
}

function checkAllAdjusted() {
    if (adjustedCount === 4) {
        const message = document.getElementById("valentineMessage");
        message.classList.remove("hidden");
        message.classList.add("show");
        document.querySelector("h1").style.display = "none";
        document.getElementById("headImage").style.display = "none";
        document.querySelector(".spine").style.display = "none";
    }
}
