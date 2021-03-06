
export function setBrillderTitle(brickTitle?: string) {
  let title = "Brillder";
  if (brickTitle) {
    title = brickTitle;
  }
  if (process.env.REACT_APP_BACKEND_HOST) {
    let isDev = process.env.REACT_APP_BACKEND_HOST.search('dev') >= 0;
    if (isDev) {
      title = "dev-" + title;
    }
  }
  document.title = title;
}