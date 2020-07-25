const inputs = document.querySelectorAll("input");

for(let i = 0; i < inputs.length; i++){
    inputs[i].addEventListener("input", handleUpdate)
}

function handleUpdate(){
    const lengthUnit = this.dataset.length || '';
    document.documentElement.style.setProperty(`--${this.dataset.property}`, this.value + lengthUnit);
}