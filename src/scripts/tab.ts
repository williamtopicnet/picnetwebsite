const show = (elem: Element) => elem.removeAttribute("style");
const hide = (elem: Element) => elem.setAttribute("style", "display: none");

const initTab = (containerId: string) => {
  let activeIndex = "0";

  const children = document.querySelectorAll(`#${containerId} .tabs__item`);
  const buttons = document.querySelectorAll<HTMLButtonElement>(
    `#${containerId} .tabs__button`
  );

  const changeActiveState = (activeIndex: string) => {
    buttons.forEach((btn) => {
      if (btn.dataset.tabIndex !== activeIndex) {
        btn.classList.remove("active");
      } else {
        btn.classList.add("active");
      }
    });
  };

  const changeVisibleState = (activeIndex: string) => {
    children.forEach((child, index) => {
      index.toString() === activeIndex ? show(child) : hide(child);
    });
  };

  const onButtonClick = function (this: HTMLButtonElement) {
    this.classList.add("active");
    activeIndex = this.dataset.tabIndex ?? "0";

    changeActiveState(activeIndex);
    changeVisibleState(activeIndex);
  };

  buttons.forEach((button) => {
    button.addEventListener("click", onButtonClick);
  });

  changeVisibleState(activeIndex);
  changeActiveState(activeIndex);
};

export { initTab };
