export function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}`;
  }

export const getDaysAgo = (date) => {
    const today = new Date();
    const inputDate = new Date(date);
    
    const differenceInTime = today.getTime() - inputDate.getTime();
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    
    return differenceInDays;
  };