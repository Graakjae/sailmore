
function NavigationsBar() {
    return (
        <div>
            <img 
                src="/sailmore_logo.png"
                alt="Site Logo" 
            />
            <nav>
                <ul>
                    <li><a href="trips/page.js">Trips</a></li>
                    <li><a href="travelers/page.js">Travelers</a></li>
                    <li><a href="login/page.js">Login</a></li>
                    <li><a href="signup/page.js">Signup</a></li>
                </ul>
            </nav>
        </div>
    );
}
export default NavigationsBar