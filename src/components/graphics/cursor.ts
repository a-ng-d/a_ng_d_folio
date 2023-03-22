const cursor: HTMLElement = document.getElementById('cursor')!

export const SetCursor = () => {
  window.onmousemove = (e) => {
    e.preventDefault()
    cursor.style.left = e.clientX - cursor.clientWidth / 2 + 'px'
    cursor.style.top = e.clientY - cursor.clientHeight / 2 + 'px'
    if (
      (e.target as HTMLElement)!.closest('.button') != null ||
      (e.target as HTMLElement)!.closest('.rich-external-link') != null ||
      (e.target as HTMLElement)!.closest('.external-link') != null ||
      (e.target as HTMLElement)!.closest('.internal-link') != null ||
      (e.target as HTMLElement)!.closest('#logotype') != null ||
      (e.target as HTMLElement)!.closest('#cssda') != null ||
      (e.target as HTMLElement)!.closest('#awwwards') != null ||
      (e.target as HTMLElement)!.closest('.figure') != null ||
      (e.target as HTMLElement)!.closest('.card') != null
    )
      cursor.style.transform = 'scale(1.4)'
    else cursor.style.transform = 'scale(1)'
  }
  window.ontouchstart = (e) => {
    cursor.style.visibility = 'hidden'
  }
  window.onmousedown = () => (cursor.style.transform = 'scale(.8)')
  window.onmouseup = () => (cursor.style.transform = 'scale(1)')
  window.onmouseout = (e) => {
    if (e.clientX <= 0 || e.clientX >= window.innerWidth)
      cursor.style.transform = 'scale(0)'
    else if (e.clientY <= 0 || e.clientY >= window.innerHeight)
      cursor.style.transform = 'scale(0)'
    else cursor.style.transform = 'scale(1)'
  }
}

export default SetCursor
