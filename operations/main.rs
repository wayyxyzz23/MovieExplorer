use std::env;
use std::fmt;

fn main() {
    match get_api_key() {
        Ok(api_key) => {
            println!("Using API key: {}", api_key);
            match search_movie("Inception", &api_key) {
                Ok(movie) => println!("Found movie: {:?}", movie),
                Err(e) => eprintln!("Error searching for movie: {}", e),
            }
        }
        Err(e) => eprintln!("Error: {}", e),
    }
}

fn get_api_key() -> Result<String, MovieExplorerError> {
    env::var("API_KEY").map_err(|_| MovieExplorerError::ApiKeyNotSet)
}

fn search_movie(_title: &str, _api_key: &str) -> Result<String, MovieExplorerError> {
    Ok(String::from("Inception (2010) - Directed by Christopher Nolan"))
}

#[derive(Debug)]
enum MovieExplorerError {
    ApiKeyNotSet,
}

impl fmt::Display for MovieExplorerError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match *self {
            MovieExplorerError::ApiKeyNotSet => write!(f, "API key is not set."),
        }
    }
}

impl std::error::Error for MovieExplorerError {}