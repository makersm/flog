const FontFaceObserver = require('fontfaceobserver')

const Fonts = () => {
  const link = document.createElement('link')
  link.href = 'https://fonts.googleapis.com/css?family=Kalam'
  link.rel = 'stylesheet'

  document.head.appendChild(link)

  const kalam = new FontFaceObserver('Kalam')

  kalam.load().then(() => {
    document.documentElement.classList.add('kalam')
  })
}

export default Fonts
