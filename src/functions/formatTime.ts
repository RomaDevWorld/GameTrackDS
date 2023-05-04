const formatTime = (ms: number): string => {
    const seconds = Math.floor(ms / 1000);
    
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    const formattedTime = `${days}:${hours}:${minutes}`;
    
    return formattedTime;
    
};

export default formatTime;