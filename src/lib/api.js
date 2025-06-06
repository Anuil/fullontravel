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


/**
 * Fetch All Tours
 * @param {number} page
 * @param {number} pageSize
 */
export async function getAllTours(
  destinationId,
  vacationTypeId,
  groupTour,
  page = 1,
  pageSize = 20
) {
  console.log("selectedDestination", destinationId?.id, groupTour, vacationTypeId);

  const queryParams = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
  });

  if (destinationId?.id) {
    queryParams.append("destinationId", destinationId.id);
  }
  if (groupTour) {
    queryParams.append("groupTour", groupTour);
  }
  if (vacationTypeId) {
    queryParams.append("vacationTypeId", vacationTypeId);
  }

  const url = `${BASE_URL}tour/?${queryParams.toString()}`;
console.log("urlurl",url)
  const res = await fetch(url, {
    cache: "no-store", // SSR-safe
  });

  if (!res.ok) {
    throw new Error("Failed to fetch tours");
  }

  return res.json();
}


/**
 * Fetch All Tours
 */
export async function getDestination(destinationName) {
  const res = await fetch(`${BASE_URL}tour/destination/${destinationName}`, {
    cache: "no-store", // For SSR
  });

  if (!res.ok) {
    throw new Error("Failed to fetch destinationName");
  }

  return res.json();
}