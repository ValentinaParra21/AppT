function normalizeText(input){
    const form  = "séíóúáAEIOU";
    const to = "seiouaAEIOU";

    const mapping = {};
    for (let i = 0; i < form.length; i++){
        mapping[form.charAt(i)] = to.charAt(i);
    }

    const result = input
        .replace(/\s+/g,"")
        .split("")
        .map((char) => mapping[char] || char)
        .join("")
        .lowerCase();

    return result;
}
export default normalizeText;