let selectedIndex = 0;

const desktopOptions = document.querySelectorAll('.option');
const mobileSelect = document.querySelector('#sort');

for(const option of desktopOptions){
    option.addEventListener('click', (e) => {
        const updatedIndex = parseInt(e.target.dataset.position);

        desktopOptions[selectedIndex].classList.remove('selected');
        desktopOptions[updatedIndex].classList.add('selected');

        selectedIndex = updatedIndex;
    })
}

mobileSelect.addEventListener('change', (e) => {
    selectedIndex = e.target.selectedIndex;
});

window.addEventListener('resize', (e) => {
    if(window.innerWidth <= 600){
        mobileSelect.selectedIndex = selectedIndex;
    }
    else{
        for(let i = 0; i < desktopOptions.length; i++){
            if(i === selectedIndex){
                desktopOptions[i].classList.add('selected');
            }
            else{
                desktopOptions[i].classList.remove('selected');
            }
        }
    }
});