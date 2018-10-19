var getMonth = (m) => {
  switch (m) {
    case 1:
      return 'Janvier'
    case 2:
      return 'Février'
    case 3:
      return 'Mars'
    case 4:
      return 'Avril'
    case 5:
      return 'Mai'
    case 6:
      return 'Juin'
    case 7:
      return 'Juillet'
    case 8:
      return 'Aout'
    case 9:
      return 'Septembre'
    case 10:
      return 'Octobre'
    case 11:
      return 'Novembre'
    case 12:
      return 'Décembre'
  }
}

var Time = (d, m, y, h, min) => {
  const minutes = min > 9 ? min : '0' + min
  return d + ' ' + getMonth(m) + ' ' + y + ' - ' + h + ':' + minutes
}

export default Time
