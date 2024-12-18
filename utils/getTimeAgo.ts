const getTimeAgo = (date: Date): string => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
  
    switch (true) {
      case diffInSeconds < 60:
        return 'Just now';
      case diffInMinutes === 1:
        return '1 minute ago';
      case diffInMinutes < 60:
        return `${diffInMinutes} minutes ago`;
      case diffInHours === 1:
        return '1 hour ago';
      case diffInHours < 24:
        return `${diffInHours} hours ago`;
      case diffInDays === 1:
        return '1 day ago';
      default:
        return `${diffInDays} days ago`;
    }
};

export default getTimeAgo;