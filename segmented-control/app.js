new Vue({
    el: '#using-vue',
    data: {
       options: [
           {label: "Sort by price", value: 'price'},
           {label: "Sort by name", value: 'name'},
           {label: "Sort by relevance", value: 'relevance'}
       ],
       selectedOption: 'name'
    }
}); 