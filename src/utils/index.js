setTimeout(() => {
  const el = document.querySelector('#xqtitle')
  if (el) {
    const h1 = document.createElement('h1')
    h1.style = `width: 510px;
    margin-top: 35px;
    margin-right: auto;
    margin-left: 38px;
    padding-right: 50px;
    padding-left: 50px;
    font-size: 18px;
    font-weight: normal;
    color: #000;
    letter-spacing: 1px;
    line-height: 38px;
    text-align: justify;
    text-justify: inter-ideograph;
    border-top-width: 1px;
    border-right-width: 1px;
    border-left-width: 1px;
    border-top-style: solid;
    border-right-style: solid;
    border-left-style: solid;
    border-top-color: #e6e6e6;
    border-right-color: #e6e6e6;
    border-left-color: #e6e6e6;
    padding-top: 30px;
    min-height: 40px;`
    h1.innerHTML = el.innerHTML
    el.parentElement.append(h1)
    el.parentNode.removeChild(el)
  }
}, 50)