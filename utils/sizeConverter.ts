function bytesToMB(bytes: number) {
    return (bytes / (1024 * 1024)).toFixed(2) + "MB"; // 2 decimal places
}


export default bytesToMB