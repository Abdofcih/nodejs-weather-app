console.log('Client side javascript file is loaded!');
const form = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const degree = document.querySelector('#deg')


form.addEventListener('submit',(e)=>{
    e.preventDefault(); //to prevent refreshing page after submitting the form 
    val = search.value;
    
    messageOne.textContent = ''
    messageTwo.textContent = 'Loading...'
    messageThree.textContent = ''
    degree.textContent = ''

    if(!val)
    console.log("You must provide a location");
    else{
        fetch('/weather?address='+val).then(res => {
            res.json().then(data => {
                if(data.error)
                messageOne.textContent = data.error
                else{
                  messageOne.textContent = data.location
                  messageTwo.textContent = data.forecast.summary  
                  messageThree.textContent = data.forecast.temp
                  degree.textContent = 'O'
                }
            })
        })
    }
    
})


