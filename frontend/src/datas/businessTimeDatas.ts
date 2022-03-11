import { BusinessTime } from "types/datas/activeHash";

const valueTimeFirstDay = (time: string) => `2000-01-01T${time}:00.000Z`;
const valueTimeSecondDay = (time: string) => `2000-01-02T${time}:00.000Z`;

export const businessTimeDatas: BusinessTime[] = [
  { time: '--:--', value_time: ' ' },
  { time: '06:00', value_time: valueTimeFirstDay('06:00') }, { time: '07:00', value_time: valueTimeFirstDay('07:00') },
  { time: '08:00', value_time: valueTimeFirstDay('08:00') }, { time: '09:00', value_time: valueTimeFirstDay('09:00') },
  { time: '10:00', value_time: valueTimeFirstDay('10:00') }, { time: '10:30', value_time: valueTimeFirstDay('10:30')},
  { time: '11:00', value_time: valueTimeFirstDay('11:00') }, { time: '11:30', value_time: valueTimeFirstDay('11:30') },
  { time: '12:00', value_time: valueTimeFirstDay('12:00') }, { time: '12:30', value_time: valueTimeFirstDay('12:30') },
  { time: '13:00', value_time: valueTimeFirstDay('13:00') }, { time: '13:30', value_time: valueTimeFirstDay('13:30') },
  { time: '14:00', value_time: valueTimeFirstDay('14:00') }, { time: '14:30', value_time: valueTimeFirstDay('14:30') },
  { time: '15:00', value_time: valueTimeFirstDay('15:00') }, { time: '15:30', value_time: valueTimeFirstDay('15:30') },
  { time: '16:00', value_time: valueTimeFirstDay('16:00') }, { time: '16:30', value_time: valueTimeFirstDay('16:30') },
  { time: '17:00', value_time: valueTimeFirstDay('17:00') }, { time: '17:30', value_time: valueTimeFirstDay('17:30') },
  { time: '18:00', value_time: valueTimeFirstDay('18:00') }, { time: '18:30', value_time: valueTimeFirstDay('18:30') },
  { time: '19:00', value_time: valueTimeFirstDay('19:00') }, { time: '19:30', value_time: valueTimeFirstDay('19:30') },
  { time: '20:00', value_time: valueTimeFirstDay('20:00') }, { time: '20:30', value_time: valueTimeFirstDay('20:30') },
  { time: '21:00', value_time: valueTimeFirstDay('21:00') }, { time: '21:30', value_time: valueTimeFirstDay('21:30') },
  { time: '22:00', value_time: valueTimeFirstDay('22:00') }, { time: '22:30', value_time: valueTimeFirstDay('22:30') },
  { time: '23:00', value_time: valueTimeFirstDay('23:00') }, { time: '23:30', value_time: valueTimeFirstDay('23:30') },
  { time: '00:00', value_time: valueTimeSecondDay('00:00') }, { time: '00:30', value_time: valueTimeSecondDay('00:30') },
  { time: '01:00', value_time: valueTimeSecondDay('01:00') }, { time: '02:00', value_time: valueTimeSecondDay('02:00') },
  { time: '03:00', value_time: valueTimeSecondDay('03:00') }, { time: '04:00', value_time: valueTimeSecondDay('04:00') },
  { time: '05:00', value_time: valueTimeSecondDay('05:00') }
];