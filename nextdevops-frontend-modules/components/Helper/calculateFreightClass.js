const calculateFreightClass = (weight, length, height, width) => {
    const density = length * width * height;
    const calculatedVal = weight / density;
    let finalValue;
    if (calculatedVal >= 50) {
        finalValue = 50
    } else if (calculatedVal >= 35 && calculatedVal < 50) {
        finalValue = 55
    } else if (calculatedVal >= 30 && calculatedVal < 35) {
        finalValue = 60
    } else if (calculatedVal >= 22.5 && calculatedVal < 30) {
        finalValue = 65
    } else if (calculatedVal >= 15 && calculatedVal < 22.5) {
        finalValue = 70
    } else if (calculatedVal >= 13.5 && calculatedVal < 15) {
        finalValue = 77.5
    } else if (calculatedVal >= 12 && calculatedVal < 13.5) {
        finalValue = 85
    } else if (calculatedVal >= 10.5 && calculatedVal < 12) {
        finalValue = 92.5
    } else if (calculatedVal >= 9 && calculatedVal < 10.5) {
        finalValue = 100
    } else if (calculatedVal >= 8 && calculatedVal < 9) {
        finalValue = 110
    } else if (calculatedVal >= 7 && calculatedVal < 8) {
        finalValue = 125
    } else if (calculatedVal >= 6 && calculatedVal < 7) {
        finalValue = 150
    } else if (calculatedVal >= 5 && calculatedVal < 6) {
        finalValue = 175
    } else if (calculatedVal >= 4 && calculatedVal < 5) {
        finalValue = 200
    } else if (calculatedVal >= 3 && calculatedVal < 4) {
        finalValue = 250
    } else if (calculatedVal >= 2 && calculatedVal < 3) {
        finalValue = 300
    } else if (calculatedVal >= 1 && calculatedVal < 2) {
        finalValue = 400
    } else if (calculatedVal < 1) {
        finalValue = 500
    }
    return finalValue;
}

export default calculateFreightClass;
