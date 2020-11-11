console.log('z-search-dropdown-loaded');

function showDropdownFor(element) {
  _elementReady(element).then((node) => {
    const searchBox = node.querySelector('[data-z-search]');
    const listOfItems = node.querySelectorAll(`[data-z-item]`);
    searchBox.addEventListener('keyup', ({ target: { value: searchTerm } }) => {
      const listItems = Array.from(listOfItems);
      listItems.forEach((listItem) => {
        const item = listItem.innerText.toLowerCase();
        if (item.includes(searchTerm.toLowerCase()) && searchTerm.length > 0) {
          listItem.classList.remove('hide');
        } else {
          listItem.classList.add('hide');
        }
      });
    });
  });
}

function _elementReady(selector) {
  return new Promise((resolve, reject) => {
    let element = document.querySelector(selector);
    if (element) {
      resolve(element);
    }

    new MutationObserver((mutationRecords, observer) => {
      Array.from(document.querySelectorAll(selector)).forEach((el) => {
        resolve(el);
        observer.disconnect();
      });
    }).observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  });
}
