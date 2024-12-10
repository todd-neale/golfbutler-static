document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.product-carousel');
  const cards = document.querySelectorAll('.card-trip');
  const selectorContainer = document.querySelector('.selector-container');
  let currentIndex = 0;

  const renderSelectors = () => {
    const cardWidth = cards[0].offsetWidth + 10; // Include gap/margin
    const visibleCards = Math.floor(carousel.offsetWidth / cardWidth) || 1; // At least 1 circle
    const totalCards = cards.length;
    const circlesCount = Math.ceil(totalCards / visibleCards);

    // Clear existing selectors
    selectorContainer.innerHTML = '';

    // Create new selectors
    for (let i = 0; i < circlesCount; i++) {
      const circle = document.createElement('i');
      circle.classList.add('fa-solid', 'carousel-selector', 'm-1');
      if (i === 0) {
        circle.classList.add('fa-circle-dot');
      } else {
        circle.classList.add('fa-circle');
      }
      circle.id = `carousel-selector-${i + 1}`;
      selectorContainer.appendChild(circle);
    }

    attachSelectorEvents();
  };

  const updateCarousel = (index) => {
    const selectors = document.querySelectorAll('.carousel-selector');

    selectors.forEach((selector, i) => {
      if (i === index) {
        selector.classList.add('fa-circle-dot');
        selector.classList.remove('fa-circle');
      } else {
        selector.classList.remove('fa-circle-dot');
        selector.classList.add('fa-circle');
      }
    });
  };

  const getCurrentIndex = () => {
    const cardWidth = cards[0].offsetWidth + 10;
    const visibleCards = Math.floor(carousel.offsetWidth / cardWidth) || 1;
    return Math.round(carousel.scrollLeft / (cardWidth * visibleCards));
  };

  const attachSelectorEvents = () => {
    const selectors = document.querySelectorAll('.carousel-selector');
    selectors.forEach((selector, index) => {
      selector.addEventListener('click', () => {
        currentIndex = index;
        const cardWidth = cards[0].offsetWidth + 10;
        const visibleCards = Math.floor(carousel.offsetWidth / cardWidth) || 1;
        carousel.scrollLeft = cardWidth * visibleCards * currentIndex;
        updateCarousel(currentIndex);
      });
    });
  };

  carousel.addEventListener('scroll', () => {
    const newIndex = getCurrentIndex();
    if (newIndex !== currentIndex) {
      currentIndex = newIndex;
      updateCarousel(currentIndex);
    }
  });

  // Re-render selectors on resize
  window.addEventListener('resize', () => {
    renderSelectors();
    updateCarousel(currentIndex); // Keep the state consistent
  });

  // Initial setup
  renderSelectors();
  updateCarousel(currentIndex);
});
