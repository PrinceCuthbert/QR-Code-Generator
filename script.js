function generateQR() {
  let qrText = document.getElementById("qrText");
  let qrImage = document.getElementById("qrImage");
  let imgBox = document.getElementById("imgBox");
  let inputValue = qrText.value.trim();

  if (inputValue.length > 0) {
    let formattedValue = inputValue; // Default to input value

    // Detect Input Type
    if (/^(https?:\/\/|www\.)/.test(inputValue)) {
      // If it's a URL, ensure it opens correctly
      formattedValue = inputValue.startsWith("http")
        ? inputValue
        : "https://" + inputValue;
    } else if (/^\+?\d+$/.test(inputValue)) {
      // If it's a phone number (e.g., +250781578037)
      formattedValue = "tel:" + inputValue;
    } else if (/^\*[\d*]+#$/.test(inputValue)) {
      // If it's a USSD Code (e.g., *182*8*1*0790000000#)
      formattedValue = "tel:" + inputValue.replace(/#/g, "%23"); // Encode `#` for dialer
    } else {
      // If it's plain text, keep it unchanged
      formattedValue = inputValue;
    }

    let encodedValue = encodeURIComponent(formattedValue); // Proper encoding

    // Generate QR Code
    qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodedValue}`;
    imgBox.classList.remove("hidden");
    imgBox.classList.add("active");

    // Click QR Code to open links, dial numbers, or open USSD
    qrImage.onclick = function () {
      if (
        formattedValue.startsWith("tel:") ||
        formattedValue.startsWith("http")
      ) {
        window.location.href = formattedValue; // Opens numbers, USSD, or links
      }
    };
  } else {
    alert("Please enter text, a number, a valid URL, or a USSD code.");
  }
}

// Remove QR Code when input is cleared
document.getElementById("qrText").addEventListener("input", function () {
  let imgBox = document.getElementById("imgBox");
  let qrImage = document.getElementById("qrImage");

  if (this.value.trim().length === 0) {
    qrImage.src = "";
    imgBox.classList.add("hidden");
    imgBox.classList.remove("active");
  }
});
