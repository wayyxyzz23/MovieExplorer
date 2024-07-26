use std::env;

fn main() {
    env::set_var("API_KEY", "your_api_key_here");

    let api_key = match env::var("API_KEY") {
        Ok(key) => key,
        Err(_) => {
            println!("API key is not set.");
            return;
        }
    };

    println!("Using API key: {}", api_key);

    let search_result = search_movie("Inception", &api_key);
    match search_result {
        Ok(movie) => println!("Found movie: {:?}", movie),
        Err(e) => println!("Error searching for movie: {}", e),
    }
}

fn search_movie(_title: &str, _api_key: &str) -> Result<String, &'static str> {
    Ok(String::from("Inception (2010) - Directed by Christopher Nolan"))
}