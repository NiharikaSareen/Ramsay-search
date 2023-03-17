//load more consultant data function
export function loadMore() {
  const parentContainer = document.querySelector('.consultant');

  parentContainer.addEventListener('click', event => {
    const current = event.target;
    const isReadMoreBtn = current.className.includes('read-more-btn');
    if (!isReadMoreBtn) return;

    const currentText = event.target.parentNode.querySelector('.consultant__info--background');
    currentText.classList.toggle('read-more-text--show');
    current.textContent = current.textContent.includes('View More') ? "View Less" : "View More ";
  })
}