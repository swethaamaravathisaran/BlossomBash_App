import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import './ContactPage.css'; // Import your custom styles

export default function Contact() {
    return (
        <div className="contact-page">
            <video autoPlay loop muted playsInline className="background-video">
                <source src="https://v1.cdnpk.net/videvo_files/video/premium/partners0296/large_preview/230512_05_Wedding%20Still%20Life_4k_009.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <section id="contact" className="py-20 relative flex items-center justify-center">
                <div className="container mx-auto relative text-center">
                    <h2 className="text-4xl font-bold text-gray-800 mb-8">Contact Us</h2>
                    <div className="form-container">
                        <form>
                            <div className="mb-4">
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" name="name" placeholder="Your Name" required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email">Email Address</label>
                                <input type="email" id="email" name="email" placeholder="Your Email Address" required />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="message">Message</label>
                                <textarea id="message" name="message" rows="5" placeholder="Your Message" required></textarea>
                            </div>
                            <button type="submit">Send Message</button>
                        </form>
                    </div>
                    <div className="back-link">
                        <Link to="/">Back to Home</Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
