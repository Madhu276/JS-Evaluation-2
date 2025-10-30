const form = document.getElementById("checkout-form");
const discountInput = document.getElementById("discount-code");
const discountMessage = document.getElementById("discount-message");
const totalPriceEl = document.getElementById("total-price");
const formMessage = document.getElementById("form-message");

let totalPrice = 2000;
let discountApplied = false;

// Apply Discount
document.getElementById("apply-discount").addEventListener("click", () => {
  const code = discountInput.value.trim().toUpperCase();

  if (code === "SAVE10" && !discountApplied) {
    const discount = totalPrice * 0.1;
    totalPrice -= discount;
    totalPriceEl.textContent = totalPrice.toFixed(2);
    discountMessage.textContent = "✅ Discount applied successfully (10% off)";
    discountMessage.className = "valid";
    discountApplied = true;
    console.log("Discount applied. New total:", totalPrice);
  } else if (discountApplied) {
    discountMessage.textContent = "⚠️ Discount already applied!";
    discountMessage.className = "invalid";
  } else {
    discountMessage.textContent = "❌ Invalid discount code!";
    discountMessage.className = "invalid";
  }
});

// Validate Form
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const address = document.getElementById("address").value.trim();
  const cardNumber = document.getElementById("card-number").value.trim();
  const expiry = document.getElementById("expiry").value.trim();
  const cvv = document.getElementById("cvv").value.trim();

  // Check if fields are empty
  if (!name || !email || !address || !cardNumber || !expiry || !cvv) {
    formMessage.textContent = "❌ Please fill out all fields.";
    formMessage.className = "error";
    return;
  }

  // Validate email
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email.match(emailPattern)) {
    formMessage.textContent = "❌ Please enter a valid email address.";
    formMessage.className = "error";
    return;
  }

  // Validate card number
  if (!/^\d{16}$/.test(cardNumber)) {
    formMessage.textContent = "❌ Enter a valid 16-digit card number.";
    formMessage.className = "error";
    return;
  }

  // Validate expiry format
  if (!/^\d{2}\/\d{2}$/.test(expiry)) {
    formMessage.textContent = "❌ Enter expiry date in MM/YY format.";
    formMessage.className = "error";
    return;
  }

  // Validate CVV
  if (!/^\d{3}$/.test(cvv)) {
    formMessage.textContent = "❌ Enter a valid 3-digit CVV.";
    formMessage.className = "error";
    return;
  }

  // Success
  formMessage.textContent = `✅ Purchase Successful! Total Paid: ₹${totalPrice.toFixed(2)}`;
  formMessage.className = "success";
  console.log("Form submitted successfully.");
});
