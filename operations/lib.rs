// Import necessary crates
use std::collections::HashMap;
use std::env;
use std::ffi::{CStr, CString};
use std::os::raw::c_char;
use std::sync::Mutex;
use lazy_static::lazy_static; // Add this line to include the lazy_static crate

// Define a struct to hold your cache (HashMap in this case)
struct Cache {
    movie_recommendations: HashMap<i32, String>,
}

impl Cache {
    // Initialize a new Cache
    fn new() -> Cache {
        Cache {
            movie_recommendations: HashMap::new(),
        }
    }
}

// Use lazy_static to safely use global mutable state
lazy_static! {
    static ref CACHE: Mutex<Cache> = Mutex::new(Cache::new());
}

#[no_mangle]
pub extern "C" fn recommend_movies(user_id: i32) -> *mut c_char {
    println!("Getting movie recommendations for user {}", user_id);

    // Attempt to fetch from cache first
    {
        let cache_lock = CACHE.lock().unwrap();

        if let Some(recommendations) = cache_lock.movie_recommendations.get(&user_id) {
            return convert_to_c_string(recommendations.clone());
        }
    } // Release lock here

    // Generate recommendations if not in cache
    let recommendations = generate_recommendations(user_id);
    
    // Store in cache
    {
        let mut cache_lock = CACHE.lock().unwrap();
        cache_lock.movie_recommendations.insert(user_id, recommendations.clone());
    }

    convert_to_c_string(recommendations)
}

#[no_mangle]
pub extern "C" fn process_movie_data() {
    println!("Processing movie data with Rust's power...");
    // Here, potential functionality to update the cache or preprocessing could be added
}

#[no_mangle]
pub extern "C" fn free_rust_string(s: *mut c_char) {
    unsafe {
        if s.is_null() { return }
        CString::from_raw(s); // This safely frees the string
    };
}

#[no_mangle]
pub extern "C" fn init_movie_explorer() {
    dotenv::dotenv().ok();
    // Assume this function loads the configuration correctly
    load_configuration();
}

fn generate_recommendations(user_id: i32) -> String {
    // In practice, replace this with a real recommendation algorithm possibly involving API calls or complex computations
    format!("Recommended Movie1, Recommended Movie2, Recommended Movie3")
}

fn convert_to_c_string(recommendations: String) -> *mut c_char {
    CString::new(recommendations).expect("CString::new failed").into_raw()
}

fn load_configuration() {
    let api_url = env::var("API_URL").expect("Expected an API_URL in env");
    println!("Configured API URL: {}", api_url);
}
```

```toml
[dependencies]
lazy_static = "1.4.0"