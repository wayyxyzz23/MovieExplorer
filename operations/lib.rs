use std::env;
use std::ffi::{CStr, CString};
use std::os::raw::c_char;

#[no_mangle]
pub extern "C" fn recommend_movies(user_id: i32) -> *mut c_char{
    println!("Performing movie recommendations for user {}", user_id);
    let recommendations = generate_recommendations(user_id);
    convert_to_c_string(recommendations)
}

#[no_mangle]
pub extern "C" fn process_movie_data() {
    println!("Processing movie data with Rust's power...");
    // Here, you can further break down the functionality if necessary
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
    load_configuration();
}

fn generate_recommendations(user_id: i32) -> String {
    format!("Movie1, Movie2, Movie3")
}

fn convert_to_c_string(recommendations: String) -> *mut c_char {
    CString::new(recommendations).expect("CString::new failed").into_raw()
}

fn load_configuration() {
    let api_url = env::var("API_URL").expect("Expected an API_URL in .env");
    println!("Configured API URL: {}", api_url);
}