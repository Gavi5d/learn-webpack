const Button = {
    button: '<button id="myButton">press me</button>',
    attachEl: () => {
        var button = document.getElementById( "myButton" );
        button.addEventListener( "click", () => {
            console.log( "clicked" );
        } );
    }
};

export default Button;