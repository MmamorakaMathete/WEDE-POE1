document.addEventListener("DOMContentLoaded", function () { 

  // Mobile navigation menu 

  const menuToggle = document.getElementById("menuToggle"); 

  const mainNav = document.getElementById("mainNav"); 

  if (menuToggle && mainNav) { 

    menuToggle.addEventListener(“click”, function () { 
      const isOpen = mainNav.classList.toggle(“open”); 
      menuToggle.setAttribute(“aria-expanded”, String(isOpen)); 
      menuToggle.setAttribute(“aria-label”, isOpen ? “Close navigation menu” : “Open navigation menu”); 

    }); 

  } 

 

  // FAQ accordion: open or close each answer 

  document.querySelectorAll(".accordion-trigger").forEach(function (button) { 

    Button.addEventListener("click", function () { 

      const panel = button.nextElementSibling; 

      const willOpen = button.getAttribute("aria-expanded") !== "true"; 

      button.setAttribute("aria-expanded", String(willOpen)); 

      panel.hidden = !willOpen; 

      const symbol = button.querySelector("span"); 

      if (symbol) symbol.textContent = willOpen ? "−" : "＋"; 

    }); 

  }); 

 


  const products = [ 

    { name: "Chocolate Cake", description: "Rich chocolate cake for birthdays and celebrations.", price: 250, emoji: "🎂", category: "cake" }, 
    { name: "Cupcakes", description: "Colourful cupcakes for sharing.", price: 120, emoji: "🧁", category: "cupcake" }, 
    { name: "Pastries", description: "Golden pastries for a tea or coffee break.", price: 80, emoji: "🥐", category: "pastry" }, 
    { name: "Cookies", description: "A sweet little treat for any day.", price: 60, emoji: "🍪", category: "cookie" }, 
    { name: "Doughnuts", description: "Soft doughnuts for a sweet snack.", price: 75, emoji: "🍩", category: "doughnut" }, 
    { name: "Café Coffee", description: "A warm drink to enjoy with a baked treat.", price: 35, emoji: "☕", category: "coffee" } 

  ]; 

  const productContainer = document.getElementById("dynamicProducts"); 
  const searchInput = document.getElementById("productSearch"); 
  const sortSelect = document.getElementById("sortProducts"); 
  const productCount = document.getElementById("productCount"); 

  function renderProducts() { 

    if (!productContainer) return; 
    const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : ""; 
    let filtered = products.filter(function (product) { 

      return (product.name + " "  + product.description + " "  + product.category).toLowerCase().includes(searchTerm); 
    }); 
    const sortValue = sortSelect ? sortSelect.value : "default"; 

    if (sortValue === "low") filtered.sort((a, b) => a.price - b.price); 
    if (sortValue === "high") filtered.sort((a, b) => b.price - a.price); 
    if (sortValue === "name") filtered.sort((a, b) => a.name.localeCompare(b.name)); 

 

    productContainer.replaceChildren(); 

    filtered.forEach(function (product) { 

      const article = document.createElement("article"); 
      article.className = "product-card"; 

      const art = document.createElement("div"); 

      art.className = "product-art"; 
      art.setAttribute("aria-hidden", "true"); 
      art.textContent = product.emoji; 

      const info = document.createElement("div"); 

      info.className = "product-info"; 

      const title = document.createElement("h2"); 

      title.textContent = product.name; 
      title.style.fontSize = "1.25rem"; 

      const description = document.createElement("p"); 

      description.textContent = product.description; 

      const price = document.createElement("p"); 

      price.className = "price"; 
      price.textContent = "From R" + product.price; 

      const link = document.createElement("a"); 

      link.className = "text-link"; 
      link.href = "enquiry.html"; 
      link.textContent = "Enquire about this product →"; 

      info.append(title, description, price, link); 

      article.append(art, info); 

      productContainer.append(article); 

    }); 

    if (productCount) { 

      productCount.textContent = filtered.length + (filtered.length === 1 ? " product found" : " products found"); 
    } 

    if (filtered.length === 0) { 

      const emptyMessage = document.createElement("p"); 
      emptyMessage.className = "small-note"; 
      emptyMessage.textContent = "No products match your search. Try another word."; 

      productContainer.append(emptyMessage); 

    } 

  } 

  if (productContainer) { 

    renderProducts(); 

    if (searchInput) searchInput.addEventListener("input", renderProducts); 
    if (sortSelect) sortSelect.addEventListener("change", renderProducts); 

  } 

 

  // Gallery lightbox: enlarge a selected gallery illustration 

  const lightbox = document.getElementById("lightbox"); 
  const lightboxContent = document.getElementById("lightboxContent"); 
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose"); 
  const galleryNames = { 
    Cake: ["🎂", "Chocolate cake"], cupcake: ["🧁", "Colourful cupcakes"], 
    Pastry: ["🥐", "Golden pastries"], cookie: ["🍪", "Fresh cookies"], 
    Coffee: ["☕", "Café favourites"], donut: ["🍩", "Sweet doughnuts"] 

  }; 

  function closeLightbox() { 
    if (lightbox) lightbox.hidden = true; 

  } 

  document.querySelectorAll("[data-lightbox]").forEach(function (tile) { 
    tile.addEventListener("click", function () { 

      const item = galleryNames[tile.dataset.lightbox]; 

      if (!item || !lightbox) return; 
      lightboxContent.textContent = item[0]; 
      lightboxCaption.textContent = item[1]; 
      lightbox.hidden = false; 

      if (lightboxClose) lightboxClose.focus(); 
    });
      }); 

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox); 
  if (lightbox) { 
    lightbox.addEventListener("click", function (event) { 

      if (event.target === lightbox) closeLightbox(); 

    }); 

  }

    document.addEventListener("keydown", function (event) { 
    if (event.key === "Escape") closeLightbox(); 

  }); 

 
  function showFieldError(input, message) { 
    input.setAttribute("aria-invalid", message ? "true" : "false"); 
    const error = document.getElementById(input.id + "Error"); 

    if (error) error.textContent = message; 

  } 

  function validPhone(value) { 
    return /^[0-9 +()-]{7,20}$/.test(value);
  }

   const contactForm = document.getElementById("contactForm"); 

  if (contactForm) { 
    contactForm.addEventListener("submit", function (event) { 

      event.preventDefault(); 

      const name = document.getElementById("contactName"); 
      const email = document.getElementById("contactEmail"); 
      const phone = document.getElementById("contactPhone"); 
      const type = document.getElementById("messageType"); 
      const message = document.getElementById("contactMessage"); 

      let valid = true; 

      [[name, name.value.trim().length >= 2, "Please enter your name (at least 2 characters)."], 
       [email, email.validity.valid && email.value.trim() !== "", "Please enter a valid email address.”], 

       [phone, phone.value.trim() === "" || validPhone(phone.value.trim()), "Please enter a valid phone number."], 
       [type, type.value !== "", "Please choose a message type."], 
       [message, message.value.trim().length >= 10, "Please enter at least 10 characters."]].forEach(function (check) { 

        showFieldError(check[0], check[1] ? "" : check[2]); 

        if (!check[1]) valid = false; 
      });
       
      const status = document.getElementById("contactStatus"); 
      if (!valid) {
         status.textContent = "Please correct the highlighted fields and submit again."; 
        const firstInvalid = contactForm.querySelector('[aria-invalid=”true”]'); 

        if (firstInvalid) firstInvalid.focus(); 
        return; 
      } 

      const recipient = "TshegofatsoMathete@gmail.com"; 
      const subject = encodeURIComponent("Website message: " + type.value); 
      const body = encodeURIComponent( 
        "Name: " + name.value.trim() + "\nEmail: " + email.value.trim() + 
        "\nPhone: " + (phone.value.trim() || "Not provided") + "\nMessage type: " + type.value + 

        "\n\nMessage:\n" + message.value.trim() 

      ); 

      status.textContent = "Your details passed validation. Your email application should open with the message prepared. Replace bakery@example.com with the correct email address before publishing."; 

      window.location.href = "mailto:"+ recipient + "?subject=" + subject + "&body=" + body; 
    }); 

  } 

    const enquiryForm = document.getElementById("enquiryForm"); 

  if (enquiryForm) { 

    enquiryForm.addEventListener("submit", function (event) { 

      event.preventDefault(); 
      const name = document.getElementById("enquiryName"); 
      const email = document.getElementById("enquiryEmail");
      const phone = document.getElementById("enquiryPhone"); 
      const product = document.getElementById("enquiryProduct"); 
      const date = document.getElementById("enquiryDate"); 
      const quantity = document.getElementById("enquiryQuantity"); 
      const budget = document.getElementById("enquiryBudget"); 
      const details = document.getElementById("enquiryDetails"); 

      let valid = true; 

      const checks = [ 

        [name, name.value.trim().length >= 2, "Please enter your name (at least 2 characters)."], 
        [email, email.validity.valid && email.value.trim() !== "", "Please enter a valid email address."], 
        [phone, validPhone(phone.value.trim()), "Please enter a valid phone number."], 
        [product, product.value !== "", "Please choose a product."], 
        [date, !date.value || date.value >= new Date().toISOString().slice(0, 10), "Please choose today or a future date."], 
        [quantity, quantity.value !== "" && Number(quantity.value) >= 1 && Number(quantity.value) <= 500, "Enter a quantity from 1 to 500."], 
        [budget, !budget.value || (Number(budget.value) >= 0 && Number(budget.value) <= 100000), "Enter a budget between R0 and R100,000."], 
        [details, details.value.trim().length >= 10, "Please enter at least 10 characters."] 

      ]; 

          checks.forEach(function (check) { 
        showFieldError(check[0], check[1] ? "" : check[2]); 

        if (!check[1]) valid = false; 

      }); 

      const status = document.getElementById("enquiryStatus");
        if (!valid) { 
        status.textContent = "Please correct the highlighted fields and submit again."; 

        const firstInvalid = enquiryForm.querySelector('[aria-invalid=”true”]'); 

        if (firstInvalid) firstInvalid.focus(); 
        return; 

      } 

      const budgetText = budget.value ? " Your estimated budget is R" + budget.value + "." : ""; 
      const dateText = date.value ? " Your preferred date is " + date.value + "." : ""; 

      status.textContent = "Thank you, " + name.value.trim() + ". Your enquiry about " + product.value + 
        " for a quantity/serving count of " + quantity.value + "has been checked." + dateText + 
        budgetText + " This is a demonstration response only; no order was sent and availability is not confirmed. The bakery would need to confirm the final price and availability."; 
      status.classList.add("success-message"); 

    }); 

  } 

}); 