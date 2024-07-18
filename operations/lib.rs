use std::env;
use std::ffi::{CStr, CString};
use std::os::raw::c_char;

#[no_mangle]
pub extern "C" fn recommend_movies(user_id: i32) -> *mut c_char{
    println!("Performing movie recommendations for user {}", user_id);
    let recommendations = "Movie1, Movie2, Movie3";
    let c_str_movie = CString::new(recommendations).expect("CString::new failed");
    c_str_movie.into_raw()
}

#[no_mangle]
pub extern "C" fn process_movie_data() {
    println!("Processing movie data with Rust's power...");
}

#[no_mangle]
pub extern "C" fn free_rust_string(s: *mut c_char) {
    unsafe {
        if s.is_null() { return }
        CString::from_raw(s);
    };
}

fn load_configuration() {
    let api_url = env::var("API_URL").expect("Expected an API_URL in .env");
    println!("Configured API URL: {}", api_url);
}

#[no_mangle]
pub extern "C" fn init_movie_explorer() {
    dotenv::dotenv().ok();
    load_configuration();
}