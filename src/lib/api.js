// src/lib/api.js

const BASE_URL = "https://api.fullontravel.com/api/";

/**
 * Fetch Testimonials
 * @param {number} page
 * @param {number} pageSize
 */
export async function getTestimonials(page = 1, pageSize = 100) {
  const res = await fetch(`${BASE_URL}tour/testimonial?page=${page}&pageSize=${pageSize}`, {
    cache: "no-store", // For SSR
  });

  if (!res.ok) {
    throw new Error("Failed to fetch testimonials");
  }

  return res.json();
}

/**
 * Fetch Destinations
 */
export async function getDestinations() {
  const res = await fetch(`${BASE_URL}tour/destination`, {
    cache: "no-store", // For SSR
  });

  if (!res.ok) {
    throw new Error("Failed to fetch destinations");
  }

  return res.json();
}


/**
 * Fetch vacation-type
 */
export async function getVacationType() {
  const res = await fetch(`${BASE_URL}tour/vacation-type`, {
    cache: "no-store", // For SSR
  });
  if (!res.ok) {
    throw new Error("Failed to fetch vacation-type");
  }
  return res.json();
}
