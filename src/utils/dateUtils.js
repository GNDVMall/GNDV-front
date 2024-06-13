export function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}`;
  }

export function formatDateWithTime(dateString) {
    const date = new Date(dateString)
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);

    return `${year}/${month}/${day} ${hours}:${minutes}`;
}

export function formatTime(dateString) {
  const date = new Date(dateString)
  let hours = date.getHours();
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const ampm = hours >= 12 ? '오후' : '오전';

  hours = hours % 12;
  hours = hours ? hours : 12;

  return `${ampm} ${hours}:${minutes}`;
}


export const getDaysAgo = (date) => {
    const today = new Date();
    const inputDate = new Date(date);
    
    const differenceInTime = today.getTime() - inputDate.getTime();
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    
    return differenceInDays;
  };
