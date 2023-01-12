

export function timeDifference(clientTime: number, serverTime: number): string {
  //convert the epoch  to date
  let clientDate:any = new Date(clientTime * 1000);
  let serverDate:any = new Date(serverTime * 1000);

  const differenceInMiliseconds = clientDate - serverDate;

  const differenceInSeconds = Math.floor(differenceInMiliseconds / 1000);
  const differenceInMinutes = Math.floor(differenceInSeconds / 60);
  const differenceInHours = Math.floor(differenceInMinutes / 60);

  return `${differenceInHours}:${differenceInMinutes}:${differenceInSeconds}`;
}
