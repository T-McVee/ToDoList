import { renderNavBar, renderWorkSpace, } from './helpers'

const pageLoad = ((lists) => {
  const pageContent = document.createElement('div');
  pageContent.appendChild(renderNavBar());
  pageContent.appendChild(renderWorkSpace(lists));

  return pageContent;
});

export { pageLoad };