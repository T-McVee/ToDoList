import { renderNavBar, renderWorkSpace, } from './render'

const pageLoad = ((lists) => {
  const pageContent = document.createElement('div');
  pageContent.appendChild(renderNavBar());
  pageContent.appendChild(renderWorkSpace(lists));

  return pageContent;
});

export { pageLoad };