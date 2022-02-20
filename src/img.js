import WebpackLogo from '@/assets/webpack-logo.png'

function img() {
  function component() {
    const element = document.createElement('div');
    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');
    // Add the image to our existing div.
    const myIcon = new Image();
    myIcon.src = WebpackLogo;
    element.appendChild(myIcon);
    return element;
  }
  let divimg = document.body.appendChild(component());
  return divimg
}

export default img;