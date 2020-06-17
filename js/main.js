const navBar = document.getElementById('navBar');
let scrolled = false;

window.onscroll = function() {
    if(window.pageYOffset > 100) {
        navBar.classList.remove('top');
        if(!scrolled){
            navBar.style.transform = 'translateY(-70px)';
        }
        setTimeout(function(){
            navBar.style.transform = 'translateY(0)';
            scrolled = true;
        }, 200 );
    } 
    else {
        navBar.classList.add('top');
        scrolled = false;
    }
}

// Smooth Scrolling
// petru a functiona partea cu trimiterea submission trebuie sters .btn
// $('#navBar a, .btn').on('click', function(e){
$('#navBar a').on('click', function(e){
    if(this.hash !== '') {
        e.preventDefault();

        const hash = this.hash;

        $('html, body').animate(
                    {
                        scrollTop: $(hash).offset().top - 100,
                    }, 
                    800
                );
    }
});