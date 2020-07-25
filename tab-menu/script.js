let selectedTabIndex = 0;

const tabItems = document.querySelectorAll('.tab-control');
const tabContentItems = document.querySelector('.tab-content').children;

for(const tab of tabItems){
    tab.addEventListener('click', (e) => {
        const newTabIndex = parseInt(e.currentTarget.dataset.position);

        if(newTabIndex !== selectedTabIndex){
            tabItems[selectedTabIndex].classList.remove('active');
            tabContentItems[selectedTabIndex].classList.remove('show');

            tabItems[newTabIndex].classList.add('active');
            tabContentItems[newTabIndex].classList.add('show');

            selectedTabIndex = newTabIndex;
        }
    });
}