const remove = document.querySelector('a.delete');

remove.addEventListener('click', (e) => {
    const endpoint = `/blogs/${remove.dataset.doc}`;

    fetch(endpoint,{
        method: 'DELETE'
    }).then((response)  =>{
        response.json()
    }).then((data) =>{
        console.log(data)
    }).catch((err) =>{
        console.log(err)
    });
});