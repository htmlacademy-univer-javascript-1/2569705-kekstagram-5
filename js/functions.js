const isMeetingInWorkingDay = (dayStart, dayEnd, meetingStart, meetingDuration) => {
  const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const dayStartInMin = timeToMinutes(dayStart);
  const dayEndInMin = timeToMinutes(dayEnd);
  const meetingStartInMin = timeToMinutes(meetingStart);
  const endMeeting = meetingStartInMin + meetingDuration;

  return meetingStartInMin >= dayStartInMin && endMeeting <= dayEndInMin;
};

isMeetingInWorkingDay('08:00', '17:30', '14:00', 90);
isMeetingInWorkingDay('8:0', '10:0', '8:0', 120);
isMeetingInWorkingDay('08:00', '14:30', '14:00', 90);
isMeetingInWorkingDay('14:00', '17:30', '08:0', 90);
isMeetingInWorkingDay('8:00', '17:30', '08:00', 900);
