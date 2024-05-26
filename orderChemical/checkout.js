document.addEventListener("DOMContentLoaded", function() {
  const steps = document.querySelectorAll(".progress-bar .step");
  const formSteps = document.querySelectorAll(".form-step");
  let currentStep = 0;

  const productData = {
    image: '../../images/chemicals.jpg',
    name: 'Chemical 1',
    seller: 'Seller Name',
    price: 50,
    quantity: 1,
    expectedDelivery: '3-5 business days'
  };

  function updateProductDetails() {
    document.getElementById('productImage').src = productData.image;
    document.getElementById('productName').textContent = productData.name;
    document.getElementById('productSeller').textContent = `Seller: ${productData.seller}`;
    document.getElementById('productPrice').textContent = `Price: $${productData.price}`;
    document.getElementById('expectedDelivery').textContent = `Expected Delivery: ${productData.expectedDelivery}`;
  }

  function updatePaymentDetails() {
    document.getElementById('productImagePayment').src = productData.image;
    document.getElementById('productNamePayment').textContent = productData.name;
    document.getElementById('sellerNamePayment').textContent = `Seller: ${productData.seller}`;
    document.getElementById('productPricePayment').textContent = `Price: $${productData.price}`;
    document.getElementById('productQuantityPayment').textContent = `Quantity: ${productData.quantity}`;
    document.getElementById('expectedDeliveryPayment').textContent = `Expected Delivery: ${productData.expectedDelivery}`;
  }

  function updateSteps() {
    steps.forEach((step, index) => {
      if (index <= currentStep) {
        step.classList.add("active");
      } else {
        step.classList.remove("active");
      }
    });
  }

  function showStep(index) {
    formSteps.forEach((formStep, i) => {
      formStep.classList.toggle("active", i === index);
    });
    updateSteps();
  }

  document.querySelectorAll(".next-btn").forEach(button => {
    button.addEventListener("click", () => {
      currentStep++;
      if (currentStep === 2) {
        updatePaymentDetails();
      }
      showStep(currentStep);
    });
  });

  document.querySelectorAll(".prev-btn").forEach(button => {
    button.addEventListener("click", () => {
      currentStep--;
      showStep(currentStep);
    });
  });

  document.getElementById("payOnDeliveryButton").addEventListener("click", function() {
    document.getElementById("checkoutForm").style.display = "none";
    document.getElementById("confirmation").style.display = "block";
    document.getElementById("paymentStatus").textContent = "Order placed successfully! You chose to pay on delivery.";
  });

  document.getElementById("payOnlineButton").addEventListener("click", async function() {
    // Call your server to create the Razorpay order
    const response = await fetch('/api/payment', {
      method: 'POST',
    });
    const data = await response.json();
    if (data.success) {
      const options = {
        key: 'your_razorpay_key', // Replace with your Razorpay key
        amount: productData.price * 100, // Amount in paisa (e.g., 5000 for ₹50)
        currency: 'INR',
        order_id: data.orderId,
        name: 'Chemical Trading',
        description: 'Payment for Chemicals',
        handler: function(response) {
          // Handle successful payment
          document.getElementById("checkoutForm").style.display = "none";
          document.getElementById("confirmation").style.display = "block";
          document.getElementById("paymentStatus").textContent = "Payment successful!";
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#007bff'
        }
      };
      const rzp = new Razorpay(options);
      rzp.open();
    } else {
      console.error('Payment failed:', data.error);
      document.getElementById("paymentStatus").textContent = "Payment failed. Please try again.";
    }
  });

  document.getElementById("quantity").addEventListener("change", function(event) {
    productData.quantity = event.target.value;
    updatePaymentDetails();
  });

  updateProductDetails();
  showStep(currentStep);
});
