function SearchBar() {
    return (
        <div class="search-bar">
            <form action="api.php" method="post" class="search-form">
            <div>
                <img src="" />
                <input type="text" name ="destination" placeholder="Where would you like to sail?" />
            </div>
            <img src="" />
            <div>
                <img src="" />
                <input type="date" name="" placeholder="When do you plan to travel?" />
            </div>
            <button type="submit" class="search-button">
                <img src="" />
            </button>
            </form>
        </div>
    )
}

export default SearchBar;