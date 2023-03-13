const socket = io()

const $messageForm = document.querySelector("#message-form")
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')

socket.on('message',(message)=>{
    console.log(message);
})

document.querySelector("#message-form").addEventListener('submit',(e)=>{
    e.preventDefault()

    $messageFormButton.setAttribute('disabled','disabled')

    const message = e.target.elements.message.value

    socket.emit('sendMessage',message,(error)=>{
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()
        //enable



      if(error)
      {
          return console.log(error);
      }
      else
      {
        console.log('Message Delivered');
      }
    })
})

document.querySelector("#send-location").addEventListener('click',()=>{
    if(!navigator.geolocation)
    {
        return alert('Geolocation is not supported by Browser')
    }
    navigator.geolocation.getCurrentPosition((position)=>{
        // console.log(position);
        socket.emit('sendLocation',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        },()=>{
            console.log('Location shared');
        })
    })
    
})