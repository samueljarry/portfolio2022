export default function map(num, min1, max1, min2, max2, round = false)
{
    const num1 = (num - min1) / (max1 - min1)
    const num2 = (num1 * (max2 - min2)) + min2
   
    if (round) return Math.round(num2)
   
    return num2
}