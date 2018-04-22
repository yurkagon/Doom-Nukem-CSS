function getTransform(el) {
    const results = $(el).css('transform').match(/matrix(?:(3d)\(\d+(?:, \d+)*(?:, (\d+))(?:, (\d+))(?:, (\d+)), \d+\)|\(\d+(?:, \d+)*(?:, (\d+))(?:, (\d+))\))/)

    if(!results) return {x: 0, y: 0, z: 0};
    if(results[1] == '3d') {
        const arr = results.slice(2,5);
        const x = arr[0];
        const y = arr[1];
        const z = arr[2];
        return {x, y, z};
    }

    results.push(0);
    const arr = results.slice(5, 8);
    const x = arr[0];
    const y = arr[1];
    const z = arr[2];
    return {x, y, z};
}