document.addEventListener("DOMContentLoaded", function () {
  // Get the product ID from the URL query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("productId");

  // Assuming you have a function to fetch product details by ID
  fetchProductDetails(productId)
    .then((product) => {
      // Update the product details in the DOM
      document.getElementById("productImage").src = product.image;
      document.getElementById("productName").innerText = product.name;
      document.getElementById(
        "productPrice"
      ).innerText = `Price: $${product.price}`;
      document.getElementById(
        "productDescription"
      ).innerText = `Description: ${product.description}`;
    })
    .catch((error) => {
      console.error("Error fetching product details:", error);
    });

  // Add event listener to the "Order Now" button
  document
    .getElementById("orderNowButton")
    .addEventListener("click", function () {
      const quantity = document.getElementById("quantity").value;
      // You can perform additional logic here, such as validating the quantity

      // Redirect to the checkout page or initiate the checkout process
      window.location.href = "/orderChemical/checkout.html";
    });
});

// Function to fetch product details by ID
function fetchProductDetails(productId) {
  // Assuming you have an API endpoint to fetch product details
  return fetch(`/api/products/${productId}`).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
}
// Make sure you have a server-side endpoint (/api/products/:productId) that accepts a product ID and returns the details of the corresponding product.

document.addEventListener("DOMContentLoaded", function () {
  const products = [
    {
      img_src:
        "https://5.imimg.com/data5/SELLER/Default/2023/4/298479038/FH/GH/KJ/122353901/green-guard.jpg",
      name: "GreenGuard Insecticide",
      description:
        "Effective against a wide range of insects, ensuring healthy crops.",
      rate: "$25 per liter",
    },
    {
      img_src:
        "https://m.media-amazon.com/images/I/51uQcrHVmwL._AC_UF1000,1000_QL80_.jpg",
      name: "CropBoost Fertilizer",
      description:
        "High-nutrient formula for improved crop yield and soil health.",
      rate: "$30 per 20 kg bag",
    },
    {
      img_src:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFtZyGu-OG1iUSU9mZqoUUknu72M5NowZq5cCFnTE-fg&s",
      name: "WeedOut Herbicide",
      description:
        "Targets broadleaf and grassy weeds, promoting clean fields.",
      rate: "$18 per liter",
    },
    {
      img_src:
        "https://5.imimg.com/data5/SELLER/Default/2023/7/322327869/VR/CP/CG/84332089/fungiguard-azoxystrobin-tebuconazole.jpg",
      name: "FungiGuard Fungicide",
      description:
        "Protects crops from fungal diseases with long-lasting action.",
      rate: "$22 per liter",
    },
    {
      img_src:
        "https://growhoss.com/cdn/shop/products/Pest-Control-Bug-Buster-O_1200x1200.jpg?v=1691785512",
      name: "BugBuster Insecticide",
      description: "Quick-acting formula to eliminate common crop pests.",
      rate: "$20 per liter",
    },
    {
      img_src:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi-CmE_sQv9PeHFYoMig_wO4sgJXAnrWcKQJR6JVDCSg&s",
      name: "NutriMax Fertilizer",
      description: "Balanced nutrients for optimal growth and productivity.",
      rate: "$28 per 25 kg bag",
    },
    {
      img_src:
        "https://www.deskera.com/blog/content/images/2023/03/Fipronil.png",
      name: "PestPatrol Insecticide",
      description: "Comprehensive pest control for both pre- and post-harvest.",
      rate: "$21 per liter",
    },
    {
      img_src:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhBSOzdFg6j6K4bisAwxGHwYgL92hBGCF4tXcSAkSkaw&s",
      name: "ClearField Herbicide",
      description: "Effective weed control without harming crops.",
      rate: "$19 per liter",
    },
    {
      img_src:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJCl5WEGPu2Bn7tUbl-0g_yBTCJaWO0lfy7EAaZwvuWw&s",
      name: "SporeShield Fungicide",
      description: "Advanced protection against a variety of fungal pathogens.",
      rate: "$24 per liter",
    },

    {
      img_src:
        "https://image.made-in-china.com/2f0j00rZlitMyCAUzA/Pest-Control-Insecticide-Triazophos-95-Tc-20-Ec-40-Ec.webp",
      name: "PestPatrol Insecticide",
      description: "Comprehensive pest control for both pre- and post-harvest.",
      rate: "$21 per liter",
    },
    {
      img_src:
        "https://m.media-amazon.com/images/I/71CeMPkI3ML._AC_UF1000,1000_QL80_.jpg",
      name: "GrowthBoost Fertilizer",
      description: "Enhances root development and overall plant health.",
      rate: "$32 per 20 kg bag",
    },
    {
      img_src:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi-CmE_sQv9PeHFYoMig_wO4sgJXAnrWcKQJR6JVDCSg&s",
      name: "NutriMax Fertilizer",
      description: "Balanced nutrients for optimal growth and productivity.",
      rate: "$28 per 25 kg bag",
    },
    {
      img_src: "https://cdn.moglix.com/p/qs9wPSlm30HuU-medium.jpg",
      name: "WeedAway Herbicide",
      description: "Selective herbicide that targets stubborn weeds.",
      rate: "$17 per liter",
    },
    {
      img_src:
        "https://4.imimg.com/data4/PF/IV/GLADMIN-13119076/00-250x250.jpg",
      name: "CropSafe Fungicide",
      description: "Prevents and cures a broad spectrum of fungal diseases.",
      rate: "$23 per liter",
    },
    {
      img_src:
        "https://m.media-amazon.com/images/I/71m4sI-coRL._AC_UF1000,1000_QL80_.jpg",
      name: "BugBlitz Insecticide",
      description:
        "Dual-action formula for immediate and residual pest control.",
      rate: "$26 per liter",
    },
    {
      img_src:
        "https://topgro.in/wp-content/uploads/2023/09/Yield-MAx-SOP_-430x430.png",
      name: "YieldMax Fertilizer",
      description:
        "Promotes higher yields with essential macro and micronutrients.",
      rate: "$29 per 25 kg bag",
    },
    {
      img_src:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHA4oJW1eVMWDbXd8AmjXYBjzanhgFVDK4dkbnVNSp8tRW0WgT2IWXtq1hVW_5s7sGqmY&usqp=CAU",
      name: "TotalControl Herbicide",
      description: "Provides total weed control for various crop types.",
      rate: "$20 per liter",
    },
    {
      img_src:
        "https://m.media-amazon.com/images/I/51uQcrHVmwL._AC_UF1000,1000_QL80_.jpg",
      name: "CropBoost Fertilizer",
      description:
        "High-nutrient formula for improved crop yield and soil health.",
      rate: "$30 per 20 kg bag",
    },
  ];

  const productsSection = document.getElementById("products-section");

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    const img = document.createElement("img");
    img.src = product.img_src;
    img.alt = product.name;

    const name = document.createElement("h2");
    name.textContent = product.name;

    const description = document.createElement("p");
    description.textContent = product.description;

    const rate = document.createElement("p");
    rate.classList.add("rate");
    rate.textContent = product.rate;
    const anchor = document.createElement("a");
    anchor.href = "/orderChemical/checkout.html";
    anchor.textContent = "click here";

    productDiv.appendChild(img);
    productDiv.appendChild(name);
    productDiv.appendChild(description);
    productDiv.appendChild(rate);
    productDiv.appendChild(anchor);


    productsSection.appendChild(productDiv);
  });
});
