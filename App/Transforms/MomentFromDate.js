import moment from 'moment';

export default (date: String, monthOffset: Number) => {
  var d = moment(date);
  return {
    prettyPrint: d.format('[Le] L [à] HH:mm'),
    day: d.date(),
    month: d.month() + monthOffset,
    year: d.year(),
    hour: d.hour(),
    minutes: d.minutes(),
    seconds: d.seconds()
  }
}
