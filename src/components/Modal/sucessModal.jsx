import React from 'react'

function SucessAlert(){
    const modal = (text) => {
        this.refs.notificationAlert.notificationAlert({
          place: 'tc',
          message: (
            <div>
              <div>
                {text}
              </div>
            </div>
          ),
          type: 'success',
          icon: "tim-icons icon-check-2"
        });
      }   
    return (
        <>
        {modal(this.props.message)}
        </>
    )
}

export default SucessAlert;